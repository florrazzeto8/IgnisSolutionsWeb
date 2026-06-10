// ── FLOATING ESCRIBINOS BUTTON ──
;(function() {
  const introSec    = document.getElementById('servicesIntro');
  const origBtn     = document.getElementById('escribinosBtn');
  const introPhrase = introSec?.querySelector('.intro-phrase');
  if (!introSec || !origBtn || !introPhrase) return;

  const fBtn = document.createElement('button');
  fBtn.className = 'escribinos-float';
  fBtn.innerHTML = 'Escribinos ↗';
  document.body.appendChild(fBtn);

  let landed = false, savedX = 0, savedY = 0, savedFS = 24;

  function updateBtn() {
    const pr  = introPhrase.getBoundingClientRect();
    const vh  = window.innerHeight;
    const vw  = window.innerWidth;
    const obr = origBtn.getBoundingClientRect();

    if (pr.top > 8) {
      savedX  = obr.left;
      savedY  = obr.top;
      savedFS = parseFloat(getComputedStyle(origBtn).fontSize);
      origBtn.style.opacity = '1';
      fBtn.style.display = 'none';
      landed = false;
      return;
    }

    origBtn.style.opacity = '0';
    fBtn.style.display = 'flex';

    const endX = vw - 210;
    const endY = 90;
    const scrolledPast = -pr.top;
    const p  = Math.max(0, Math.min(1, scrolledPast / (vh * 1.0)));
    const ep = 1 - Math.pow(1 - p, 3);

    fBtn.style.left     = (savedX + (endX - savedX) * ep) + 'px';
    fBtn.style.top      = (savedY + (endY - savedY) * ep) + 'px';
    fBtn.style.opacity  = String(0.4 + 0.6 * ep);
    fBtn.style.fontSize = (savedFS + (18 - savedFS) * ep) + 'px';
    fBtn.style.padding  = `10px ${(24 + (20 - 24) * ep).toFixed(1)}px`;

    if (p >= 0.95 && !landed) {
      landed = true;
      fBtn.classList.add('landed');
    } else if (p < 0.95 && landed) {
      landed = false;
      fBtn.classList.remove('landed');
    }
  }

  const openModal = () => document.getElementById('contactModal')?.classList.add('open');
  fBtn.addEventListener('click', openModal);
  origBtn.addEventListener('click', openModal);
  window.addEventListener('scroll', updateBtn, { passive: true });
  updateBtn();
})();

// ── CONTACT MODAL ──
;(function() {
  const modal = document.getElementById('contactModal');
  if (!modal) return;
  const close = () => modal.classList.remove('open');
  document.getElementById('modalClose')?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ── SERVICES HORIZONTAL SCROLL ──
;(function() {
  const sec = document.getElementById('services');
  if (!sec) return;
  sec.style.position = 'relative';

  const grid = sec.querySelector('.cards-grid');

  const zone = document.createElement('div');
  zone.className = 'services-zone';
  sec.parentNode.insertBefore(zone, sec);
  zone.appendChild(sec);

  const dotsWrap = document.createElement('div');
  dotsWrap.id = 'hscroll-dots';
  Array.from(grid.querySelectorAll('.card')).forEach(() => {
    const d = document.createElement('div');
    d.className = 'hscroll-dot';
    dotsWrap.appendChild(d);
  });
  sec.appendChild(dotsWrap);
  const dots = Array.from(dotsWrap.children);

  function setHeight() {
    const slideW = Math.max(0, grid.scrollWidth - window.innerWidth + 180);
    zone.style.height = window.innerHeight + slideW * 1.4 + 'px';
  }
  setHeight();
  window.addEventListener('resize', () => { setHeight(); tick(); });

  function tick() {
    const zr = zone.getBoundingClientRect();
    const p  = Math.max(0, Math.min(1, -zr.top / (zone.offsetHeight - window.innerHeight)));
    const maxSlide = Math.max(0, grid.scrollWidth - window.innerWidth + 180);
    grid.style.transform = `translateX(${-p * maxSlide}px)`;
    const active = Math.min(dots.length - 1, Math.round(p * (dots.length - 1)));
    dots.forEach((d, i) => d.classList.toggle('active', i === active));
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();