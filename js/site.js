/* moritz-steinbach.de — Einwilligung, Google-Tag und Terminbuchung.
   ┌───────────────────────────────────────────────────────────────────────┐
   │ EINRICHTEN: Werte aus Google Ads eintragen, dann läuft die Messung.   │
   │ Solange ADS_ID leer ist, wird kein Tag geladen und der Hinweis zur    │
   │ Einwilligung bleibt aus — die Seite ist dann cookiefrei.              │
   │   ADS_ID          Conversion-ID, z. B. 'AW-123456789'                 │
   │   LABEL_TERMIN    Label der Conversion „Termin gebucht“               │
   │   LABEL_KALENDER  Label der Conversion „Kalender geöffnet“ (optional) │
   └───────────────────────────────────────────────────────────────────────┘ */
(function () {
  'use strict';

  var ADS_ID = 'AW-405138367';
  var LABEL_TERMIN = 'Dt5DCPXI8fgcEL_Xl8EB';
  var LABEL_KALENDER = 'nDweCPjI8fgcEL_Xl8EB';

  var KEY = 'ms-consent';

  /* Calendly wird erst geladen, wenn jemand auf einen Termin-Knopf drückt.
     Vorher geht von dieser Seite keine Anfrage dorthin. */
  var CAL_JS = 'https://assets.calendly.com/assets/external/widget.js';
  var CAL_CSS = 'https://assets.calendly.com/assets/external/widget.css';
  var CAL_HERKUNFT = 'https://calendly.com';
  var CAL_FRIST = 2500;   // ms; danach normaler Seitenwechsel statt Fenster

  function readChoice() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function saveChoice(value) {
    try { window.localStorage.setItem(KEY, value); } catch (e) { /* Privatmodus */ }
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  // Consent Mode v2: erst einmal alles aus.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  var tagLoaded = false;
  function loadTag() {
    if (tagLoaded || !ADS_ID) return;
    tagLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ADS_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', ADS_ID);
  }

  function grant() {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
    loadTag();
  }

  /* ── Conversions ──────────────────────────────────────────────────
     Ohne Einwilligung wird nichts gemeldet. Die Zahlen in Google Ads
     sind deshalb immer eine Untergrenze; die vollständige Zahl der
     Buchungen steht bei Calendly unter den Tracking-IDs. */
  function feuer(label) {
    if (!ADS_ID || !label) return;
    if (readChoice() !== 'granted') return;
    gtag('event', 'conversion', { send_to: ADS_ID + '/' + label });
  }

  /* Wird von danke.html aufgerufen, falls die Buchung einmal über eine
     Weiterleitung statt über das eingebettete Fenster läuft. */
  window.msConversion = function () { feuer(LABEL_TERMIN); };

  /* ── Einwilligung ─────────────────────────────────────────────── */
  function initConsent() {
    var box = document.getElementById('consent');
    var choice = readChoice();
    if (choice === 'granted') { grant(); }
    if (!box) return;
    if (!ADS_ID || choice) return; // ohne Tag kein Hinweis
    var yes = document.getElementById('consent-yes');
    var no = document.getElementById('consent-no');
    if (yes) yes.addEventListener('click', function () {
      saveChoice('granted');
      grant();
      box.removeAttribute('data-show');
    });
    if (no) no.addEventListener('click', function () {
      saveChoice('denied');
      box.removeAttribute('data-show');
    });
    window.setTimeout(function () { box.setAttribute('data-show', '1'); }, 900);
  }

  /* ── Terminkalender ───────────────────────────────────────────── */
  var calStand = 0;        // 0 nichts, 1 lädt, 2 bereit, 3 gescheitert
  var calWarten = [];

  function calBereit() {
    return !!(window.Calendly && window.Calendly.initPopupWidget);
  }
  function calAbarbeiten() {
    var ok = calStand === 2;
    while (calWarten.length) { calWarten.shift()(ok); }
  }
  function calFertig(erfolg) {
    if (calStand === 2 || calStand === 3) return;
    calStand = (erfolg && calBereit()) ? 2 : 3;
    calAbarbeiten();
  }

  function calLaden(dann) {
    if (calStand === 2) { dann(true); return; }
    if (calStand === 3) { dann(false); return; }
    calWarten.push(dann);
    if (calStand === 1) return;
    calStand = 1;

    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = CAL_CSS;
    document.head.appendChild(css);

    var js = document.createElement('script');
    js.src = CAL_JS;
    js.async = true;
    js.onload = function () { calFertig(true); };
    js.onerror = function () { calFertig(false); };
    document.head.appendChild(js);

    window.setTimeout(function () { calFertig(false); }, CAL_FRIST);
  }

  function initKalender() {
    var links = document.querySelectorAll('a[data-cal]');
    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener('click', function (ev) {
        if (ev.defaultPrevented) return;
        // Mittelklick, neuer Tab, neues Fenster: normal weiterreichen.
        if (ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
        var ziel = a.href;
        ev.preventDefault();
        feuer(LABEL_KALENDER);
        a.setAttribute('aria-busy', 'true');
        calLaden(function (ok) {
          a.removeAttribute('aria-busy');
          if (ok) { window.Calendly.initPopupWidget({ url: ziel }); }
          else { window.location.href = ziel; }
        });
      });
    });
  }

  /* Calendly meldet die gebuchte Zeit an das Fenster. Nur diese eine
     Herkunft wird angenommen, und aus der Meldung wird nichts übernommen
     außer der Tatsache, dass gebucht wurde. */
  function initMeldungen() {
    window.addEventListener('message', function (e) {
      if (e.origin !== CAL_HERKUNFT) return;
      var d = e.data;
      if (!d || typeof d.event !== 'string') return;
      if (d.event === 'calendly.event_scheduled') { feuer(LABEL_TERMIN); }
    });
  }

  /* ── Kampagnen-Parameter ──────────────────────────────────────────
     An den Buchungslink gehängt, damit in Calendly steht, woher jemand
     kommt. Nur utm-Parameter, keine Namen. */
  function initBookingLinks() {
    var here;
    try { here = new URL(window.location.href); } catch (e) { return; }
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var carry = [];
    keys.forEach(function (k) {
      var v = here.searchParams.get(k);
      if (v) carry.push([k, v]);
    });
    if (here.searchParams.get('gclid') && !here.searchParams.get('utm_source')) {
      carry.push(['utm_source', 'google'], ['utm_medium', 'cpc']);
    }
    if (!carry.length) return;
    var links = document.querySelectorAll('a[data-cal]');
    for (var i = 0; i < links.length; i++) {
      try {
        var target = new URL(links[i].href);
        carry.forEach(function (pair) { target.searchParams.set(pair[0], pair[1]); });
        links[i].href = target.toString();
      } catch (e) { /* ignorieren */ }
    }
  }

  function init() {
    initConsent();
    initBookingLinks();
    initKalender();
    initMeldungen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
