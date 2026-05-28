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
  { label: "Tools",      skills: ["Git", "GitHub Pages"] },
];

/* ── Render project cards ── */
const container = document.getElementById("projects-container");

projects.forEach((p, i) => {
  const card = document.createElement("div");
  card.className = "project fade-in";
  card.dataset.delay = String((i % 2) + 1);
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
    return;
  }
  emailInput.classList.remove("invalid");
  emailErr.textContent = "";
  const name = encodeURIComponent(document.getElementById("name").value);
  const msg  = encodeURIComponent(document.getElementById("message").value);
  window.location.href = `mailto:kowandaa@gmail.com?subject=Portfolio Contact&body=Name: ${name}%0AEmail: ${encodeURIComponent(val)}%0A%0A${msg}`;
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
      navLinks.forEach(a => a.style.color = "");
      const active = document.querySelector(`.nav-link a[href="#${e.target.id}"]`);
      if (active) active.style.color = "var(--primary)";
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(s => { if (s) navIO.observe(s); });
