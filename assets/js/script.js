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

const skills = [
  "C++", "Python", "HTML5", "CSS3", "JavaScript",
  "Data Structures", "Algorithms", "Git", "GitHub Pages",
  "Image Processing", "SQL",
];

/* ── Render projects ── */
const grid = document.getElementById("projects-container");
projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.style.transitionDelay = `${i * 80}ms`;
  card.innerHTML = `
    <a href="${p.url}" target="_blank" rel="noopener">${p.name}</a>
    <p>${p.desc}</p>
    ${p.lang ? `<span class="project-lang"><span class="lang-dot"></span>${p.lang}</span>` : ""}
  `;
  grid.appendChild(card);
});

/* ── Render skills ── */
const sc = document.getElementById("skills-container");
skills.forEach(s => {
  const pill = document.createElement("span");
  pill.className = "skill-pill";
  pill.textContent = s;
  sc.appendChild(pill);
});

/* ── Intersection observer (scroll-in animations) ── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
    }
  });
}, { threshold: 0.12 });

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
    if (ci === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 90);
}
setTimeout(type, 1200);

/* ── Theme toggle ── */
const html  = document.documentElement;
const tBtn  = document.getElementById("themeToggle");
const saved = localStorage.getItem("theme") || "dark";
applyTheme(saved);

tBtn.addEventListener("click", () => {
  const next = html.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

function applyTheme(t) {
  html.dataset.theme = t;
  tBtn.textContent = t === "dark" ? "☀ Light" : "☾ Dark";
}

/* ── Active nav link highlight on scroll ── */
const sections = document.querySelectorAll("section[id]");
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

sections.forEach(s => navIO.observe(s));
