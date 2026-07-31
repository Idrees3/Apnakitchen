# Apna Kitchen — Frisco Halal Pickup Site

Static multi-page website for **Apna Kitchen** (halal Pakistani food pickup near Sherbrooke Drive, Frisco, TX).

## Local preview

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Before go-live

1. Create Google Business Profile.
2. Paste the share URL into `js/site-config.js` → `googleBusinessUrl`.
3. Confirm exact pickup address / ZIP in `js/site-config.js` and Contact page.
4. Buy domain `apnakitchenmenu.com` and point DNS to Cloudflare Pages.
5. `npm run build` → deploy the `dist/` folder to Cloudflare Pages.

## WhatsApp

Orders use `+1 (469) 891-1406` via `wa.me` links site-wide.

## Pages

- Home, Menu, How to Order, About, Contact, FAQ
- Privacy Policy, Terms of Service, Food & Allergen Disclaimer
