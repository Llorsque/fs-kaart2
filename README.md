# Schoolschaatsen – v7 (GitHub-first, zonder uploads)
Doel: functionele kaart + live aantallen met filters en export, **zonder bestand upload**. Later koppelen we Supabase (pins komen dan direct uit DB met `lat/lon`).

## Bestanden
- `map.html` – kaart met filters (multi-select), live aantallen, export (CSV) van **gefilterde** set.
- `styles.css` – UI.
- `utils.js` – helpers.
- `data/schools.sample.json` – voorbeelddata (met `lat`/`lon` en een paar kolommen, incl. seizoenen).
- `index.html` – snelle launcher.

## Gebruik
1. Nieuwe GitHub-repo → zet deze bestanden in de root.
2. Activeer **GitHub Pages** (Deploy from branch, root).
3. Open `map.html`. De kaart gebruikt nu `data/schools.sample.json` als bron; **geen uploads**.

## Export
Knop **“Exporteer gefilterd”** maakt een CSV met precies de huidige gefilterde rijen.

## Volgende stap (Supabase)
We vervangen de lokale JSON door een query naar **schema `schoolschaatsen`, tabel `schools`**. Omdat `lat/lon` al in Supabase staan, worden pins direct geplot en toont de popup alle velden uit de betreffende rij.
