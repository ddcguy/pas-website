/* ===========================
   PAS Controls — Main JS
   =========================== */

// ── Navigation ───────────────────────────────
const nav       = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

// Scroll: add .scrolled class
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.classList.toggle('open');
    navLinks.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });
}

// Mobile dropdown toggles
document.querySelectorAll('.has-dropdown .dropdown-trigger').forEach(trigger => {
  trigger.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      trigger.closest('.has-dropdown').classList.toggle('open');
    }
  });
});

// Close menu on outside click
document.addEventListener('click', e => {
  if (nav && !nav.contains(e.target)) {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

// Close menu on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    navToggle?.classList.remove('open');
    navLinks?.classList.remove('open');
  }
});

// Highlight active nav link
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a[href]').forEach(link => {
  if (link.getAttribute('href') === currentFile) {
    link.classList.add('active');
  }
});

// ── Scroll Reveal ─────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Project Filters ───────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.toggleAttribute('data-hidden', !show);
      });
    });
  });
}
