# Success Tutoring Parramatta — Landing Site

Content is driven by Google Sheets (published CSV). The site revalidates every ~60 seconds.

## Edit content
Update the Google Sheet tabs — no code needed.

CSV URLs are in `lib/content.ts`.

## Add images
Place your files:
- Tutor photos: `public/tutors/` (match `photo_url` like `/tutors/kevin.jpg`)
- Gallery photos: `public/gallery/` (match `image_url` like `/gallery/centre1.jpg`)

## HighLevel form
The HighLevel form embed lives in `components/highlevel-form.tsx`.

- If you need to change the form, update `FORM_ID` and/or `FORM_SRC`.
- The component also auto-retries once if the iframe fails to load (helps with occasional flaky loads).

## Logo + favicon
Replace the placeholder logo at:

- `public/logo.svg`

This logo is used:
- next to the site title in the header, and
- as the favicon via `app/layout.tsx` metadata.

If you prefer a PNG favicon, add `public/favicon.png` or `public/favicon.ico` and update `app/layout.tsx` accordingly.

## Run locally
npm install
npm run dev

## Deploy
Push to GitHub → Import into Vercel.