# Cooked App

[Cooked -Vercel Web App](https://cooked-kgtd.vercel.app)

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

[AI chat research history](https://www.google.com/search?q=Using+React+with+typescript%0Arefresh+me+how+to+grab+a+param%2C+at+this+case+ID+from+url&sourceid=chrome&ie=UTF-8&amc=1&aep=42&cud=1&source=chrome.crn.rb&atvm=2&udm=50&mstk=AUtExfAZvZMEK3_ajyxFfYXe7OARx7Irx1p4O7F_Rkrol316ZxFTuKIUJs6MaW0oaeFhAr8aoAJoM6QjoeVBWe8WbDHIXv7_U3w--zbKQf_Ia-ebloGl7woDnDW48eaSFxmG0W3iE10h-iKW25xeFyUJjVZRsn0O2TAwDRBnY8aSOgLL4Z22JI9U4YNj9U3_b3a302oMCJHbot2xxA02yttz9gZJrbrmJTVMLYLp0lYnMyRIMG8eYKBH8DuqMEEiSPApwl9K1oXt7CpRTMjdMEewA0jEGgEuxmg4boE&csuir=1&mtid=jdplas-BO4rqhbIPu4OHqAE)



