---
title: "Serverless OAuth with Discord & Next.js"
excerpt: "Since the early days of man, OAuth has always been a struggle for new developers. In the stone age, we struggled with three things; starting fires, finding food, and figuring out why our OAuth scopes..."
cover: "/assets/covers/cctv.jpg"
date: "2020-12-20T15:29:55.000Z"
author:
  name: Alistair Smith
  avatar: "/assets/authors/alistair.png"
---

```typescript
const user: User = ifOnlyOAuthWasThisSimple(getToken());
```

# Intro

<small>Before we start, you can view the entire code [here](https://github.com/alii/nextjs-discord-oauth)</small>

Since the early days of man, OAuth has always been a struggle for new developers. In the stone age, we struggled with three things; starting fires, finding food, and figuring out why our OAuth scopes aren't working. Well explorer, look no further. Today, we'll be going through the process of connecting & deploying Discord's OAuth 2 API with Next.js and serverless [now functions](https://vercel.com/docs/serverless-functions/introduction)

---

## The setup

Firstly, we're going to need to create a Next.js app. Feel free to _skip_ this if you "have one that you made earlier."

#### Initialise project

```
yarn create next-app my-app
```

or, if you use npm (although use of yarn is **strongly** recommended)

```
npx create-next-app my-app
```

#### Add TypeScript

Next (no pun intended) we need to add and configure TypeScript.

```
cd my-app
touch tsconfig.json
yarn add typescript @types/node @types/react --dev
```

After this, you must rename every file in the project to end in tsx

At this point, we can start our app

If you open [http://localhost:3000](http://localhost:3000) in your browser, you will see the welcome to Next.js page and we can confirm that your Next.js setup is all working.

#### Adding dependencies

We're going to use `jsonwebtoken` for generating the users' tokens, `cookie` for serializing & parsing cookies and `node-fetch` for making our requests to the Discord API. Install them like this

```
yarn add node-fetch jsonwebtoken cookie && yarn add @types/node-fetch @types/jsonwebtoken @types/cookie --dev
```

After this, you're going to want to make a director under the `pages` called `api`. In this `api` folder, make a new file called `oauth.ts`. This is where we will add the code for OAuth.

#### The code

```typescript
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import cookie from "cookie";

// Create our type definition for a Discord User
interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
}

// Extract environment variables from process.env
// (we will come on to this later)
const {
  CLIENT_SECRET,
  CLIENT_ID,
  APP_URI,
  JWT_SECRET,
  COOKIE_NAME,
} = process.env;

// Create scopes, oauth querystring and URIs
const scope = ["identify"].join(" ");
const REDIRECT_URI = `${APP_URI}/api/oauth`;

const OAUTH_QS = new URLSearchParams({
  client_id: CLIENT_ID || "0",
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope,
}).toString();

const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.redirect("/");

  // Find the code or error from the request querystring
  const { code = null, error = null } = req.query;

  // If there is an error, redirect to the index page
  if (error) {
    return res.redirect("/?error=oauth");
  }

  // If there is no code, redirect to the OAuth URI
  if (!code || typeof code !== "string") return res.redirect(OAUTH_URI);

  const body = new URLSearchParams({
    client_id: CLIENT_ID!,
    client_secret: CLIENT_SECRET!,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI,
    code,
    scope,
  }).toString();

  // Request our access token, defaulting it to null if something goes wrong
  const { access_token = null } = await fetch(
    "https://discord.com/api/oauth2/token",
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body,
    }
  ).then((res) => res.json());

  // If the access token does not exist, return
  if (!access_token || typeof access_token !== "string") {
    return res.redirect(OAUTH_URI);
  }

  // Fetch this current user (uses the "identify" scope)
  const me: DiscordUser | { unauthorized: true } = await fetch(
    "http://discord.com/api/users/@me",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  ).then((res) => res.json());

  // If the id does not exist in the response body, request reauthorization
  if (!("id" in me)) {
    return res.redirect(OAUTH_URI);
  }

  // Sign a JWT with the payload of the current user...
  const token = jwt.sign(me, JWT_SECRET!, { expiresIn: "24h" });

  // ...and set it as a header
  res.setHeader(
    "Set-Cookie",
    cookie.serialize(COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/",
    })
  );

  // Redirect back to the homepage
  res.redirect("/");
};
```

There a bit more to do, but the main setup of our oauth endpoint is finished. It's really not too much to swallow 😅
