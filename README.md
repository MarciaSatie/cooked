# Cooked App

Cooked App is a small React + TypeScript project for exploring recipe data from TheMealDB API. It fetches recipe information by ID, transforms the raw API response into a cleaner shape, and displays the result in a card-based UI.

## Main Features

- Fetches recipe data from TheMealDB by recipe ID
- Transforms raw API data into a cleaned recipe model
- Displays recipe details in a responsive card layout
- Shows ingredients and measurements in a readable format
- Includes Storybook stories for UI testing
- Includes JSDoc output for code documentation

## Tech Stack

- React
- TypeScript
- Vite
- Material UI
- Storybook
- JSDoc

## Project Structure

- `src/api` - API calls
- `src/hooks` - reusable data hooks
- `src/components` - UI components
- `src/pages` - app pages
- `src/stories` - Storybook stories
- `src/types` - shared TypeScript interfaces

## Main Commands

Install dependencies:

```bash
npm install
```

Run the app:

```bash
npm run dev
```

Run Storybook:

```bash
npm run storybook
```

Generate JSDoc docs:

```bash
npm run docs
```

Open the generated JSDoc site:

```bash
npm run docs:open
```

Build the app for production:

```bash
npm run build
```

## API Reference

[TheMealDB API](https://www.themealdb.com/api.php)



