# LinkedIn Post Generator

This app generates engaging LinkedIn posts for your brand.

This project is built using Nextjs. It utilizes the OpenAI GPT for chat completion, and Dall-E for image generation.

<img src="./docs/linkeding-generator-ai.gif" alt="app demo" width=600>

## Getting Started

First, duplicate the `.env` file into a new file named `.env.local`. Update the value of your OpenAI API key there.

The first time you are running this project, you will need to install the dependencies. Run this command in your terminal:

```bash
yarn
```

To start the app, run:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/components/LinkedinPostGenerator.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
