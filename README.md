# One Piece Encyclopedia — Straw Hat Crew (GitHub Pages Template)

A colorful, static website for One Piece focusing on the Straw Hat Pirates. Includes:
- Home page with ocean-themed hero
- Characters gallery with search & filters
- Character detail page with powers, Haki, and bounty
- JSON data file (`characters.json`) for easy editing

## Use Official Images
This repo contains **placeholder images** with the correct filenames. To use official character images:
1. Prepare your images (PNG/JPG). Recommended size ~ 900×1200.
2. Upload them to the `images/` folder in your GitHub repo.
3. Keep the **same filenames**:
   - `luffy.png`, `zoro.png`, `nami.png`, `usopp.png`, `sanji.png`, `chopper.png`, `robin.png`, `franky.png`, `brook.png`, `jinbe.png`
4. Refresh your GitHub Pages site — the new images will appear instantly.

> Tip: If you change a filename, also update the `image` field in `characters.json`.

## Local Preview
Open a terminal in the folder and run:
```
python -m http.server 5500
```
Then open http://localhost:5500

## Deploy on GitHub Pages
1. Create a **public** GitHub repo and upload all files from `onepiece-site/`.
2. In **Settings → Pages**, choose: Branch = `main`, Folder = `/ (root)` → Save.
3. Your site goes live at: https://<username>.github.io/<repo-name>/
