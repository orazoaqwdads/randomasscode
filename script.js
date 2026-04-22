const SKILLS = [
  { name: 'HTML', icon: 'code-2', level: 0.99 },
  { name: 'CSS', icon: 'palette', level: 1 },
  { name: 'JavaScript', icon: 'braces', level: 0.69 },
  { name: 'PHP', icon: 'server', level: 0.42 },
  { name: 'C#', icon: 'cpu', level: 0.66 },
  { name: 'Luau', icon: 'gamepad-2', level: 1 },
  { name: 'Python', icon: 'terminal-square', level: 1 },
  { name: 'UI/UX Scripting', icon: 'layout-dashboard', level: 0.93 },
  { name: 'Systems Design', icon: 'workflow', level: 0.82 },
  { name: 'Game Dev', icon: 'gamepad-2', level: 0.98 },
  { name: 'Backend Dev', icon: 'database', level: 0.75 },
  { name: 'Web APIs', icon: 'plug', level: 0.72 },
];

const PROJECTS = [
  { num: '01', title: 'Coming soon', glyph: 'WI', desc: 'Coming soon.', tags: [] },
  { num: '02', title: 'Coming soon', glyph: 'RG', desc: 'Coming soon.', tags: [] },
  { num: '03', title: 'Coming soon', glyph: 'CD', desc: 'Coming soon.', tags: [] },
  { num: '04', title: 'Coming soon', glyph: 'PY', desc: 'Coming soon.', tags: [] },
  { num: '05', title: 'Coming soon', glyph: 'CM', desc: 'Coming soon.', tags: [] },
  { num: '06', title: 'Coming soon', glyph: 'AE', desc: 'Coming soon.', tags: [] },
];


const BOOT_LINES = [
  { text: '> Starting von.system v2.0.1', cls: 'hl' },
  { text: '> Loading Languages: HTML CSS JS PHP C# Luau Python', cls: 'dim' },
  { text: '> Connecting repositories...', cls: 'dim' },
  { text: '> Establishing secure connection...', cls: 'dim' },
  { text: '> Verifying System...', cls: 'dim' },
  { text: '> System ready.', cls: 'hl' },
];

function runBoot() {
  const logo = document.getElementById('boot-logo');
  const linesEl = document.getElementById('boot-lines');
  const bar = document.getElementById('boot-bar');
  const boot = document.getElementById('boot');

  setTimeout(() => logo.classList.add('show'), 200);
  BOOT_LINES.forEach((line, i) => {
    const div = document.createElement('div');
    div.className = 'boot-line ' + (line.cls || '');
    div.textContent = line.text;
    linesEl.appendChild(div);
    setTimeout(() => div.classList.add('show'), 600 + i * 280);
  });
  setTimeout(() => { bar.style.width = '100%'; }, 800);
  setTimeout(() => {
    boot.classList.add('fade-out');
    document.getElementById('heroName').classList.add('loaded');
    setTimeout(() => { boot.style.display = 'none'; startTyping(); }, 900);
  }, 3300);
}


const PHRASES = [
  'Developer. Programmer. scripter.',
  'HTML · CSS · JavaScript · PHP',
  'C# · Luau · Python',
  'Crafting systems that just work.',
  'From web to game engine.',
];

function startTyping() {
  const el = document.getElementById('typed-text');
  let phraseIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    const current = PHRASES[phraseIdx];
    if (deleting) {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % PHRASES.length; setTimeout(tick, 500); return; }
      setTimeout(tick, 38);
    } else {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 72);
    }
  }
  tick();
}


