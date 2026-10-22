# Millie's Swedish Candy Co. Website

A beautiful, responsive website for Millie's Swedish Candy Co. — a Swedish candy shop in College Park, Orlando, FL.

## Quick Start

1. Open `index.html` in your browser to preview the site
2. Add your images to the `images/` folder
3. Update placeholder content (see below)
4. Set up form handling
5. Push to `main` to publish (see Deployment)

---

## Project Structure

```
millies-swedish-candy/
├── index.html          # Home page
├── pickup.html         # Pickup order form
├── events.html         # Event inquiry form
├── about.html          # About page with story
├── privacy.html        # Privacy policy (linked in every footer)
├── css/
│   └── styles.css      # All styles (well-commented)
├── js/
│   ├── doodles.js      # The hand-drawn doodle set (injected into each page)
│   └── main.js         # Mobile nav, forms, animations
├── images/             # Add your images here
│   ├── millies-logo.png          # Logo, mural blue lettering, see-through background (everywhere)
│   ├── millie-shop.jpg # Shop photo beside Millie's story (About)
│   ├── map.svg         # Shop map drawn from OpenStreetMap data (labels are HTML on top)
│   ├── logo.jpg        # Old logo on cream (no longer used)
│   ├── favicon.png     # Favicon (generate from logo)
│   └── ...             # Product photos, hero images, etc.
└── README.md           # This file
```

---

## Required Images to Add

### Essential Images

| Image | Filename | Size Recommendation | Where It's Used |
|-------|----------|---------------------|-----------------|
| **Logo** | `millies-logo*.png` | done (made from Millies Logo.pdf.jpg) | Nav bar, home, footer |
| **Favicon** | `favicon.png` | 32x32px | Browser tab |
| **Apple Touch Icon** | `apple-touch-icon.png` | 180x180px | iOS home screen |
| **OG Image** | `og-image.jpg` | 1200x630px | Social sharing |

### Page Images (Placeholders to Replace)

**Home Page:**
- (none: the "follow along" section was removed)

**Events Page:**
- (none: the "sweet celebrations" gallery was removed)

**About Page:**
- Hero/lifestyle image
- Owner/shop photo

### Adding Your Logo

1. Rename your logo file `IMG_7442.jpg` to `logo.jpg`
2. Place it in the `images/` folder
3. The site will automatically use it in the nav and footer

### Creating a Favicon

1. Use a tool like [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your logo or the coral "M" from the logo
3. Download the generated files
4. Place `favicon.png` and `apple-touch-icon.png` in `images/`

---

## Setting Up Forms

Both forms (pickup and events) post to a Google Apps Script that runs in
the Gmail account milliesevents1@gmail.com: `apps-script/Code.gs`. Each submission is emailed to
millie@milliescandy.com (Reply goes to the customer) and saved as a row in a
private Google Sheet, "Millie's website forms", that the script creates on the
first submission (tabs: Pickup orders, Event inquiries).

The site only shows "thanks" when the script answers `{"ok": true}`; anything
else shows "Error - Try Again". A hidden `website` field traps spam bots.

Why a Gmail account and not millie@milliescandy.com: milliescandy.com has a
strict DMARC rule (`p=reject`) and Millie's Google Workspace doesn't DKIM-sign
as milliescandy.com, so script email sent from her account bounces. Email
sent from a gmail.com account is signed by Google and gets through.

### Connecting (signed in as milliesevents1@gmail.com)

1. script.google.com > New project; name it "Millie's website forms".
2. Replace the editor contents with `apps-script/Code.gs`; save.
3. Choose the `setup` function > Run > allow the permissions. Millie gets a
   "forms are connected" email at millie@milliescandy.com.
4. Deploy > New deployment > type Web app; Execute as: Me; Who has access:
   Anyone. Deploy and copy the Web app URL (ends in `/exec`).
5. Put that URL in the `action` of the form in `pickup.html` and `events.html`
   (replacing `APPS_SCRIPT_URL`) and push.

To change the script later: edit, then Deploy > Manage deployments > edit >
Version: New version (keeps the same URL).

---

## Updating Content

### Placeholder Text to Update

Search the HTML files for these placeholders and update them:

| Placeholder | Where | What to Update |
|-------------|-------|----------------|
| `1234 Edgewater Dr` | All pages | Real shop address |
| Hours (11am-7pm, etc.) | index.html, pickup.html, about.html | Real operating hours |
| Owner's story | about.html | Real story from owner |
| Google Maps iframe | index.html, pickup.html, about.html | Embed with real address |

### How to Update the Google Map

1. Go to [Google Maps](https://maps.google.com)
2. Search for your actual shop address
3. Click **Share** → **Embed a map**
4. Copy the iframe code
5. Replace the existing iframe in `index.html`, `pickup.html`, and `about.html`

---

## Color Palette Reference

The look follows the Tingle & Tots brand board: flat color, hand-drawn stripes,
handwritten lowercase headings (Delicious Handrawn), line doodles. No gradients.
Colors are CSS variables at the top of `css/styles.css`:

| Color | Variable | Hex | Usage |
|-------|----------|-----|-------|
| Red | `--red` | `#FF6969` | Logo "Millie's", buttons, stripes, top bar |
| Mint | `--mint` | `#CAD8CB` | Logo "Swedish Candy Co.", panels |
| Cream | `--cream` | `#FFFFED` | Page background, cards |
| Brown | `--ink` | `#7A6D5F` | Text and rules (the mural's chocolate brown); footer is cream |
| Logo blue | (in the logo file) | `#CAD8CB` | "Swedish Candy Co." in the logo (Millie's hex) |

Photo stand-ins are doodle tiles; each has a `PLACEHOLDER` comment showing how to
swap in a real `<img>`.


---

## Deployment

The site is hosted on **GitHub Pages** from its own repository,
`DMAC0042/millies-swedish-candy` (branch `main`, root folder). It is its own
repository and shares nothing with any other project. (An earlier copy at
`endurancefl/millies-swedish-candy` is archived, with Pages turned off.)

- Live test address: https://dmac0042.github.io/millies-swedish-candy/
- To publish a change: commit and push to `main`; Pages rebuilds in about a minute.
- This folder pushes as the `DMAC0042` GitHub account through a repo-local
  credential helper.
- Rollback point before the 2026-10-20 accessibility fixes: tag
  `before-accessibility-fixes`.

### Domain (milliescandy.com) - connected 2026-10-20

- Live at https://www.milliescandy.com (milliescandy.com and the old
  github.io address forward to it; HTTPS enforced).
- Registered at Squarespace Domains (expires 2028-09-08); DNS is managed in
  Millie's Squarespace account under Custom records: four A records for `@`
  (185.199.108-111.153), `www` CNAME `dmac0042.github.io`, and the TXT
  `_github-pages-challenge-DMAC0042` that verifies the domain to the DMAC0042
  account (keep it, it stops anyone else claiming the domain on GitHub).
- Email is Google Workspace; its MX/TXT records are separate and untouched.
- The `CNAME` file in this folder holds the domain; don't delete it.

---

## Features

- **Mobile-first responsive design** — looks great on phones, tablets, and desktops
- **Smooth animations** — subtle fade-in effects on scroll
- **Form validation** — client-side validation with friendly error states
- **Accessibility** — skip links, ARIA labels, keyboard navigation
- **SEO-ready** — meta tags, Open Graph, semantic HTML
- **Fast loading** — no build step, minimal dependencies

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari & Chrome

---

## Need Help?

If you have questions about customizing the site, reach out to your web developer or refer to the comments in the HTML/CSS files — they're there to help guide you!
