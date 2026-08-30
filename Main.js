/* =========================================================
   Basudeb Bej — Portfolio shared behaviour
   ========================================================= */
(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-icon');
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav-menu');

  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/></svg>`;
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>`;

  // ---- Theme ----
  const saved = localStorage.getItem('theme') || 'dark';
  root.classList.toggle('light', saved === 'light');

  function paintThemeIcon() {
    if (!themeBtn) return;
    themeBtn.innerHTML = root.classList.contains('light') ? sunIcon : moonIcon;
  }
  paintThemeIcon();

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
      paintThemeIcon();
    });
  }

  // ---- Nav toggle (mobile) ----
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 80, 400) + 'ms';
      io.observe(el);
    });
  }

  // ---- Gauge (skill bar) animation ----
  const gauges = document.querySelectorAll('.gauge-fill[data-value]');
  if (gauges.length) {
    const gio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.value + '%';
            gio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    gauges.forEach((g) => gio.observe(g));
  }

  // ---- CAD-style coordinate readout in hero (desktop only, respects reduced motion) ----
  const panel = document.querySelector('.hero-panel');
  const readout = document.getElementById('cad-readout');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (panel && readout && !prefersReducedMotion && !isTouch) {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      readout.textContent = `X: ${String(x).padStart(3, '0')}  Y: ${String(y).padStart(3, '0')}`;
    });
    panel.addEventListener('mouseleave', () => {
      readout.textContent = 'X: 000  Y: 000';
    });
  } else if (readout) {
    readout.textContent = 'SCALE 1:1';
  }
})();
