# Vela Glass Theme: Setup Guide

An Apple-style product page with glossy glass, a mirror floor reflection, a tilting device and a finish picker. No build tools, no frameworks.

## What's in the kit

```
index.html       all the page text
css/style.css    colors, fonts, device size, gloss effects
js/main.js       mirror, tilt, live clock, finish picker
images/          your own photos
vercel.json      hosting settings
```

## 1. Preview

Unzip and double-click `index.html`. Move your mouse (or drag a finger) across the dark hero: the phone tilts and the highlight slides across the glass. Click the colored dots to change the finish.

## 2. Customise

**Wording and product:** edit `index.html`. Replace "Vela One", the price, the specs and the footer note. Each feature card is an `<article class="tile ...">` block.

**Colors:** at the top of `css/style.css`:
```css
--blue:#0071e3;     /* buttons and links */
--ink:#1d1d1f;      /* text */
--paper:#f5f5f7;    /* light section background */
--w:clamp(190px,22vw,250px);   /* device size */
```

**Device finishes:** in `js/main.js`, edit the `FINISHES` list (three metal shades per finish). To match a swatch dot, edit the `.sw[data-finish="..."]` colors in the CSS. To add a finish, add a list entry, a `<button class="sw" data-finish="name">` in `index.html` and a matching swatch color.

**Screen wallpaper:** the colored glow on the phone screen is the `.screen` background in the CSS. Change the four colors.

**Use your own product photo instead of the drawn phone:** put a transparent PNG or WebP in `images/` and replace the `.device` block inside `<div class="rig">` with `<img class="device" src="images/product.png" alt="...">`. The mirror script copies whatever is there, so the reflection still works.

**Mirror strength:** in `.mirror`, change `rgba(0,0,0,.42)` in the mask (higher = stronger reflection) and `margin-top` (gap between device and reflection).

**Tilt amount:** in `js/main.js`, change `24` in `(x - .5) * 24`. Set it to `0` for no tilt.

**Contact or newsletter form:** not included. Add a Formspree or similar form if you need one.

**Fonts:** the theme uses the visitor's system font (San Francisco on Apple devices) and falls back to Inter elsewhere. To change, edit `--font` in the CSS.

## 3. Deploy on Vercel (free)

1. Create a GitHub repository and upload everything from the folder (index.html must be in the repository root).
2. Sign in at vercel.com with GitHub, click Add New, then Project, and import the repository.
3. Leave the settings at default (Framework: Other) and click Deploy.
4. Your site is live at a `.vercel.app` link in about 30 seconds. Edits you commit to GitHub publish automatically.

Command line alternative: `npm i -g vercel`, then run `vercel --prod` inside the folder.

**Custom domain:** Vercel project, Settings, Domains, Add. Copy the DNS records it shows into your domain registrar. HTTPS is automatic.

## 4. Launch checklist

- [ ] Brand name, product name and prices replaced
- [ ] Page title and description updated in `index.html`
- [ ] Tested on a phone (drag a finger over the hero)
- [ ] Added a favicon

## 5. Troubleshooting

| Problem | Fix |
|---|---|
| No reflection under the phone | `js/main.js` didn't load; check the folder structure |
| Text looks different on Windows | Expected: Apple's system font falls back to Inter |
| Vercel shows 404 | `index.html` must be in the repo root, not in a subfolder |
| Tilt feels too strong | Lower the `24` in `js/main.js` |

Support: YOUR-SUPPORT-EMAIL
