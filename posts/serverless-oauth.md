---
title: "Serverless OAuth with Discord & Next.js"
excerpt: "Since the early days of man, OAuth has always been a struggle for new developers. In the stone age, we struggled with three things; starting fires, finding food, and figuring out why our OAuth scopes..."
cover: "/assets/covers/padlock.jpg"
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

```shell
npx create-next-app my-app
```

#### Add TypeScript

Next (no pun intended) we need to add and configure a `tsconfig.json` for TypeScript.

```shell
cd my-app
touch tsconfig.json
yarn add typescript @types/node @types/react --dev
```

After this, you must rename every file in the project to end in `.tsx` for files with JSX, and to `.ts` for files without.
<br />
At this point, we can start our app by running `yarn dev`.
