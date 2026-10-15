# Battulga Batgerel — Portfolio

Personal portfolio site. Dark night-sky theme: a canvas starfield that links into constellations around the cursor, the profile photo as a moon with its own orbit, and a Mongolian / English switch.

Built with Next.js, React and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

All text lives in [`data/profile.ts`](data/profile.ts), with one block per language (`content.mn`, `content.en`). Interface labels (menu, buttons) are in [`lib/lang.ts`](lib/lang.ts). The profile photo is `public/profile.webp`.
