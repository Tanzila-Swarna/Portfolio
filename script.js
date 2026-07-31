(function initTheme(){
  const saved = localStorage.getItem('portfolio-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
})();

function applyThemeIcon(theme){
  const btn = document.getElementById('theme-btn');
  if(!btn) return;
  btn.classList.remove('fa-moon', 'fa-sun');
  btn.classList.add(theme === 'light' ? 'fa-sun' : 'fa-moon');
}

function toggleTheme(){
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  applyThemeIcon(next);
}

const NEWS = [
  { date: "Jul 2026", title: "Selected and received offer letter for exchange program at USM", desc: "Confirmed and Received the offer let for the semester exchange program at Universiti Sains Malaysia.", image: "OF-1.jpg"},
  { date: "May 2026", title: "Joined CDC as Campus Ambassador", desc: "Started representing the Career Development Center on campus.", image: null },
  { date: "Apr 2026", title: "Wrapped up Axiom Season-01 as Campus Ambassador", desc: "Helped organise and promote the event across campus.", image: "AXIOM_S1.png" },
  { date: "Apr 2026", title: "CGPA milestone — 3.97", desc: "Closed the semester maintaining strong academic performance.", image: null },
  { date: "Mar 2026", title: "Skill Jobs Campus Ambassador onboarding", desc: "Onboarded as Campus Ambassador for Skill Jobs.", image: null },
  { date: "Feb 2026", title: "Volunteered at 13th convocation,DIU", desc: "Supported event coordination during the convocation ceremony.", image: null },
  { date: "Jan 2026", title: "Volunteered at Daffodil Family Day, 2026 ", desc: "Supported event coordination by being a Food Distributor and Back Up team member.", image: null },
  { date: "Dec 2025", title: "LifeFloat became a hit project", desc: "Got extra points for the flood rescue support system.", image: null },
  { date: "Nov 2025", title: "Conducted a Free Computer Session", desc: "Taught students about the basic fundamentals of the computer.", image: "computer-class.jpg" }
];

const FEEDBACK = [
  { quote: "A dedicated and reliable student who consistently goes beyond what's asked in class projects.", name: "Tahsin Tasnim", role: "Lecturer<br> Department of Software Engineering<br> Daffodil International University" },
  { quote: "Shows strong initiative in both technical work and leadership activities on campus.", name: "Tahmina Meem", role: "Lecturer<br> Department of Software Engineering<br> Daffodil International University" },
  { quote: "Balances academic excellence with genuine creative talent; a rare and valuable combination.", name: "Sakib Ali Majumder", role: "Lecturer<br> Department of Software Engineering<br> Daffodil International University" }
];

function renderNews(){
  const mount = document.getElementById('news-container');
  if(!mount) return;
  mount.innerHTML = NEWS.map(n => `
    <div class="timeline-item reveal">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <h3>${n.date}</h3>
        <h4>${n.title}</h4>
        <p>${n.desc}</p>
        ${n.image ? `<img src="${n.image}" alt="${n.title}">` : ''}
      </div>
    </div>
  `).join('');
}

function renderFeedback(){
  const mount = document.getElementById('feedback-container');
  if(!mount) return;
  mount.innerHTML = FEEDBACK.map(f => `
    <div class="feedback-card reveal tilt">
      <div class="quote-mark">&ldquo;</div>
      <p class="quote">${f.quote}</p>
      <div class="person">
        <strong>${f.name}</strong>
        <span>${f.role}</span>
      </div>
    </div>
  `).join('');
}


function initContactForm(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('sent');
    form.reset(); 
    const success = document.getElementById('form-success');
    setTimeout(() => success.classList.add('show'), 250);
  });
}
function initMobileNav(){
  const burger = document.getElementById('nav-burger');
  const links = document.getElementById('nav-links');
  if(!burger || !links) return;
  burger.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
}

function initTilt(){
  const cards = document.querySelectorAll('.tilt');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 7;
      const rotateX = -((y - cy) / cy) * 7;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initCustomCursor(){
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if(!dot || !ring) return;
  if(window.matchMedia('(pointer: coarse)').matches) return; // skip on touch devices

  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    ring.dataset.tx = e.clientX;
    ring.dataset.ty = e.clientY;
  });

  function animateRing(){
    const tx = parseFloat(ring.dataset.tx) || 0;
    const ty = parseFloat(ring.dataset.ty) || 0;
    ringX += (tx - ringX) * 0.15;
    ringY += (ty - ringY) * 0.15;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverables = document.querySelectorAll('a, button, .tilt, input, textarea');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity = 0; ring.style.opacity = 0; });
  document.addEventListener('mouseenter', () => { dot.style.opacity = 1; ring.style.opacity = 1; });
}

function initCertModal(){
  const modal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('cert-modal-img');
  const modalTitle = document.getElementById('cert-modal-title');
  const closeBtn = document.getElementById('cert-modal-close');
  if(!modal) return;

  document.querySelectorAll('.cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modalImg.src = btn.dataset.cert;
      modalTitle.textContent = btn.dataset.title || 'Certificate';
      modal.classList.add('open');
    });
  });

  function closeModal(){ modal.classList.remove('open'); }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeModal(); });
}

function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  applyThemeIcon(document.documentElement.getAttribute('data-theme'));

  renderNews();
  renderFeedback();
  initContactForm();
  initMobileNav();
  initReveal();
  initTilt();
  initCustomCursor();
  initCertModal();

  const themeBtn = document.getElementById('theme-btn');
  if(themeBtn) themeBtn.addEventListener('click', toggleTheme);
});
