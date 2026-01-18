# Next.js Monorepo with Sanity CMS

A modern, full-stack monorepo template built with Next.js App Router, Sanity CMS, Shadcn UI, and TurboRepo.

![Easiest way to build a webpage](https://raw.githubusercontent.com/robotostudio/turbo-start-sanity/main/turbo-start-sanity-og.png)

## Features

### Monorepo Structure

- Apps: web (Next.js frontend) and studio (Sanity Studio)
- Shared packages: UI components, TypeScript config, ESLint config
- Turborepo for build orchestration and caching

### Frontend (Web)

- Next.js App Router with TypeScript
- Shadcn UI components with Tailwind CSS
- Server Components and Server Actions
- SEO optimization with metadata
- Blog system with rich text editor
- Table of contents generation
- Responsive layouts

### Content Management (Studio)

- Sanity Studio v4
- Custom document types (Blog, FAQ, Pages)
- Visual editing integration
- Structured content with schemas
- Live preview capabilities
- Asset management

## Tech Test Implementation & Enhancements

This project has been enhanced with a focus on luxury aesthetics, premium performance, and a robust page builder system.

### 🏗️ Advanced Page Builder

- **Dynamic Blocks**: Implemented a flexible Page Builder allowing dynamic content ordering from Sanity.
- **Visual Editing & Live Preview**: Integrated `VisualEditing` and `sanityFetch` for real-time, click-to-edit capabilities.
- **Optimistic Updates**: Uses `useOptimistic` for instant feedback in the CMS preview.

### ✨ Luxury Design & UX

- **Typography**: Solved Figma font unavailability by integrating **Galaxie Copernicus** via `next/font/local`.
- **Premium Scrolling**: Integrated **Lenis** for smooth, buttery scroll interactions.
- **Fluid Animations**: Implemented high-end micro-animations using `motion/react` with custom luxury easing (`LUXURY_EASE`).
- **Responsive Navbar**: Custom navbar with optimized animation durations and refined branding.

### 🖼️ Image Optimization & Media

- **Intelligent Ratios**: The "Featured Products" block handles multiple aspect ratios (Square, Portrait, Video, Auto) to accommodate various product types.
- **Performance Driven**: Leveraging `sanity-image` and `next/image` with:
  - `fetchPriority="high"` and `loading="eager"` for LCP images (Hero, Service).
  - Explicit `sizes` to minimize data usage.
  - Automatic hotspot/crop handling from Sanity.

### 🔍 Search & SEO

- **Robust SEO Engine**: Custom `getSEOMetadata` utility in `lib/seo.ts` for automated title, description, and OG image generation.
- **Structured Data**: Integrated `JSON-LD` for Organization and Website schemas.
- **Accessibility**: Semantic HTML5 structure and ARIA-compliant components.

## 📈 Performance & LCP Validation

To ensure the "premium performance" requirement was met, the application was benchmarked for Largest Contentful Paint (LCP) and overall Core Web Vitals.

### Vercel / Production Test Results



![Vercel LCP Test Result](<img width="1680" height="817" alt="onvercel" src="https://github.com/user-attachments/assets/3a032b52-6a46-4f57-a8e4-8aa745b84388" />

)

### Local / Lighthouse Test Results



![Local LCP Test Result](<img width="1680" height="826" alt="localhost" src="https://github.com/user-attachments/assets/08780721-ccef-4756-9ede-a44de753b508" />
)

### 🛠️ Technical Decisions

- **Scalability**: Used Tailwind CSS with a standardized design system for visual cohesiveness.
- **Rich Text Control**: Custom `RichText` component with slug generation for deep-linking and optimized media embeds.
- **Architecture**: Clean, component-based structure in `apps/web/src/components/sections`.

## Getting Started

### Installing the template

#### 1. Initialize template with Sanity CLI

Run the command in your Terminal to initialize this template on your local computer.

See the documentation if you are [having issues with the CLI](https://www.sanity.io/help/cli-errors).

```shell
npm create sanity@latest -- --template robotostudio/turbo-start-sanity
```

#### 2. Run Studio and Next.js app locally

Navigate to the template directory using `cd <your app name>`, and start the development servers by running the following command

```shell
pnpm run dev
```

#### 3. Open the app and sign in to the Studio

Open the Next.js app running locally in your browser on [http://localhost:3000](http://localhost:3000).

Open the Studio running locally in your browser on [http://localhost:3333](http://localhost:3333). You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.

### Adding content with Sanity

#### 1. Publish your first document

The template comes pre-defined with a schema containing `Author`, `Blog`, `BlogIndex`, `FAQ`, `Footer`, `HomePage`, `Navbar`, `Page`, and `Settings` document types.

From the Studio, click "+ Create" and select the `Blog` document type. Go ahead and create and publish the document.

Your content should now appear in your Next.js app ([http://localhost:3000](http://localhost:3000)) as well as in the Studio on the "Presentation" Tab

#### 2. Sample Content

When you initialize the template using the Sanity CLI, sample content is not automatically imported into your project. However, you can import it after the init is done. This data includes example blog posts, authors, and other content types to help you get started quickly (see next step).

#### 3. Seed data using script

To add sample data programmatically, run the following command:

```shell
cd apps/studio
npx sanity dataset import ./seed-data.tar.gz production --replace
```

This command imports seed content into your Sanity dataset.

#### 4. Extending the Sanity schema

The schemas for all document types are defined in the `studio/schemaTypes/documents` directory. You can [add more document types](https://www.sanity.io/docs/schema-types) to the schema to suit your needs.

### Deploying your application and inviting editors

#### 1. Deploy Sanity Studio

Your Next.js frontend (`/web`) and Sanity Studio (`/studio`) are still only running on your local computer. It's time to deploy and get it into the hands of other content editors.

> **⚠️ Important**: When initializing the template with the Sanity CLI, the `.github` folder may not be included or might be renamed to `github` (without the dot). If you don't see a `.github` folder in your project root, you'll need to manually create it and copy the GitHub Actions workflows from the [template repository](https://github.com/robotostudio/turbo-start-sanity/tree/main/.github) for the deployment automation to work.

The template includes a GitHub Actions workflow [`deploy-sanity.yml`](https://raw.githubusercontent.com/robotostudio/turbo-start-sanity/main/.github/workflows/deploy-sanity.yml) that automatically deploys your Sanity Studio whenever changes are pushed to the `studio` directory.

> **Note**: To use the GitHub Actions workflow, make sure to configure the following secrets in your repository settings:
>
> - `SANITY_DEPLOY_TOKEN`
> - `SANITY_STUDIO_PROJECT_ID`
> - `SANITY_STUDIO_DATASET`
> - `SANITY_STUDIO_TITLE`
> - `SANITY_STUDIO_PRESENTATION_URL`
> - `SANITY_STUDIO_PRODUCTION_HOSTNAME`

Set `SANITY_STUDIO_PRODUCTION_HOSTNAME` to whatever you want your deployed Sanity Studio hostname to be. Eg. for `SANITY_STUDIO_PRODUCTION_HOSTNAME=my-cool-project` you'll get a studio URL of `https://my-cool-project.sanity.studio` (and `<my-branch-name>-my-cool-project.sanity.studio` for PR previews builds done automatically via the `deploy-sanity.yml` github CI workflow when you open a PR.)

Set `SANITY_STUDIO_PRESENTATION_URL` to your web app front-end URL (from the Vercel deployment). This URL is required for production deployments and should be:

- Set in your GitHub repository secrets for CI/CD deployments
- Set in your local environment if deploying manually with `npx sanity deploy`
- Not needed for local development, where preview will automatically use `http://localhost:3000`

You can then manually deploy from your Studio directory (`/studio`) using:

```shell
npx sanity deploy
```

**Note**: To use the live preview feature, your browser needs to enable third party cookies.

#### 2. Deploy Next.js app to Vercel

You have the freedom to deploy your Next.js app to your hosting provider of choice. With Vercel and GitHub being a popular choice, we'll cover the basics of that approach.

1. Create a GitHub repository from this project. [Learn more](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github).
2. Create a new Vercel project and connect it to your Github repository.
3. Set the `Root Directory` to your Next.js app (`/apps/web`).
4. Configure your Environment Variables.

#### 3. Invite a collaborator

Now that you've deployed your Next.js application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up [Manage](https://www.sanity.io/manage), select your project and click "Invite project members"

They will be able to access the deployed Studio, where you can collaborate together on creating content.
