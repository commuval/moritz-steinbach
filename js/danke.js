/* Zählt die Conversion „Termin gebucht“, sobald in js/site.js eine Google-Ads-ID
   eingetragen ist und die Person zugestimmt hat. */
(function () {
  'use strict';
  function fire() {
    if (typeof window.msConversion === 'function') window.msConversion();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fire);
  } else {
    fire();
  }
})();
