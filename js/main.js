/* ==========================================================================
   Union & Company — main.js
   Progressive enhancement only. The site is fully usable without this file.
     1. Mobile navigation toggle
     2. Scroll reveal for section headings
     3. Contact form: pre-select inquiry type from the URL
   ========================================================================== */
(function () {
  'use strict';

  /* 1. Mobile navigation ---------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    var openNav = function () {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      if (open) { closeNav(); } else { openNav(); }
    });

    // Close on Escape and return focus to the toggle.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        toggle.focus();
      }
    });

    // Close the menu once a link is chosen.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { closeNav(); }
    });

    // Reset state if the viewport grows past the mobile breakpoint.
    var mq = window.matchMedia('(min-width: 768px)');
    var onChange = function () { if (mq.matches) { closeNav(); } };
    if (mq.addEventListener) { mq.addEventListener('change', onChange); }
    else if (mq.addListener) { mq.addListener(onChange); }
  }

  /* 2. Scroll reveal -------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reveals.length && 'IntersectionObserver' in window && !prefersReduced) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target); // reveal once, never re-trigger
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    // No observer support or reduced motion: show everything immediately.
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* 3. Contact form --------------------------------------------------------- */
  // (The hero skyline wipe is a pure CSS animation; see .skyline-hero in styles.css.)
  var form = document.querySelector('[data-contact-form]');
  if (!form) { return; }

  var typeInputs = form.querySelectorAll('input[name="inquiry-type"]');

  // Map URL ?type= (or #type) values to radio values.
  var typeMap = {
    'tourism-guiding': 'tourism-guiding',
    'tourism': 'tourism-guiding',
    'guiding': 'tourism-guiding',
    'tourism-partnerships': 'tourism-partnerships',
    'partnerships': 'tourism-partnerships',
    'advisory': 'tourism-partnerships',
    'weddings': 'weddings',
    'wedding': 'weddings'
  };

  var getRequestedType = function () {
    var params = new URLSearchParams(window.location.search);
    var raw = params.get('type');
    if (!raw && window.location.hash) { raw = window.location.hash.replace('#', ''); }
    if (!raw) { return null; }
    return typeMap[raw.toLowerCase()] || null;
  };

  var requested = getRequestedType();
  if (requested) {
    typeInputs.forEach(function (input) {
      if (input.value === requested) { input.checked = true; }
    });
  }

  /* Lightweight, accessible validation (native validation still applies). */
  form.addEventListener('submit', function (e) {
    var invalid = form.querySelector(':invalid:not([disabled])');
    if (invalid) {
      e.preventDefault();
      invalid.setAttribute('aria-invalid', 'true');
      invalid.focus();
    }
  });
  form.addEventListener('input', function (e) {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
      e.target.removeAttribute('aria-invalid');
    }
  });
})();
