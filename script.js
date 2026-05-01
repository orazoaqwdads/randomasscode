const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CONTACT_EMAIL = 'von291507@gmail.com';

const SKILLS = [
  { name: 'HTML', icon: 'code-2', fallback: 'HT', level: 0.99 },
  { name: 'CSS', icon: 'palette', fallback: 'CS', level: 1 },
  { name: 'JavaScript', icon: 'braces', fallback: 'JS', level: 0.69 },
  { name: 'PHP', icon: 'server', fallback: 'PH', level: 0.42 },
  { name: 'C#', icon: 'cpu', fallback: 'C#', level: 0.66 },
  { name: 'Luau', icon: 'gamepad-2', fallback: 'LU', level: 1 },
  { name: 'Python', icon: 'terminal-square', fallback: 'PY', level: 1 },
  { name: 'UI/UX Scripting', icon: 'layout-dashboard', fallback: 'UI', level: 0.93 },
  { name: 'Systems Design', icon: 'workflow', fallback: 'SD', level: 0.82 },
  { name: 'Game Dev', icon: 'gamepad-2', fallback: 'GD', level: 0.98 },
  { name: 'Backend Dev', icon: 'database', fallback: 'BE', level: 0.75 },
  { name: 'Web APIs', icon: 'plug', fallback: 'API', level: 0.72 },
];

const PROJECTS = [
  {
    num: '01',
    title: 'Awskiller Portfolio Website',
    glyph: 'AW',
    link: 'https://awskiller100.github.io/',
    img: 'images/awskiller10.png',
    desc: 'A clean, responsive portfolio website designed to showcase projects with smooth layout and strong visual structure.',
    tags: ['UI/UX', 'Frontend', 'Responsive'],
  },
  { num: '02', title: 'Coming Soon', glyph: '02', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '03', title: 'Coming Soon', glyph: '03', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '04', title: 'Coming Soon', glyph: '04', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '05', title: 'Coming Soon', glyph: '05', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '06', title: 'Coming Soon', glyph: '06', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '07', title: 'Coming Soon', glyph: '07', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '08', title: 'Coming Soon', glyph: '08', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '09', title: 'Coming Soon', glyph: '09', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '10', title: 'Coming Soon', glyph: '10', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '11', title: 'Coming Soon', glyph: '11', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
  { num: '12', title: 'Coming Soon', glyph: '12', link: '', desc: 'A reserved slot for the next shipped build.', tags: ['Planned'] },
];

const PHRASES = [
  'Developer. Programmer. Scripter.',
  'Web interfaces with sharp motion.',
  'Luau systems and backend logic.',
  'Clean tools, fast pages, steady code.',
];

function escapeHTML(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}

function initAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const href = anchor.getAttribute('href');
      event.preventDefault();

      if (!href || href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initHero() {
  const heroName = document.getElementById('heroName');
  requestAnimationFrame(() => heroName?.classList.add('loaded'));
  window.setTimeout(startTyping, 250);
}

function startTyping() {
  const el = document.getElementById('typed-text');
  const cursor = document.querySelector('.cursor-blink');
  if (!el) return;

  if (prefersReducedMotion) {
    el.textContent = PHRASES[0];
    cursor?.classList.add('is-hidden');
    return;
  }

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const current = PHRASES[phraseIdx];

    if (deleting) {
      charIdx -= 1;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % PHRASES.length;
        window.setTimeout(tick, 480);
        return;
      }
      window.setTimeout(tick, 34);
      return;
    }

    charIdx += 1;
    el.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      window.setTimeout(tick, 2100);
      return;
    }
    window.setTimeout(tick, 58);
  }

  tick();
}

function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let mouse = { x: -9999, y: -9999 };
  let fragments = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fragments = createFragments();
  }

  function createFragments() {
    const count = Math.min(70, Math.max(34, Math.floor(width / 28)));
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: 18 + Math.random() * 52,
      speed: 0.12 + Math.random() * 0.42,
      drift: Math.random() * Math.PI * 2,
      alpha: 0.08 + Math.random() * 0.18,
      cyan: Math.random() > 0.42,
    }));
  }

  function drawGrid(time) {
    const gap = 84;
    const offset = (time * 0.012) % gap;

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(180, 245, 255, 0.035)';

    for (let x = -gap + offset; x < width + gap; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height * 0.12, height);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    for (let y = -gap; y < height + gap; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y + offset * 0.35);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (mouse.x > -1) {
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(Math.max(0, mouse.x - 130), mouse.y);
      ctx.lineTo(Math.min(width, mouse.x + 130), mouse.y);
      ctx.moveTo(mouse.x, Math.max(0, mouse.y - 90));
      ctx.lineTo(mouse.x, Math.min(height, mouse.y + 90));
      ctx.stroke();
    }
  }

  function drawFragments(time) {
    fragments.forEach((fragment) => {
      const y = fragment.y + Math.sin(time * 0.001 + fragment.drift) * 8;
      const gradient = ctx.createLinearGradient(fragment.x, y, fragment.x + fragment.length, y);
      const color = fragment.cyan ? '0, 245, 255' : '255, 255, 255';

      gradient.addColorStop(0, `rgba(${color}, 0)`);
      gradient.addColorStop(0.45, `rgba(${color}, ${fragment.alpha})`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(fragment.x, y);
      ctx.lineTo(fragment.x + fragment.length, y);
      ctx.stroke();

      fragment.x += fragment.speed;
      if (fragment.x > width + 80) {
        fragment.x = -80;
        fragment.y = Math.random() * height;
      }
    });
  }

  function render(time = 0) {
    ctx.clearRect(0, 0, width, height);
    drawGrid(time);
    drawFragments(time);
  }

  function loop(time) {
    render(time);
    if (!prefersReducedMotion) requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (event) => {
    mouse = { x: event.clientX, y: event.clientY };
  });
  loop(0);
}

