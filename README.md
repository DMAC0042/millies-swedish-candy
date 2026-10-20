# Millie's Swedish Candy Co. Website

A beautiful, responsive website for Millie's Swedish Candy Co. — a Swedish candy shop in College Park, Orlando, FL.

## Quick Start

1. Open `index.html` in your browser to preview the site
2. Add your images to the `images/` folder
3. Update placeholder content (see below)
4. Set up form handling
5. Deploy to Netlify, Vercel, or any web host

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

Both the Pickup Order form and Event Inquiry form need a form handler. Here's how to set each option up:

### Option 1: Formspree (Recommended)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form for "Pickup Orders"
3. Copy your form endpoint (looks like `https://formspree.io/f/abcd1234`)
4. Open `pickup.html`, find the `<form>` tag, and replace:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   with your actual endpoint
5. Repeat for `events.html` with a separate form

**Free tier:** 50 submissions/month

### Option 2: Netlify Forms (If hosting on Netlify)

1. Add `netlify` attribute to each form:
   ```html
   <form netlify name="pickup-order" method="POST">
   ```
2. Remove the `action` attribute
3. Deploy to Netlify — forms will appear in your Netlify dashboard

### Option 3: Email Fallback

This opens the user's email client (less seamless):

1. Change the form action to:
   ```html
   action="mailto:your@email.com"
   method="POST"
   enctype="text/plain"
   ```

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

### Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your project folder onto the Netlify dashboard
3. Your site will be live at a `.netlify.app` URL
4. Connect a custom domain in Netlify settings

### Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Import your project folder
3. Deploy with one click

### Traditional Web Hosting

1. Upload all files via FTP to your web host
2. Ensure `index.html` is at the root

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