function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, mouse = { x: -9999, y: -9999 };
  let particles = [];
  const N_PARTICLES = 80;

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * W;
      this.y = init ? Math.random() * H : H + 10;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.size = Math.random() * 1.2 + 0.4;
      this.alpha = Math.random() * 0.4 + 0.08;
      this.white = Math.random() > 0.6;
    }
    update() {
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) { this.vx += dx / dist * 0.015; this.vy += dy / dist * 0.015; }
      this.vx *= 0.99; this.vy *= 0.99;
      this.x += this.vx; this.y += this.vy;
      if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.white ? '#ffffff' : '#00f5ff';
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < N_PARTICLES; i++) particles.push(new Particle());

  function drawGrid() {
    const CELL = 60;
    ctx.globalAlpha = 1;
    const mx = mouse.x, my = mouse.y;
    for (let x = 0; x < W + CELL; x += CELL) {
      for (let y = 0; y < H + CELL; y += CELL) {
        const dx = mx - x, dy = my - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const intensity = Math.max(0, 1 - dist / 280);
        const px = x + dx * intensity * 0.07;
        const py = y + dy * intensity * 0.07;
        ctx.beginPath();
        ctx.arc(px, py, 0.7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.04 + intensity * 0.2})`;
        ctx.globalAlpha = 1;
        ctx.fill();
      }
    }
    ctx.lineWidth = 0.4;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,245,255,${(1 - d / 90) * 0.12})`;
          ctx.globalAlpha = 1;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}


function initCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  let tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    tx = e.clientX; ty = e.clientY;
  });
  function animTrail() {
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();
}


function buildSkills() {
  const grid = document.getElementById('skills-grid');

  SKILLS.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'skill-tag reveal';
    div.style.transitionDelay = (i * 55) + 'ms';

    div.innerHTML = `
      <div class="skill-icon-wrap">
        <i data-lucide="${s.icon}" class="skill-icon"></i>
      </div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-level">
        <div class="skill-level-fill" style="width:${s.level * 100}%"></div>
      </div>
    `;

    grid.appendChild(div);
  });


  lucide.createIcons();
}


function buildProjects() {
  const grid = document.getElementById('projects-grid');
  PROJECTS.forEach((p, i) => {
    const div = document.createElement('div');
    div.className = 'project-card reveal';
    div.style.transitionDelay = (i * 75) + 'ms';
    div.innerHTML = `
      <div class="project-thumb">
        <div class="project-thumb-glyph">${p.glyph}</div>
        <div class="project-thumb-line"></div>
      </div>
      <div class="project-body">
        <div class="project-num">PROJECT ${p.num}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        <div class="project-tags">${p.tags.map(t=>`<span class="project-tag">${t}</span>`).join('')}</div>
      </div>`;
    div.addEventListener('mousemove', e => {
      const rect = div.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = (e.clientY - cy) / rect.height * 10;
      const ry = (cx - e.clientX) / rect.width * 10;
      div.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    div.addEventListener('mouseleave', () => { div.style.transform = ''; });
    grid.appendChild(div);
  });
}


function initScrollObserver() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        const num = entry.target.querySelector('[data-count]');
        if (num) animateCount(num);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-tag').forEach(el => obs.observe(el));
}

function animateCount(el) {
  const target = +el.dataset.count;
  const label = el.closest('.stat-card').querySelector('.stat-label').textContent;
  const suffix = label.includes('%') ? '%' : '+';
  let start = 0;
  const step = target / 50;
  const interval = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + (start >= target ? suffix : '');
    if (start >= target) clearInterval(interval);
  }, 28);
}


function initRipples() {
  document.querySelectorAll('.btn, .btn-submit').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
      this.appendChild(r);
      r.addEventListener('animationend', () => r.remove());
    });
  });
}


function initForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');

  const WEBHOOK_URL = "https://discord.com/api/webhooks/1496595471739650300/LI0nyYTtqdXTrrt2IZssBkVNt3ObENbWB__ubdYnKK_As900KAjwDzik94NBjuEPxM1Z";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.classList.add('loading');

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    const payload = {
      content: "Website Message Recived <@1266683724599136269>",
      embeds: [
        {
          title: "Contact Form Submission",
          color: 0x00f5ff,
          fields: [
            { name: "Name", value: name || "N/A", inline: true },
            { name: "Email", value: email || "N/A", inline: true },
            { name: "Message", value: message || "N/A" }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      form.style.display = 'none';
      success.classList.add('show');

    } catch (err) {
      alert("Failed to send message.");
      console.error(err);
    }

    btn.classList.remove('loading');
  });
}


document.addEventListener('DOMContentLoaded', () => {
  buildSkills();
  buildProjects();
  initCursor();
  initCanvas();
  initScrollObserver();
  initRipples();
  initForm();
  runBoot();
});
