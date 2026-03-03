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
