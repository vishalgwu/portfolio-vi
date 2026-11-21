# Portfolio VI: a sunset-and-neon portfolio

A second portfolio for Vishal Fulsundar, styled as a game-world homage: a Vice City sunset, a HUD, and every project presented as a **mission**. Built with Next.js 14 (App Router), Tailwind CSS and Framer Motion.

> A fan-made visual homage. It has no affiliation with, and is not endorsed by, Rockstar Games or Take-Two Interactive. All artwork is drawn in code (SVG and CSS); no game footage, screenshots or logos are used.

The calmer, channel-style portfolio lives at [vishalgwu/vishal-portfolio](https://github.com/vishalgwu/vishal-portfolio).

## What's inside

- **Loader and trailer:** a loading screen with engineering tips, and a "Watch trailer" reel of the headline results.
- **Hero:** a code-drawn sunset bay with a striped sun, parallax skyline, neon ferris wheel and palms.
- **HUD:** scroll-driven "wanted" stars, a live clock, a mission objective line, and a radar minimap whose blips are the navigation.
- **Protagonist:** a character stat sheet built from measured resume results, plus a skills loadout.
- **Missions:** 35 projects as poster cards with 3D tilt and a briefing modal (brief, rewards, objectives, blueprint, loadout).
- **Districts:** an interactive map; each district is a project category.
- **Story mode:** the three roles from the resume as chapters ending in "Mission passed".
- **Newswire:** the seven most recently updated repositories.

## Data

`data/projects.json` is audited from the public repositories of [@vishalgwu](https://github.com/vishalgwu). Every figure comes from a repository README or the resume; work in progress is labelled as such.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
