/* moritz-steinbach.de — Einblenden beim Scrollen.
   Läuft nur, wenn <html> die Klasse js-reveal trägt (siehe Inline-Skript im
   <head>). Ohne JavaScript, ohne IntersectionObserver oder bei reduzierter
   Bewegung ist alles sofort sichtbar. */
(function () {
  'use strict';
  var root = document.documentElement;
  if (!root.classList.contains('js-reveal')) return;
  window.__rv = 1;

  var GRUPPEN = [
    '.sect > .narrow', '.ref-split-l', '.satz', '.these', '.bsp-text', '.balken > *',
    '.ax', '.bio-block', '.kurz', '.ref-card', '.auch-liste > div',
    '.faq', '.close-text', '.close-side', '.logo-band'
  ];

  var zaehler = new Map();
  var elemente = [];

  GRUPPEN.forEach(function (sel) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), function (el) {
      if (el.dataset.rv) return;
      el.dataset.rv = '1';
      el.classList.add('rv');
      var p = el.parentNode;
      var i = zaehler.get(p) || 0;
      zaehler.set(p, i + 1);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 4) * 70 + 'ms');
      elemente.push(el);
    });
  });

  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      beobachter.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });

  elemente.forEach(function (el) {
    // Was beim Laden schon im Bild ist, wird nicht animiert.
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) {
      el.style.setProperty('--d', '0ms');
      el.classList.add('in');
    } else {
      beobachter.observe(el);
    }
  });
})();
