# QR Menu (MVP)

Static GitHub Pages menus for small eateries. Brief: `/workspace/earn/org/research/brief-qr-menu.md`.

## Layout
- `menu.template.json` — schema to copy per client
- `assets/` — shared CSS + renderer (`menu.js` loads `./menu.json`)
- `tiffin-garden/` — one fictional demo (South Indian tiffin)
- `tiffin-garden/qr.png` — printable QR → `https://saemali.github.io/qr-menu/tiffin-garden/`

## Local preview
Open `tiffin-garden/index.html` via a static server (fetch needs HTTP), e.g. `python3 -m http.server 8080`.

## Regenerate QR
`python3 tools/build_qr.py tiffin-garden`

Do not push until Earn says so.
