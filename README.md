# Bonat POS Platinum

Point of sale, stock, barcode scanning and accounting for small businesses.
Works on phones and laptops, and keeps working offline once opened.

## Put it online (GitHub Pages)
1. Upload ALL the files in this folder to the repository (no sub-folders needed).
2. Go to **Settings -> Pages**.
3. Under **Branch** choose `main` and `/ (root)`, then **Save**.
4. After a minute your app is live at `https://<your-username>.github.io/<repo-name>/`.

## Install it on a phone
Open the link in Chrome, tap the **3-dot menu -> Add to Home screen / Install app**.

## Install it on a laptop
Open the link in Chrome or Edge and click the **Install** icon at the right end of the address bar.

## Files
| File | What it is |
|---|---|
| `index.html` | The whole app |
| `manifest.json` | Makes it installable (name, colours, icons) |
| `sw.js` | Lets it work offline |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-48.png` | Sharp app icons |
| `logo.svg` | The logo as a vector (sharp at any size) |

## Updating
Upload the new `index.html` over the old one. If a phone still shows the old version, close the app fully and open it again.
