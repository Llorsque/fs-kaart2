# Schoolschaatsen – v8 (Excel → JSON, geen uploads)
Deze build gebruikt **jouw Excel** (sheet: *Sheet1*) als bron. De data is omgezet naar `data/schools.json`.  
**Alle filters** zijn automatisch gebaseerd op de **kolomnamen** uit je Excel. Pins worden geplot op basis van `lat/lon` kolommen (herkent o.a. `lat/lon`, `latitude/longitude`, `breedtegraad/lengtegraad`).

## Wat zit erin
- `map.html` – kaart + filters + export (CSV) van gefilterde rijen.
- `styles.css`, `utils.js`
- `data/schools.json` – jouw Excel-data (geen dummy).
- `index.html`, `README.md`

## Gebruik
1. Zet de bestanden in een nieuwe GitHub-repo (root) en activeer GitHub Pages.
2. Open `map.html` → filters staan links, kaart rechts.
3. **Export**: knop “Exporteer gefilterd”.

## Volgende stap (Supabase)
Later vervangen we de JSON door Supabase `.schema('schoolschaatsen').from('schools')` met identieke filters.
