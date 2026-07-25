# SeaGlass Digital

Website for SeaGlass Digital — structured problem-solving & AI use-case consultancy for small and medium UK businesses.

## Structure
- `index.html` — full single-file site (HTML/CSS, no build step required)

## Deploy (GitHub Pages)
This repo is already configured for the live domain **www.seaglassdigital.co.uk**:
- A `CNAME` file at the repo root tells GitHub Pages which domain to serve
- All canonical URLs, Open Graph tags, `sitemap.xml`, `robots.txt`, and `llms.txt` point to this domain

Steps:
1. Push this repo to GitHub (or update the existing one)
2. In repo Settings → Pages, set source to `main` branch, root folder
3. In repo Settings → Pages → Custom domain, confirm it shows `www.seaglassdigital.co.uk`
4. Check your DNS provider has the CNAME/A records pointing at GitHub Pages (see earlier DNS setup)
5. Once verified, tick "Enforce HTTPS"
