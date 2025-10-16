# Schoolschaatsen – v9 (samengevoegd deelname-filter)
- Excel is omgezet naar `data/schools.json`.
- **Deelname-jaren** zijn samengevoegd tot één multi-select filter **“Deelname (jaren)”** met opties: `2022/2023`, `2023/2024`, `2024/2025`, `2025/2026` — automatisch gedetecteerd op basis van je kolomnamen (alleen kolommen die `DEELNAME` + jaartal bevatten).
- Bij filteren geldt: een school wordt **getoond als er voor minstens één geselecteerd jaar** in de betreffende kolom **JA/WAAR/TRUE/1/X/Y** staat.  (Geen selectie → geen filtering op deelname.)

Overige filters worden automatisch aangemaakt voor alle kolommen (behalve lat/lon en de afzonderlijke deelname-kolommen). Exporteer de huidige selectie via de knop **Exporteer gefilterd**.
