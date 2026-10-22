# Livia’s Journey

One-page Svelte portfolio for Livia. A gently moving clay globe opens the journey; sculpted roads, timelines, Polaroids, and one walking dog guide the later sections.

## Run locally

```bash
npm ci
npm run dev
```

Build static files with `npm run build`. Output goes to `dist/`.

## Replace placeholders

- Edit qualifications, roles, and strengths near the top of `src/App.svelte`.
- Replace the clearly marked Polaroid placeholders in `src/App.svelte` with approved photos from `public/assets/`.
- Replace chapter memory and personal-interest prompts with approved details.
- Connect the contact form to an inbox or form service. It currently shows a preview notice.

The globe gently floats in place while the dog walks along its road. She walks from top to bottom along the chapter road. On desktop, the road stays continuous as each chapter arrives; mobile uses a shorter natural flow to keep cards readable. The small tab at the top opens the journey navigation. Motion respects reduced-motion settings.
