# Livia’s Journey

One-page Svelte portfolio for Livia, a tax audit professional. A pixel-art globe anchors the hero; a road and small walking dog connect education, experience, strengths, interests, and contact.

## Run locally

```bash
npm ci
npm run dev
```

Build static files with `npm run build`. Output goes to `dist/`.

## Replace placeholders

- Edit qualifications, roles, and strengths near the top of `src/App.svelte`.
- Add Livia’s photos and place logos under `public/assets/`, then set paths in the `photos` and `placeLogos` arrays.
- Add Livia’s LinkedIn URL to the hero social area.
- Connect the contact form to an inbox or form service. It currently shows a preview notice.

The dog’s walk animation follows scrolling and respects reduced-motion settings.
