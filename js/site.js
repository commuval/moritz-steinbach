/* moritz-steinbach.de — Consent, Google-Tag und Link-Parameter.
   ┌───────────────────────────────────────────────────────────────────────┐
   │ EINRICHTEN: Beide Werte aus Google Ads eintragen, dann läuft die      │
   │ Messung. Solange ADS_ID leer ist, wird nichts geladen und der         │
   │ Consent-Banner bleibt aus — die Seite ist dann cookiefrei.            │
   │   ADS_ID          = Conversion-ID, z. B. 'AW-123456789'               │
   │   CONVERSION_LABEL = Label der Conversion „Termin gebucht“            │
   └───────────────────────────────────────────────────────────────────────┘ */
(function () {
  'use strict';

  var ADS_ID = '';
  var CONVERSION_LABEL = '';
  var KEY = 'ms-consent';

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

  /* Conversion auf der Danke-Seite. Wird dort aufgerufen. */
  window.msConversion = function () {
    if (!ADS_ID || !CONVERSION_LABEL) return;
    if (readChoice() !== 'granted') return;
    gtag('event', 'conversion', { send_to: ADS_ID + '/' + CONVERSION_LABEL });
  };

  function initConsent() {
    var box = document.getElementById('consent');
    var choice = readChoice();
    if (choice === 'granted') { grant(); }
    if (!box) return;
    if (!ADS_ID || choice) return; // ohne Tag kein Banner
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

  /* Kampagnen-Parameter an den Buchungslink hängen, damit im Kalender steht,
     woher jemand kommt. Es werden nur utm-Parameter übergeben, keine Namen. */
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
