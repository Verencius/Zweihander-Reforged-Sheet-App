# Zweihänder Reforged Character Forge

An offline character sheet builder based on the accompanying World Anvil templates.

## Start

Download **Character Forge.html** and open it in a modern browser. This single file contains the entire app: no installation, account, server, or internet connection is required.

## Features

- Editable identity, equipment, magic, advancement and session tracking.
- Live attribute, skill, threshold, armor, carrying-limit and initiative calculations.
- A 256 × 256 portrait token, with automatic center crop and resizing.
- Gallery cards with profession, ancestry, gender and total RP.
- Campaign tabs with dropdown and drag-and-drop character assignment.
- Character locking that prevents editing and deletion until explicitly unlocked.
- Browser autosave, portable JSON export/import, and confirmed character removal.
- A dedicated A4 print layout with two core pages and a magic page when recorded spells or rituals exist.

## Saving your characters

Characters and campaign assignments are stored in this browser on this device. Export JSON backups before moving the app, clearing browser data or changing browsers. Character exports include the portrait, lock state and campaign name. Character data is not bundled into this repository.

## Calculations

Purchased +5% attribute adjustments are applied before taking the attribute’s tens digit. Purchased bonus advances, ancestral bonuses and custom bonuses are added afterward. Thresholds and other dependent values use those final bonuses.

Recognized talent and equipment keywords are explained in the app. Only purchased talent names activate their automatic effects; descriptions remain notes. The first nine purchased Basic advances are free. Special-case formulas follow the source templates where applicable; this app does not contain a profession or lifepath database.

## Print / PDF

Choose A4, 100% scale, disable browser headers/footers, and enable background graphics for the parchment treatment. Long content scales to fit. Print layout has automated structural checks; visual pagination may vary by browser and still needs local review.

## Development

Edit `index.html`, `app.js`, `style.css`, and `schema.js`. Rebuild the single-file edition with Python 3:

```sh
python package_app.py
```

Run the checks with Node.js:

```sh
node run-tests.cjs
```

The app itself has no runtime dependencies. Python and Node.js are needed only for development.

The Tracking tab has been removed. Its eight combat/session controls remain editable on Overview. Corruption and permanent corruption are on Personal, silver and equipped weapons on Equipment, and reputation on Personal. No former Tracking field is lost.
