# moritz-steinbach.de

Statische Visitenkarten-Site. Reine HTML + JS (React UMD, pre-compiled). Keine Build-Pipeline, keine Tracker, keine Cookies. DSGVO-konform mit lokal gehosteten Schriftarten.

## Dateistruktur

```
website/
├── index.html              # Hauptseite (Hero / Diagnose / CTA)
├── impressum.html
├── datenschutz.html
├── _headers                # Cloudflare Pages: Security-Header + Caching
├── fonts/
│   ├── inter-latin-wght-normal.woff2
│   └── inter-latin-ext-wght-normal.woff2
└── js/
    ├── react.production.min.js
    ├── react-dom.production.min.js
    └── app.js              # Pre-compiled von JSX (kein Babel im Browser)
```

Gesamtgröße: ~270 KB. Lädt auf 4G in unter einer Sekunde.

---

## Vor dem Deployment personalisieren

In `js/app.js` drei Platzhalter ersetzen:

| Suchen                       | Ersetzen durch                              |
|------------------------------|---------------------------------------------|
| `href: "https://calendly.com"` | Deine echte Calendly-URL                  |
| `href: "https://linkedin.com"` | Deine LinkedIn-Profil-URL                 |
| `href: "mailto:hallo@example.com"` | `mailto:hallo@moritz-steinbach.de`    |

Die E-Mail-Adresse `hallo@moritz-steinbach.de` ist in `impressum.html` und `datenschutz.html` bereits eingetragen. Falls du eine andere willst, dort auch ändern.

---

## Lokal testen

```bash
cd website
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Deployment: Hetzner Domain + Cloudflare Pages

Reihenfolge ist wichtig. Insgesamt ~30 Minuten.

### 1. Domain bei Hetzner registrieren (~5 Min)

1. Account anlegen: <https://accounts.hetzner.com>
2. Zur Hetzner Console: <https://console.hetzner.com>
3. „Domains" → „Domain registrieren" → `moritz-steinbach.de` suchen
4. Bestellen (5,38€/Jahr für .de über konsoleH-Pfad)
5. **Wichtig:** Bei der Bestellung *nicht* die Hetzner-Nameserver übernehmen — die wechseln wir gleich auf Cloudflare. Hetzner-Standard-NS sind aber OK als Initial-Setting.

### 2. Code auf GitHub legen (~5 Min)

Cloudflare Pages braucht ein Git-Repo. Wenn du keinen GitHub-Account hast, schnell einen anlegen.

```bash
cd website
git init
git add .
git commit -m "Initial commit"
# Repo auf github.com anlegen (privat ist OK), dann:
git remote add origin git@github.com:DEIN_USER/moritz-steinbach-de.git
git branch -M main
git push -u origin main
```

### 3. Cloudflare-Account + Pages-Projekt anlegen (~5 Min)

1. Account: <https://dash.cloudflare.com/sign-up> (Free-Plan reicht völlig)
2. Im Dashboard: „Workers & Pages" → „Create" → Tab „Pages" → „Connect to Git"
3. GitHub autorisieren, das Repo auswählen
4. **Build-Einstellungen:**
   - Framework preset: **None**
   - Build command: *(leer lassen)*
   - Build output directory: `/` *(also nichts ändern, Wurzel des Repos)*
5. „Save and Deploy" — nach ~30s ist die Seite live unter einer `*.pages.dev`-Subdomain. Klick drauf zum Testen.

### 4. Custom Domain hinzufügen (~10 Min, davon 5 Min Warten auf DNS)

In Cloudflare Pages, beim erstellten Projekt:

1. Tab „Custom domains" → „Set up a custom domain"
2. `moritz-steinbach.de` eingeben → „Continue"
3. Cloudflare leitet dich an, die Domain in Cloudflare aufzunehmen (also als „Site" hinzuzufügen, das ist ein eigener Schritt vom Pages-Projekt). Klick auf den Vorschlag und folge dem Setup-Wizard.
4. Cloudflare zeigt dir zwei Nameserver, z.B. `lars.ns.cloudflare.com` und `lia.ns.cloudflare.com` — die brauchen wir gleich bei Hetzner.

### 5. Nameserver bei Hetzner auf Cloudflare umstellen (~5 Min Setup, dann bis zu 24h Propagation)

Zurück zur Hetzner Console:

1. Domain auswählen → „DNS" oder „Nameserver"
2. Auf „Eigene Nameserver" / „Externe Nameserver" wechseln
3. Die zwei Cloudflare-Nameserver eintragen (die aus Schritt 4)
4. Speichern

Nach DNS-Propagation (meist 5-30 Min, manchmal bis 24h) zeigt `moritz-steinbach.de` auf Cloudflare Pages. SSL ist automatisch über Cloudflare aktiv (Let's Encrypt + Cloudflare-eigene Zertifikate).

### 6. Verifizieren

```bash
# DNS check
dig +short NS moritz-steinbach.de
# Sollte die zwei Cloudflare-NS zeigen

# HTTPS check
curl -I https://moritz-steinbach.de
# Sollte HTTP/2 200 zeigen
```

In Cloudflare-Dashboard: SSL/TLS → Encryption mode → **Full (strict)**. Das ist wichtig, sonst gibt's Loops zwischen Pages und Cloudflare.

---

## Inhaltliche Anpassungen später

**Texte ändern** → `js/app.js` direkt editieren. Suchstring → ändern → committen → pushen → Cloudflare deployed in 30s automatisch neu.

**Größere Code-Änderungen mit JSX** → Wenn du wieder JSX statt React.createElement-Calls schreiben willst, brauchst du Babel als Build-Step:

```bash
npm install --save-dev @babel/core @babel/preset-react @babel/cli
npx babel src/app.jsx --presets=@babel/preset-react -o js/app.js
```

Solange du nur Strings und kleine Things änderst, kannst du auch direkt im transpilierten `app.js` editieren — das ist normales JavaScript ohne JSX.

**Impressum/Datenschutz aktualisieren** → Die zwei HTML-Dateien sind eigenständig, einfach editieren.

---

## Was diese Site (nicht) tut

- ✅ Statisch, schnell, keine externe Anfrage außer beim Klick auf Calendly/LinkedIn/Mail
- ✅ Inter-Font selbst gehostet (kein Google Fonts)
- ✅ Keine Cookies, kein Tracking, kein Analytics
- ✅ Pre-compiled JS (kein 3MB Babel im Browser)
- ✅ Security-Header über `_headers`
- ✅ CSP ohne `'unsafe-inline'` für Scripts

- ❌ Kein Analytics — falls du Plausible oder Fathom später hinzufügen willst (beide DSGVO-konform, EU-gehostet, ohne Cookies), Datenschutzerklärung entsprechend ergänzen.
- ❌ Kein Kontaktformular — bewusst nur mailto-Links, um keine Daten zu verarbeiten.

---

## Cloudflare Pages Free Tier — was du hast

- Unlimited Requests/Bandwidth
- 500 Builds/Monat
- 100 Custom Domains
- Automatisches SSL
- Globales CDN
- Preview-Deployments auf jedem Branch

Reicht für diese Site bis ans Ende aller Tage.
