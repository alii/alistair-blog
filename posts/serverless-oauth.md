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

We're going to use `jsonwebtoken` for generating the users' tokens, and `node-fetch` for making our requests to the Discord API. Install them like this

```
yarn add node-fetch jsonwebtoken && yarn add @types/node-fetch @types/jsonwebtoken --dev
```
