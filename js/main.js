// ===== NAV BRACKET ANIMATION =====
// 1) Apparition du "<" avec curseur clignotant
setTimeout(() => {
  document.getElementById('bOpen').classList.add('on');
  document.getElementById('bCursor').classList.add('on');
}, 400);

// 2) Révélation du logo + liens entre les balises
setTimeout(() => {
  document.getElementById('navInner').classList.add('on');
}, 1100);

// 3) Apparition du "/>" — curseur s'arrête
setTimeout(() => {
  document.getElementById('bClose').classList.add('on');
  document.getElementById('bCursor').classList.remove('on');
}, 1700);

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function loop() {
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .service-card, .project-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
});

// ===== SCROLL REVEAL =====
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ===== CONTACT MODAL =====
const contactModal = document.getElementById('contact');

document.querySelectorAll('.contact-trigger').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    contactModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    contactModal.setAttribute('aria-hidden', 'false');
  });
});

contactModal.addEventListener('click', e => {
  if (e.target === contactModal || e.target.classList.contains('close-modal')) {
    contactModal.classList.remove('open');
    document.body.style.overflow = '';
    contactModal.setAttribute('aria-hidden', 'true');
  }
});

// NAV BAR TOGGLE (mobile)
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  // close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) nav.classList.remove('open');
    });
  });
}

// SCROLL TO TOP
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && contactModal.classList.contains('open')) {
    contactModal.classList.remove('open');
    document.body.style.overflow = '';
    contactModal.setAttribute('aria-hidden', 'true');
  }
});
