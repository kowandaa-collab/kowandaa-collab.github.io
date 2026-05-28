const projects = [
  {
    name: "11402_CS351",
    url:  "https://github.com/kowandaa-collab/11402_CS351",
    desc: "CS351 coursework — Data Structures & Algorithms",
    lang: null,
  },
  {
    name: "11402_CS351_Project0",
    url:  "https://github.com/kowandaa-collab/11402_CS351_Project0",
    desc: "CS351 Project 0",
    lang: "C++",
  },
  {
    name: "11402_CS351_ProjectB",
    url:  "https://github.com/kowandaa-collab/11402_CS351_ProjectB",
    desc: "CSV Mini Database & Query Engine",
    lang: null,
  },
  {
    name: "image-deblurring",
    url:  "https://github.com/kowandaa-collab/image-deblurring",
    desc: "Image deblurring pipeline using Python",
    lang: "Python",
  },
];

const skillGroups = [
  {
    label: "Languages",
    skills: ["C++", "Python", "JavaScript", "HTML5", "CSS3", "SQL"],
  },
  {
    label: "Concepts",
    skills: ["Data Structures", "Algorithms", "Image Processing"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub Pages"],
  },
];

/* ── Render projects ── */
const grid = document.getElementById("projects-container");
projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.style.transitionDelay = `${i * 80}ms`;
  card.innerHTML = `
    <div class="project-card-header">
      <svg class="project-folder" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      <a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>
    </div>
    <p>${p.desc}</p>
    ${p.lang ? `<span class="project-lang"><span class="lang-dot"></span>${p.lang}</span>` : ""}
  `;
  grid.appendChild(card);
});

/* ── Render skills by group ── */
const sc = document.getElementById("skills-container");
skillGroups.forEach(group => {
  const groupEl = document.createElement("div");
  groupEl.className = "skill-group";
  const label = document.createElement("p");
  label.className = "skill-group-label";
  label.textContent = group.label;
  const list = document.createElement("div");
  list.className = "skills-list";
  group.skills.forEach(s => {
    const pill = document.createElement("span");
    pill.className = "skill-pill";
    pill.textContent = s;
    list.appendChild(pill);
  });
  groupEl.appendChild(label);
  groupEl.appendChild(list);
  sc.appendChild(groupEl);
});

/* ── Intersection observer (scroll-in animations) ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });

document.querySelectorAll(".fade-section").forEach(el => io.observe(el));
document.querySelectorAll(".project-card").forEach(el => io.observe(el));

/* ── Typed text in hero ── */
const phrases = [" 👋", " — a builder.", " — a CS student.", " — a problem solver."];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const current = phrases[pi];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 90);
}
setTimeout(type, 1200);

/* ── Theme toggle ── */
const html = document.documentElement;
const tBtn = document.getElementById("themeToggle");
applyTheme(localStorage.getItem("theme") || "dark");

tBtn.addEventListener("click", () => {
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

function applyTheme(t) {
  html.dataset.theme = t;
  tBtn.textContent = t === "dark" ? "☀ Light" : "☾ Dark";
}

/* ── Active nav link on scroll ── */
const navLinks = document.querySelectorAll(".nav-links a");
const navIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = "");
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = "var(--text)";
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

document.querySelectorAll("section[id]").forEach(s => navIO.observe(s));
