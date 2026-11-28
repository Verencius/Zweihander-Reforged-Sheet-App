# Zweihänder Reforged Character Forge

An offline character sheet builder based on the accompanying World Anvil templates.

## Start

Download **Character Forge.html** and open it in a modern browser. This single file contains the entire app: no installation, account, server, or internet connection is required.

## Features

- Editable identity, equipment, magic, advancement and condition tracks.
- Affliction and Injury day trackers with synchronized Overview summaries and one-page note printing.
- Live attribute, skill, threshold, armor, carrying-limit and initiative calculations.
- A 256 × 256 portrait token, with automatic center crop and resizing.
- Gallery cards with profession, ancestry, gender and total RP.
- Campaign tabs with dropdown and drag-and-drop character assignment.
- Character locking that prevents editing and deletion until explicitly unlocked.
- Browser autosave, portable JSON export/import, and confirmed character removal.
- A4 character printing with two core pages, an optional Advancement sheet, recorded magic, and an optional tracker notes page.

## Saving your characters

Characters and campaign assignments are stored in this browser on this device. Export JSON backups before moving the app, clearing browser data or changing browsers. Character exports include the portrait, lock state and campaign name. Character data is not bundled into this repository.

## Calculations

Purchased +5% attribute adjustments are applied before taking the attribute’s tens digit. Purchased bonus advances, ancestral bonuses and custom bonuses are added afterward. Thresholds and other dependent values use those final bonuses.

Recognized talent and equipment keywords are explained in the app. Only purchased talent names activate their automatic effects; descriptions remain notes. The first nine purchased Basic advances are free. Special-case formulas follow the source templates where applicable; this app does not contain a profession or lifepath database.

## Print / PDF

Choose A4, 100% scale, disable browser headers/footers, and enable background graphics for the parchment treatment. **Include Advancement sheet** adds its own page; **Include Affliction Trackers** appends all tracker notes on one page. **Export current state** includes track-stage dots and current Peril/Horror penalty annotations; it is unchecked by default. Long content scales to fit. Print layout has automated structural checks; visual pagination may vary by browser and still needs local review.

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

Peril, Damage and Horror stages are selected directly on Overview. Personal contains Scars, Corruption and Malignancies; Equipment contains weapons, supplies, silver and six object/penalty rows. The Condition Trackers tab manages Affliction and Injury recovery progress.

## Full-library backup

In Gallery, choose **Export full backup** to download `Zweihander - Full Backup - YYYY-MM-DD_HH-mm-ss.json`. It contains every character and its embedded portrait, gallery data, campaigns, assignments, lock states and the active character ID. Images are included as data URLs; no separate image folder is needed.

Use **Restore backup** in Gallery to load this format (up to 50 MB). Restore validates the complete file, asks for confirmation, and adds its characters alongside the existing library. Character IDs are remapped to avoid collisions, matching campaign names are reused, and existing characters—including locked characters—are not overwritten. Importing the same backup repeatedly adds additional copies of its characters. Keep the downloaded backup independently of browser storage.

### App versions and updates

About shows the installed version and offers an on-demand GitHub update check. When a newer version is available, Download update verifies the standalone HTML file against the SHA-256 value in version.json. Export a full backup, close the app, replace the existing Character Forge.html in the same folder, and reopen it.

For a new release, increment APP_RELEASE.version in app.js and set its date, then run python package_app.py. Commit app.js, the rebuilt Character Forge.html, and the generated version.json together. The version manifest and standalone HTML must come from the same build.

## Condition trackers

Use **Add tracker** on Condition Trackers or **Add Affliction / Injury** beside Starving on Overview. Enter a condition type, name, Duration (1–33), Days passed, and a single-line description. Checking a day fills it and earlier boxes; unchecking clears it and later boxes. Progress is shown as passed / total, for example `3 / 33`.

Tracker summaries update automatically beneath Attributes and Skills. Manual notes remain separate and start two lines tall, with vertical resizing. Trackers are included in character JSON and full backups; character locks protect them from edits and removal.

**Print all notes** prints every tracker together on one A4 page. Up to six notes retain their 3 × 3-inch size; larger sets scale down together. Notes record progress without automatically advancing days or applying penalties.
