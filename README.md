# Cooked App

Cooked App is a React + TypeScript recipe explorer built with Vite, Material UI, React Router, React Query, and Supabase. It uses TheMealDB as the recipe data source and Supabase for Authentication and storing user favourites.

Live demo: https://cooked-kgtd.vercel.app
Source repository: https://github.com/MarciaSatie/cooked
yutube video: https://youtu.be/RqRjzBUHecc

## Overview

The application lets signed-in users browse recipes by:
- category, 
- ingredient, 
- random selection,
- allows Filter recipes by Name, Country and Ingridients,
- opens recipe detail pages, showing Recipe's information, images or videos and Reviews,
- allows to add and visualize Reviews per Recipe,
- and saves favourites recipes . 
- It also includes Storybook stories and generated JSDoc documentation for the main API and data modules.

## Features

- Email/password authentication with Supabase
- GitHub sign-in through Supabase OAuth
- Recipe browsing pages for home (recipesAtoZ`), categories, surprise me, favourites, and recipes by ingredient, and pagination
- Parameterised Recipe Detail route at `/recipesAtoZ/:id`
- Recipe details with ingredients, instructions, and embedded media when available
- Recipe details with Review Page, allowing to add a Review and View.
- Favourite recipes and Reviews stored per user in Supabase
- React Query caching for server state
- Storybook stories for component and API-driven and test Helper functionalities
- JSDoc documentation for the codebase.

## Extra Feature
- Ai chat bot (Chefbot) using openai/gpt-oss-20b. (Current just working at Localhost)

## Data Sources

- [TheMealDB](https://www.themealdb.com/api.php) API for recipe, category, ingredient, and random recipe data
- Supabase Auth for user accounts
- Supabase database tables for profiles and favourite recipes

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- Supabase
- Material UI
- Storybook
- JSDoc

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file with these values:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

`VITE_SUPABASE_ANON_KEY` is also supported as a fallback if you prefer that name.

Run the app locally:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

Generate the JSDoc site:

```bash
npm run docs
```

Open the generated docs:

```bash
npm run docs:open
```

Create a production build:

```bash
npm run build
```



## Project Structure

- `src/api` - MealDB API wrappers and custom API helpers
- `src/components` - navigation, recipe cards, detail views, filters, and reusable UI
- `src/contexts` - shared application context
- `src/hooks` - data fetching hooks built on React Query and custom state logic
- `src/pages` - routed pages for the app experience
- `src/stories` - Storybook stories and supporting examples
- `src/supabase` - Supabase client, auth, and database helpers
- `src/types` - shared TypeScript interfaces and API models
- `src/utils` - recipe transformation and filtering helpers

## Routes

- `/` - sign-in page
- `/sign-up` - registration page
- `/home` - main recipe landing page
- `/surpriseMe` - random recipe view
- `/favorites` - saved recipes
- `/recipesAtoZ/:id` - recipe detail page
- `/categories` - recipes by category
- `/recipeByIngredient` - recipes by ingredient




