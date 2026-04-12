# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website hosted on GitHub Pages at `kriogman.com`. Static HTML/CSS/JS site — no build system or package manager.

## Architecture

- **HTML pages**: `index.html` (main portfolio/resume) + 4 project detail pages (`2gether.html`, `fintonic.html`, `IoT.html`, `kimia.html`)
- **Styles**: Source in `scss/` (with `style.scss` as entry point importing all partials prefixed with `_`). Compiled output in `css/style.css` and `css/style.min.css`. Edit SCSS files only — the CSS files in `css/` that are not `style.css`/`style.min.css` are third-party and should not be edited.
- **Scripts**: `js/app.js` is the main application logic; `js/contact.js` handles frontend AJAX for the contact form. All other JS files in `js/` are third-party libraries (jQuery, Bootstrap, Isotope, Flickity, particles.js, etc.) — do not edit them.
- **Contact form**: `php/contact.php` is the PHP backend; `js/contact.js` is the matching frontend. Email recipient is configured inside `php/contact.php`.
- **Custom domain**: Defined in `CNAME` (`kriogman.com`)

## SCSS Compilation

There is no automated build pipeline. After editing SCSS files, compile manually:

```bash
sass scss/style.scss css/style.css --style=expanded
sass scss/style.scss css/style.min.css --style=compressed
```

The `css/*.css.map` source map files are also updated alongside compilation.

## Deployment

Pushing to `main` on GitHub automatically deploys via GitHub Pages.
