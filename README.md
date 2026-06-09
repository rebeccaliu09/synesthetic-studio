# Synesthetic Studio

An interactive aesthetic mood test. Answer eight questions about texture, light, sound, and space to discover your personal mood world.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Spotify credentials

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder values with your Spotify API credentials.

To get credentials:
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an app
3. Copy the **Client ID** and **Client Secret** into your `.env`

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/   # Reusable UI components
  pages/        # Route-level pages (IntroPage, QuizPage, ResultPage)
  data/         # moodData.js — questions and mood definitions
  hooks/        # useSpotifyToken, useSpotifySearch
  styles/       # global.css
```

## Mood types

Pearl · Moon · Chrome · Forest · Velvet · Rose · Flame · Mist
# synesthetic-studio
