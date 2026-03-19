# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website hosted on GitHub Pages at `kriogman.com`. Static HTML/CSS/JS site — no build system or package manager.

## Architecture

- **HTML pages**: `index.html` (main portfolio/resume) + 4 project detail pages (`2gether.html`, `fintonic.html`, `IoT.html`, `kimia.html`)
- **Styles**: Source in `scss/` (with `style.scss` as entry point), compiled output in `css/`. Edit SCSS files, then compile manually to regenerate `css/style.css` and `css/style.min.css`.
- **Scripts**: `js/app.js` is the main application logic; all other JS files in `js/` are third-party libraries (jQuery, Bootstrap, Isotope, Flickity, etc.)
- **Contact form**: `php/contact.php` — PHP backend for the contact form; email recipient is configured inside that file
- **Custom domain**: Defined in `CNAME` (`kriogman.com`)

## SCSS Compilation

There is no automated build pipeline. After editing SCSS files, compile manually using any SCSS compiler:

```bash
sass scss/style.scss css/style.css --style=expanded
sass scss/style.scss css/style.min.css --style=compressed
```

The `css/*.css.map` source map files are also expected to be updated alongside compilation.

## Deployment

Pushing to `main` on GitHub automatically deploys via GitHub Pages.