function initCursor() {
  const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');

  if (!supportsFinePointer || !cursor || !trail) {
    cursor?.remove();
    trail?.remove();
    return;
  }

  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    tx = event.clientX;
    ty = event.clientY;
  });

  function animateTrail() {
    trail.style.left = `${tx}px`;
    trail.style.top = `${ty}px`;
    requestAnimationFrame(animateTrail);
  }

  animateTrail();
}

function buildSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  SKILLS.forEach((skill, index) => {
    const item = document.createElement('div');
    item.className = 'skill-tag reveal';
    item.style.transitionDelay = `${index * 45}ms`;
    item.innerHTML = `
      <div class="skill-icon-wrap">
        <i data-lucide="${skill.icon}" class="skill-icon" aria-hidden="true">${skill.fallback}</i>
      </div>
      <div class="skill-name">${escapeHTML(skill.name)}</div>
      <div class="skill-level" aria-hidden="true">
        <div class="skill-level-fill" style="width:${skill.level * 100}%"></div>
      </div>
    `;
    grid.appendChild(item);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function buildProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  PROJECTS.forEach((project, index) => {
    const card = document.createElement('article');
    const hasLink = Boolean(project.link);
    const hasImage = Boolean(project.img);

    card.className = `project-card reveal ${hasLink ? 'is-linked' : 'is-muted'}`;
    if (index >= 6) {
      card.classList.add('extra');
      card.hidden = true;
    }
    card.style.transitionDelay = `${index * 60}ms`;

    if (hasLink) {
      card.tabIndex = 0;
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `Open ${project.title}`);
    }

    card.innerHTML = `
      <div class="project-thumb">
        ${hasImage ? `<img src="${project.img}" class="project-thumb-img" alt="">` : ''}
        <div class="project-thumb-glyph">${escapeHTML(project.glyph || project.num)}</div>
        <div class="project-thumb-line"></div>
        <div class="project-thumb-hover">${hasLink ? 'Open Project' : 'In Progress'}</div>
      </div>
      <div class="project-body">
        <div class="project-num">PROJECT ${escapeHTML(project.num)}</div>
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-desc">${escapeHTML(project.desc)}</p>
        <div class="project-tags">${project.tags.map((tag) => `<span class="project-tag">${escapeHTML(tag)}</span>`).join('')}</div>
      </div>
    `;

    if (hasLink) {
      const openProject = () => window.open(project.link, '_blank', 'noopener,noreferrer');
      card.addEventListener('click', openProject);
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProject();
        }
      });
    }

    card.addEventListener('mousemove', (event) => {
      if (prefersReducedMotion) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((event.clientY - cy) / rect.height) * 6;
      const ry = ((cx - event.clientX) / rect.width) * 6;
      card.style.transform = `translateY(-7px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    grid.appendChild(card);
  });

  const hiddenCards = [...grid.querySelectorAll('.project-card.extra')];
  if (!hiddenCards.length) return;

  const button = document.createElement('button');
  button.className = 'btn btn-secondary view-more-btn';
  button.id = 'viewMoreBtn';
  button.type = 'button';
  button.textContent = 'View More';
  grid.parentElement.appendChild(button);

  button.addEventListener('click', () => {
    hiddenCards.forEach((card, index) => {
      card.hidden = false;
      window.setTimeout(() => card.classList.add('in-view'), index * 70);
    });
    button.remove();
  });
}

function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      const num = entry.target.querySelector('[data-count]');
      if (num) animateCount(num);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-tag').forEach((el) => {
    observer.observe(el);
  });
}

function animateCount(el) {
  const target = Number(el.dataset.count);
  const label = el.closest('.stat-card')?.querySelector('.stat-label')?.textContent || '';
  const suffix = label.includes('%') ? '%' : '+';

  if (prefersReducedMotion) {
    el.textContent = `${target}${suffix}`;
    return;
  }

  let current = 0;
  const step = Math.max(1, target / 45);
  const interval = window.setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = `${Math.floor(current)}${current >= target ? suffix : ''}`;
    if (current >= target) window.clearInterval(interval);
  }, 24);
}

function initRipples() {
  if (prefersReducedMotion) return;

  document.querySelectorAll('.btn, .btn-submit').forEach((button) => {
    button.addEventListener('click', function addRipple(event) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.className = 'ripple';
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

function initForm() {
  const form = document.getElementById('contact-form');
  const button = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');

  if (!form || !button || !success) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    button.classList.add('loading');

    const name = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const message = form.querySelector('textarea').value.trim();
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || 'website visitor'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      form.reset();
      form.style.display = 'none';
      success.classList.add('show');
      button.classList.remove('loading');
    }, 250);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAnchors();
  buildSkills();
  buildProjects();
  initHero();
  initCursor();
  initCanvas();
  initScrollObserver();
  initRipples();
  initForm();
  initHamburger();
});
