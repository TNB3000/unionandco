# Union &amp; Company

A hand-coded static website for **Union &amp; Company** — the business of Kathy Marcelline,
a Toronto tourism professional and wedding officiant.

Plain HTML, CSS and vanilla JavaScript. No frameworks, no build step, no dependencies
beyond Google Fonts. Every page works with JavaScript disabled.

## Structure

```
.
├── index.html         Home (tourism-led, with a modest wedding gateway)
├── tourism.html       Tourism services — the flagship page
├── weddings.html      Wedding ceremonies (warmer balance, same system)
├── about.html         About Kathy — values and philosophy
├── contact.html       One adaptive contact form
├── css/
│   └── styles.css      All styling and design tokens
├── js/
│   └── main.js         Progressive enhancement (menu, scroll reveal, form)
├── assets/
│   ├── skyline.png     Detailed Toronto line drawing — the home-page hero art
│   ├── skyline.svg     The small line fragment used in footers/dividers (reference)
│   ├── favicon.svg     CN Tower fragment of the skyline motif
│   ├── group-distillery-{750,1500}.jpg        Group-tour photo, 3:2 (home, "How I work")
│   ├── group-distillery-wide-{800,1600}.jpg   Group-tour photo, 2:1 (tourism hero)
│   ├── ceremony-rooftop-{750,1500}.jpg        Ceremony photo, 3:2 (weddings, "My approach")
│   └── og-image.jpg    1200×630 share graphic cropped from the wide photo
└── README.md
```

**Home-page hero art** (`assets/skyline.png`): a detailed line drawing of the Toronto
skyline. The source art was line-work on a checkerboard ground, so it was keyed to a
transparent alpha mask (~140 KB) and is painted on the page via a CSS `mask` — the drawing
therefore inherits a site colour (currently navy, `--ink`) rather than carrying its own.
To recolour it, change `background-color` on `.skyline-hero` in `css/styles.css`.

**Small marks** (nav wordmark, footer, dividers, favicon) stay as crisp inline SVG
fragments — a raster of thin lines would blur at ~20 px.

## Design notes

- **Colour tokens** are CSS custom properties in `:root` (`css/styles.css`). The base is a
  cool grey-blue paper (`--paper: #F6F8F9`), deliberately not a warm cream.
- **Type:** Fraunces (display) and Figtree (body) from Google Fonts.
- **Contrast:** brass (`#B08D3E`) is ~2.9:1 on paper and fails WCAG AA for text, so eyebrow
  *text* on light bands uses a deeper brass (`--brass-deep: #8A6D28`, ~4.6:1). Full brass is
  reserved for non-text decoration and for text on the navy bands (where it reaches ~4.6:1).
- **Photos:** three photographs supplied by Kathy (a group tour in the Distillery District, a rooftop ceremony),
  served as responsive JPEGs via `srcset`. Everything else stays line-art.
- **Motion:** the hero skyline reveals with a left-to-right wipe on load (the one
  orchestrated animation). Section headings fade up once on scroll. The wipe is a CSS
  animation gated on the `.js` class, so the drawing is always visible without JavaScript;
  all motion is disabled under `prefers-reduced-motion: reduce`.
- **No cookies, analytics or trackers.**

## Local preview

No build step. Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

## Deploy to GitHub Pages

1. Create a GitHub repository and push these files to the default branch (e.g. `main`).

   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

2. In the repository on GitHub: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
5. Wait a minute for the first build. The site publishes at
   `https://USERNAME.github.io/REPO/`.

Because these are plain files at the repository root, no workflow or configuration is needed.

### Custom domain (optional)

If Kathy has a domain (e.g. `unionandcompany.ca`), add it under **Settings → Pages → Custom
domain**, then create the DNS records GitHub shows. GitHub will add a `CNAME` file to the repo.
Once the domain is live, update the `og:url` meta tags in each page to the real address.

## Contact form

`contact.html` posts to **Formspree**. Before launch:

1. Create a form at <https://formspree.io> and copy its form ID.
2. In `contact.html`, replace `YOUR_FORM_ID` in the `<form action="...">` with the real ID.

Until then, the visible **mailto** link is a working fallback. The form is fully usable
without JavaScript; JS only pre-selects the inquiry type from the URL
(`contact.html?type=weddings`).

## TODO — needs Kathy's input

Search the code for `TODO: confirm with Kathy` to find each in context.

1. **Business email** — `kathy@unionandcompany.ca` is set in the footer of every page and on
   the contact page.
2. **Phone number** — optional; add to `contact.html` if she wants one listed.
3. **Formspree form ID** — replace `YOUR_FORM_ID` in `contact.html` (see above).
4. **Photos** — confirm the captions on `index.html`, `tourism.html` and `weddings.html`, and
   that everyone pictured is happy to appear on the site.
5. **`og:url`** — currently the GitHub Pages address (`https://tnb3000.github.io/unionandco/`).
   Update in all five pages if a custom domain goes live.
6. **Domain** — confirm the final domain so DNS and `og:url` can be finalized.
