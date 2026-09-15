# moritz-steinbach.de

Einseitige Landingpage für die KI-Beratung. Statisches HTML, keine Build-Pipeline,
kein Framework. Cloudflare Pages liefert den Inhalt dieses Repos aus
(Branch `main`, Build-Command leer, Output-Verzeichnis `/`).

## Dateien

```
index.html          die Seite selbst
css/site.css        alle Stile, einschließlich @font-face
js/site.js          Consent-Banner und Google-Tag (ruhen, solange ADS_ID leer ist)
js/reveal.js        Einblenden beim Scrollen
danke.html          Zielseite nach der Terminbuchung
js/danke.js
impressum.html
datenschutz.html
favicon.svg
fonts/              IBM Plex Sans und Serif, selbst gehostet, auf Latin reduziert (62 KB)
images/             Porträt und Kundenlogos als WebP
_headers            Cloudflare Pages: Security-Header und Caching
CNAME               moritz-steinbach.de
```

Rund 150 KB für die erste Ansicht, davon 62 KB Schriften. Beim Laden geht keine
Anfrage an einen fremden Server.

## Zwei Dinge, die beim Ändern leicht kaputtgehen

**Der CSP-Hash.** In `_headers` steht unter `script-src` ein `'sha256-…'`. Er gehört zu
dem kleinen Skript im `<head>` von `index.html`. Wird dieses Skript geändert, muss der
Hash neu berechnet werden, sonst blockiert der Browser es stillschweigend und die
Einblend-Effekte bleiben aus. Neuen Hash erzeugen:

```bash
python3 -c "import hashlib,base64,re,sys; s=re.search(r'<script>(.*?)</script>', open('index.html',encoding='utf-8').read(), re.S).group(1); print('sha256-'+base64.b64encode(hashlib.sha256(s.encode()).digest()).decode())"
```

**Die Cache-Stempel.** `css/site.css?v=6`, `js/site.js?v=4`, `js/reveal.js?v=1`,
`js/danke.js?v=3`. Diese Dateien werden ein Jahr lang gecacht. Nach einer Änderung die
Zahl in allen HTML-Dateien erhöhen, die sie einbinden, sonst sehen wiederkehrende
Besucher die alte Fassung.

## Lokal ansehen

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Veröffentlichen

`git push` auf `main`. Cloudflare Pages baut automatisch, nach etwa einer halben Minute
ist die Änderung live.

## Offen

- `ADS_ID` und `CONVERSION_LABEL` in `js/site.js` eintragen, sobald die Conversion in
  Google Ads angelegt ist. Solange beide leer sind, wird nichts nachgeladen, der
  Consent-Banner bleibt aus und die Seite ist cookiefrei.
- Calendly so einstellen, dass nach der Buchung auf `/danke.html` weitergeleitet wird.
- Die Datenschutzerklärung juristisch prüfen lassen.
