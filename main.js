/* ═══════════════════════════════════════════════════════
   MAPLE VC — Shared JS
   Runs on every page. Add page-specific scripts inline.
═══════════════════════════════════════════════════════ */

// ── Nav: goes solid on scroll ──
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 16);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

// ── Active nav link (highlights current page) ──
const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === path || (path.endsWith('index.html') && href === '/')) {
    a.classList.add('active');
  }
});

// ── Scroll reveal (add class="reveal" + optional d1–d5 for delay) ──
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
  reveals.forEach(el => revealObs.observe(el));
}

// ── Duplicate ticker content so it loops seamlessly ──
const ticker = document.querySelector('.ticker-track');
if (ticker) {
  ticker.innerHTML += ticker.innerHTML; // clone once = seamless loop
}

// ── Newsletter form (Netlify handles submission, this just UX) ──
const nlForm = document.getElementById('nl-form');
if (nlForm) {
  nlForm.addEventListener('submit', e => {
    const btn = nlForm.querySelector('.nl-btn');
    btn.textContent = 'Subscribed ✓';
    btn.style.background = 'var(--yellow)';
    btn.disabled = true;
  });
}

// ── Auto-update copyright year ──
const yearEl = document.querySelector('.copyright-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
