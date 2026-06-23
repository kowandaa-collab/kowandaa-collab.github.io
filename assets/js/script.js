const SVG = {
  code: `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  tree: `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2"/><circle cx="5" cy="20" r="2"/><circle cx="19" cy="20" r="2"/><line x1="12" y1="6" x2="12" y2="13"/><line x1="12" y1="13" x2="5" y2="18"/><line x1="12" y1="13" x2="19" y2="18"/></svg>`,
  db:   `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v4c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 9v5c0 1.66 4 3 9 3s9-1.34 9-3V9"/><path d="M3 14v4c0 1.66 4 3 9 3s9-1.34 9-3v-4"/></svg>`,
  img:  `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
};

const projects = [
  {
    name: "CS351 Coursework",
    url:  "https://github.com/kowandaa-collab/11402_CS351",
    desc: "Data Structures & Algorithms coursework — implementations, exercises, and problem sets from CS351.",
    type: "Coursework",
    year: "2024",
    techs: ["C++"],
    banner: "linear-gradient(135deg, #6070ff 0%, #a78bfa 100%)",
    icon: SVG.code,
  },
  {
    name: "CS351 Project 0",
    url:  "https://github.com/kowandaa-collab/11402_CS351_Project0",
    desc: "Foundational data structures implementation — first major project for CS351.",
    type: "Project",
    year: "2024",
    techs: ["C++"],
    banner: "linear-gradient(135deg, #3b82f6 0%, #6070ff 100%)",
    icon: SVG.tree,
  },
  {
    name: "CSV Mini Database",
    url:  "https://github.com/kowandaa-collab/11402_CS351_ProjectB",
    desc: "A CSV-based mini database and query engine built from scratch with custom indexing and querying.",
    type: "Project",
    year: "2024",
    techs: ["C++"],
    banner: "linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)",
    icon: SVG.db,
  },
  {
    name: "Image Deblurring",
    url:  "https://github.com/kowandaa-collab/image-deblurring",
    desc: "Image deblurring pipeline using Python and image processing techniques to restore clarity from blurred inputs.",
    type: "Project",
    year: "2024",
    techs: ["Python"],
    banner: "linear-gradient(135deg, #059669 0%, #0891b2 100%)",
    icon: SVG.img,
  },
];

const skillGroups = [
  { label: "Languages",  skills: ["C++", "Python", "JavaScript", "HTML5", "CSS3", "SQL"] },
  { label: "Concepts",   skills: ["Data Structures", "Algorithms", "Image Processing"] },
  { label: "Tools",      skills: ["Git", "GitHub Pages", "Visual Studio Code", "Jira"] },
];

/* ── Render project cards ── */
const container = document.getElementById("projects-container");

projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "project fade-in";
  card.dataset.delay = String((i % 2) + 1);
  card.dataset.techs = p.techs.join(",");
  card.innerHTML = `
    <div class="project-banner" style="background:${p.banner};">
      <div class="banner-dots"></div>
      <div class="banner-icon-wrap">${p.icon}</div>
      <div class="banner-bottom">
        <span class="banner-index">0${i + 1}</span>
        <span class="banner-tag">${p.techs[0]}</span>
      </div>
    </div>
    <div class="project-body">
      <div class="project-meta">
        <span class="project-type-badge">${p.type}</span>
        <span class="project-year">${p.year}</span>
      </div>
      <h3 class="project-title">${p.name}</h3>
      <p class="project-description">${p.desc}</p>
      <div class="project-footer">
        <ul class="project-languages">
          ${p.techs.map(t => `<li class="language">${t}</li>`).join("")}
        </ul>
        <button class="project-cta">
          See Project
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
  `;
  card.querySelector(".project-cta").addEventListener("click", () => openPopup(p));
  container.appendChild(card);
});

/* ── Tech filter ── */
const filterBar = document.getElementById("filter-bar");
if (filterBar) {
  const allTechs = [...new Set(projects.flatMap(p => p.techs))];
  ["All", ...allTechs].forEach(label => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (label === "All" ? " active" : "");
    btn.textContent = label;
    btn.dataset.filter = label;
    btn.addEventListener("click", () => {
      filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      document.querySelectorAll(".project").forEach(card => {
        const match = f === "All" || (card.dataset.techs || "").split(",").includes(f);
        card.style.display = match ? "" : "none";
      });
    });
    filterBar.appendChild(btn);
  });
}

/* ── Popup ── */
const popupOverlay = document.getElementById("popup-overlay");
const popupBg      = document.getElementById("popup-bg");
const popupName    = document.getElementById("popup-name");
const popupMeta    = document.getElementById("popup-meta-row");
const popupDesc    = document.getElementById("popup-description");
const popupLangs   = document.getElementById("popup-langs");
const popupLink    = document.getElementById("popup-source-link");

function openPopup(p) {
  popupName.textContent = p.name;
  popupMeta.innerHTML = `<span>${p.type}</span><span>${p.year}</span>`;
  popupDesc.textContent = p.desc;
  popupLangs.innerHTML = p.techs.map(t => `<li class="language">${t}</li>`).join("");
  popupLink.href = p.url;
  popupOverlay.classList.add("active");
  popupBg.classList.add("active");
  document.body.classList.add("nav-open");
}

function closePopup() {
  popupOverlay.classList.remove("active");
  popupBg.classList.remove("active");
  document.body.classList.remove("nav-open");
}

document.querySelector(".close-btn").addEventListener("click", closePopup);
popupBg.addEventListener("click", closePopup);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopup(); });

/* ── Skills accordion ── */
const skillsList = document.getElementById("skills-list");

skillGroups.forEach((group, i) => {
  const item = document.createElement("li");
  item.className = "skill-item" + (i === 0 ? " open" : "");
  item.innerHTML = `
    <div class="skill-header">
      ${group.label}
      <span class="skill-chevron">&#8964;</span>
    </div>
    <div class="skill-body">
      ${group.skills.map(s => `<span class="skill-pill">${s}</span>`).join("")}
    </div>
  `;
  item.querySelector(".skill-header").addEventListener("click", () => {
    item.classList.toggle("open");
  });
  skillsList.appendChild(item);
});

/* ── Mobile nav ── */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileNav.classList.toggle("active");
  document.body.classList.toggle("nav-open");
});

document.querySelectorAll(".mobile-nav-link a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
    document.body.classList.remove("nav-open");
  });
});

/* ── Contact form ── */
const form       = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const emailErr   = document.getElementById("email-error-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = emailInput.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    emailInput.classList.add("invalid");
    emailErr.textContent = "Please enter a valid email address.";
    showToast("Please enter a valid email.", "error");
    return;
  }
  emailInput.classList.remove("invalid");
  emailErr.textContent = "";
  showToast("Opening your email client...", "success");
  const name = encodeURIComponent(document.getElementById("name").value);
  const msg  = encodeURIComponent(document.getElementById("message").value);
  setTimeout(() => {
    window.location.href = `mailto:kowandaa@gmail.com?subject=Portfolio Contact&body=Name: ${name}%0AEmail: ${encodeURIComponent(val)}%0A%0A${msg}`;
  }, 400);
});

emailInput.addEventListener("input", () => {
  emailInput.classList.remove("invalid");
  emailErr.textContent = "";
});

/* ── Scroll-in animations ── */
const fadeIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      fadeIO.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".fade-in").forEach(el => fadeIO.observe(el));

/* ── Active nav on scroll ── */
const navLinks = document.querySelectorAll(".nav-link a");
const sections = ["about-myself", "works", "form-section"].map(id => document.getElementById(id));

const navIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));
      const active = document.querySelector(`.nav-link a[href="#${e.target.id}"]`);
      if (active) active.classList.add("active");
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(s => { if (s) navIO.observe(s); });

/* ── Footer year ── */
const yearEl = document.getElementById("footer-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Typewriter ── */
const phrases = [
  "Glad to see you!",
  "I build algorithms.",
  "I write clean code.",
  "I love data structures.",
  "I craft web interfaces.",
];
let phraseIdx = 0, charIdx = 0, isDeleting = false;
const tw = document.querySelector(".typewriter");
if (tw) {
  (function twTick() {
    const phrase = phrases[phraseIdx];
    tw.textContent = isDeleting ? phrase.slice(0, --charIdx) : phrase.slice(0, ++charIdx);
    let delay = isDeleting ? 45 : 85;
    if (!isDeleting && charIdx === phrase.length)      { delay = 2200; isDeleting = true; }
    else if (isDeleting && charIdx === 0)              { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 350; }
    setTimeout(twTick, delay);
  })();
}

/* ── Scroll progress bar ── */
const progressBar = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
  if (!progressBar) return;
  const scrollTop = document.documentElement.scrollTop;
  const docH      = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = (docH > 0 ? (scrollTop / docH) * 100 : 0) + "%";
}, { passive: true });

/* ── Back to top ── */
const backTop = document.getElementById("back-top");
if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });
  backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ── Header scroll shadow ── */
const headerEl = document.querySelector("header");
window.addEventListener("scroll", () => {
  headerEl.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

/* ── Counter animation for deco stats ── */
function animateCount(el, target, duration) {
  const start = performance.now();
  (function step(ts) {
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.round(p * target);
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
const decoCard = document.querySelector(".deco-card");
if (decoCard) {
  const statEls  = Array.from(decoCard.querySelectorAll(".stat-num"));
  const targets  = statEls.map(el => parseInt(el.textContent, 10));
  statEls.forEach(el => (el.textContent = "0"));
  const counterIO = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      statEls.forEach((el, i) => animateCount(el, targets[i], 1200));
      counterIO.disconnect();
    }
  }, { threshold: 0.6 });
  counterIO.observe(decoCard);
}

/* ── Toast ── */
function showToast(msg, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const icon = type === "success" ? "✓" : "!";
  const t = document.createElement("div");
  t.className = `toast toast--${type}`;
  t.innerHTML = `<span class="toast-icon">${icon}</span>${msg}`;
  container.appendChild(t);
  requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add("visible")));
  setTimeout(() => {
    t.classList.remove("visible");
    t.addEventListener("transitionend", () => t.remove(), { once: true });
  }, 3500);
}

/* ── Dark mode toggle ── */
document.querySelectorAll(".theme-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
});

/* ── Stats bar counter ── */
const statsBar = document.getElementById("stats-bar");
const sbarNums = statsBar ? Array.from(statsBar.querySelectorAll(".sbar-num[data-count]")) : [];
if (sbarNums.length) {
  sbarNums.forEach(el => { el.textContent = "0" + (el.dataset.suffix || ""); });
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      sbarNums.forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const start  = performance.now();
        (function step(ts) {
          const p = Math.min((ts - start) / 1400, 1);
          el.textContent = Math.round(p * target) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }
  }, { threshold: 0.5 }).observe(statsBar);
}

/* ── 3D card tilt ── */
const heroDeco   = document.querySelector(".hero-deco");
const decoCardEl = document.querySelector(".deco-card");
if (heroDeco && decoCardEl) {
  heroDeco.addEventListener("mousemove", (e) => {
    const r = heroDeco.getBoundingClientRect();
    const x = (e.clientX - r.left)  / r.width  - 0.5;
    const y = (e.clientY - r.top)   / r.height - 0.5;
    decoCardEl.style.transform = `translate(-50%,-50%) rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.05)`;
  });
  heroDeco.addEventListener("mouseleave", () => {
    decoCardEl.style.transform = "translate(-50%,-50%)";
  });
}

/* ── Cursor glow ── */
const root = document.documentElement;
window.addEventListener("mousemove", (e) => {
  root.style.setProperty("--cx", e.clientX + "px");
  root.style.setProperty("--cy", e.clientY + "px");
}, { passive: true });

/* ── Konami code easter egg ── */
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIdx = 0;
document.addEventListener('keydown', (e) => {
  konamiIdx = e.key === KONAMI[konamiIdx] ? konamiIdx + 1 : (e.key === KONAMI[0] ? 1 : 0);
  if (konamiIdx === KONAMI.length) {
    konamiIdx = 0;
    triggerKonami();
  }
});

function triggerKonami() {
  showToast('🎮 Cheat code activated! You found the easter egg!', 'success');
  const colors = ['#6070ff','#a78bfa','#38bdf8','#22c55e','#f59e0b','#ec4899','#f97316'];
  for (let i = 0; i < 70; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    const size = 6 + Math.random() * 8;
    el.style.cssText = [
      `left:${(Math.random() * 100).toFixed(1)}vw`,
      `background:${colors[i % colors.length]}`,
      `width:${size.toFixed(1)}px`,
      `height:${size.toFixed(1)}px`,
      `border-radius:${Math.random() > 0.4 ? '50%' : '3px'}`,
      `--dur:${(1.4 + Math.random() * 1.2).toFixed(2)}s`,
      `--delay:${(Math.random() * 0.7).toFixed(2)}s`,
      `--tx:${((Math.random() - 0.5) * 220).toFixed(0)}px`,
      `--rot:${(Math.random() > 0.5 ? 1 : -1) * (200 + Math.random() * 400).toFixed(0)}deg`,
    ].join(';');
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }
}
