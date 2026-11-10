# Livia’s Journey

One-page Svelte portfolio for Livia. A gently moving clay globe opens the journey; sculpted roads, timelines, Polaroids, and one walking dog guide the later sections.

## Run locally

```bash
npm ci
npm run dev
```

Build static files with `npm run build`. Output goes to `dist/`.

## Edit portfolio content

- Edit qualifications, roles, strengths, and activities near the top of `src/App.svelte`.
- Update the matching scene facts and chapter summaries in the same file when those details change.
- Contact messages use Web3Forms; LinkedIn provides an alternative contact route.

## Contact form

Create `.env.local` and set `VITE_WEB3FORMS_ACCESS_KEY=your_access_key`. Set the same variable in the deployment environment. Without a key, the form asks visitors to use LinkedIn instead.

## Deploy on Vercel

Import the repository into Vercel. The project uses the Vite preset: build with `npm run build` and serve `dist/`. `vercel.json` pins these settings and adds baseline security and caching headers.

- Set `VITE_WEB3FORMS_ACCESS_KEY` under Project → Settings → Environment Variables for Production (and Preview if the form should work there). It is read at build time.
- In the Web3Forms dashboard, restrict the access key to the production domain. Preview deployments use generated URLs, so submissions from them are rejected unless those domains are allowed too.
- Node 22 is pinned through `.nvmrc` and the `engines` field to match CI.

The globe gently floats in place while the dog walks along its road. She walks from top to bottom along the chapter road. On desktop, the road stays continuous as each chapter arrives; mobile uses a shorter natural flow to keep cards readable. The small tab at the top opens the journey navigation. Motion respects reduced-motion settings.
