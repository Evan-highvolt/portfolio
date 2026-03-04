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

// ===== HERO PARTICLES BACKGROUND =====
// small custom canvas particle system as a lightweight alternative to ogl
(function() {
  const container = document.querySelector('.hero');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'hero-canvas';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  const count = 200;
  const particles = [];
  const palette = ['#ffffff','#ffffff','#ffffff'];
  for (let i = 0; i < count; i++) {
    let x, y, z, len;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
      len = x * x + y * y + z * z;
    } while (len > 1 || len === 0);
    const r = Math.cbrt(Math.random());
    particles.push({
      pos: [x * r, y * r, z * r],
      random: [Math.random(), Math.random(), Math.random(), Math.random()],
      color: palette[Math.floor(Math.random() * palette.length)]
    });
  }

  // track mouse inside hero for interaction
  const mouse = { x: 0, y: 0 };
  container.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  });
  container.addEventListener('mouseleave', () => {
    mouse.x = mouse.y = 0;
  });

  let last = performance.now(), elapsed = 0;
  function update(t) {
    requestAnimationFrame(update);
    const delta = t - last;
    last = t;
    elapsed += delta * 0.001;

    ctx.clearRect(0, 0, width, height);
    const spread = 10;
    const baseSize = 3;
    const sizeRandomness = 1;

    particles.forEach(p => {
      let [x, y, z] = p.pos;
      const [r1, r2, r3, r4] = p.random;
      x *= spread;
      y *= spread;
      z *= spread;
      z *= 10;
      const ttime = elapsed;
      x += Math.sin(ttime * r3 + 6.28 * r4) * (0.1 + 1.4 * r1);
      y += Math.sin(ttime * r2 + 6.28 * r1) * (0.1 + 1.4 * r4);
      z += Math.sin(ttime * r4 + 6.28 * r2) * (0.1 + 1.4 * r3);

      // simple repulsion from mouse
      const dx = x - mouse.x * spread;
      const dy = y - mouse.y * spread;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < 1.0) {
        const force = 0.03 / (dist2 + 0.001);
        x += dx * force;
        y += dy * force;
      }

      const scale = 1 / (1 + z * 0.1);
      const sx = (x * scale + 1) / 2 * width;
      const sy = (y * scale + 1) / 2 * height;
      const size = ((baseSize * (1 + sizeRandomness * (r1 - 0.5))) / Math.sqrt(x * x + y * y + z * z)) * 10;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  update(last);
})();

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
