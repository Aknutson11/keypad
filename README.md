# Door Code Practice — PWA

A one-page web app you can add to your iPhone Home Screen to practice a numeric door code. Works offline.

## Quick start (local)
1. Unzip this project.
2. In the folder, run:

   ```bash
   python3 -m http.server 5173
   ```

3. Visit http://localhost:5173 on your desktop to test.
4. On your iPhone, open the LAN URL in **Safari** (e.g., http://YOUR-MAC-IP:5173), then **Share → Add to Home Screen**.

> Service workers require HTTPS on the public internet (localhost is OK).

## Deploy (pick one)

### GitHub Pages
1. Create a new repo, upload all files from this folder at the repo root (no build step needed).
2. Repo Settings → Pages → Source: **Deploy from a branch**, Branch: **main**, Folder: **/** (root).
3. Open the Pages URL in Safari on your iPhone → **Share → Add to Home Screen**.

### Netlify (drag‑and‑drop)
1. Go to https://app.netlify.com/drop and drop the unzipped folder.
2. After deploy, open the site on your iPhone in Safari → **Share → Add to Home Screen**.

### Cloudflare Pages
1. Create a new project from this folder (no build command).
2. After deploy, open the site on your iPhone in Safari → **Share → Add to Home Screen**.

## Change the code
Open `app.js` and set `DEFAULT_CODE` to your preferred digits. You can also use the in‑app **Settings** to update and save the code in localStorage.

## Notes
- Storage lives in the browser (localStorage). It can be cleared by the system if the device is very low on space.
- To reset the app cache after you deploy an update, bump the `CACHE` version in `service-worker.js` (e.g., doorcode-v2) so users pick up fresh files.
