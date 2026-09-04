// ===== PORTFOLIO CONFIG =====
const PORTFOLIO_STATS = {
  projects: 15,
  certifications: 6,
  hours: 500,
  clients: 10,
};
const HOME_PROJECT_LIMIT = 4;

// ===== LOADING SCREEN =====
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => loader.classList.add("hidden"), 2000);
  }
});

// ===== TYPING EFFECT =====
const roles = [" Analyst ", " Scientist "];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;
const erasingSpeed = 65;
const delayBetweenRoles = 1500;
const typingText = document.getElementById("typing-text");

function type() {
  if (!typingText) return;
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex--);
  } else {
    typingText.textContent = currentRole.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(type, delayBetweenRoles);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? erasingSpeed : typingSpeed);
  }
}

// ===== SCROLL PROGRESS BAR =====
function updateScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  bar.style.width = pct + "%";
}

// ===== BACK TO TOP WITH PROGRESS RING =====
function updateBackToTop() {
  const btn = document.getElementById("backToTop");
  const ring = document.getElementById("progressRing");
  if (!btn) return;

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? scrollTop / docHeight : 0;

  if (scrollTop > 400) {
    btn.classList.add("visible");
  } else {
    btn.classList.remove("visible");
  }

  if (ring) {
    const circumference = 2 * Math.PI * 20;
    ring.style.strokeDashoffset = circumference * (1 - pct);
  }
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");
  if (!dot || !ring) return;
  if (window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const hoverTargets = "a, button, .project-card, .about-card, .service-card, .proof-card, .filter-btn";
  document.querySelectorAll(hoverTargets).forEach((el) => {
    el.addEventListener("mouseenter", () => {
      dot.classList.add("hover");
      ring.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      dot.classList.remove("hover");
      ring.classList.remove("hover");
    });
  });
}

// ===== FLOATING HIRE ME VISIBILITY =====
function updateFloatingHire() {
  const el = document.getElementById("floatingHire");
  if (!el) return;
  if (window.scrollY > 600) {
    el.style.opacity = "1";
    el.style.visibility = "visible";
    el.style.pointerEvents = "auto";
  } else {
    el.style.opacity = "0";
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";
  }
}

// ===== MAIN INIT =====
document.addEventListener("DOMContentLoaded", () => {
  if (typingText) type();

  // Scroll progress & back-to-top
  window.addEventListener("scroll", () => {
    updateScrollProgress();
    updateBackToTop();
    updateFloatingHire();
  });
  updateScrollProgress();
  updateBackToTop();
  updateFloatingHire();

  // Custom cursor
  initCustomCursor();

  // ===== SCROLL REVEAL (data-reveal) =====
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if (revealTargets.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((card, i) => {
      card.style.transitionDelay = (i % 4) * 0.1 + "s";
      io.observe(card);
    });
  }

  // Header shadow on scroll
  const header = document.querySelector(".header");
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navbar = document.getElementById("navbar");
  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => navbar.classList.toggle("open"));
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navbar.classList.remove("open"));
    });
  }

  // Active nav link highlighting
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = navbar ? navbar.querySelectorAll("a") : [];
  const onSectionVisible = () => {
    let currentId = "home";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 120) {
        currentId = sec.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  };
  window.addEventListener("scroll", onSectionVisible);

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const storageGet = (key) => {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  };
  const storageSet = (key, val) => {
    try { localStorage.setItem(key, val); } catch (e) { /* ignore */ }
  };
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (themeIcon) themeIcon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
  };
  if (themeToggle) {
    const saved = storageGet("theme");
    let prefersDark = false;
    if (window.matchMedia) {
      prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    applyTheme(saved || (prefersDark ? "dark" : "light"));
    themeToggle.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
      storageSet("theme", next);
    });
  } else {
    applyTheme("light");
  }

  // Skill tabs
  const tabBtns = document.querySelectorAll(".skill-tab-btn");
  const skillPanels = document.querySelectorAll(".skill-cat");
  if (tabBtns.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.getAttribute("data-tab");
        skillPanels.forEach((panel) => {
          panel.classList.toggle(
            "active",
            panel.getAttribute("data-panel") === target
          );
        });
      });
    });
  }

  // Footer terminal code-typing effect
  const typeCodeEl = document.getElementById("type-code");
  if (typeCodeEl) {
    const codeLines = [
      "om.build_portfolio()",
      "print('Data ➜ Insights')",
      "export DASHBOARD --deploy",
      "git push origin main",
      "return 'done 🚀'",
    ];
    let lineIdx = 0;
    let chIdx = 0;
    let deleting = false;
    const typeCode = () => {
      const line = codeLines[lineIdx];
      if (deleting) {
        typeCodeEl.textContent = line.substring(0, chIdx--);
        if (chIdx === 0) {
          deleting = false;
          lineIdx = (lineIdx + 1) % codeLines.length;
          setTimeout(typeCode, 400);
        } else {
          setTimeout(typeCode, 30);
        }
      } else {
        typeCodeEl.textContent = line.substring(0, chIdx++);
        if (chIdx === line.length + 1) {
          deleting = true;
          setTimeout(typeCode, 1600);
        } else {
          setTimeout(typeCode, 70);
        }
      }
    };
    setTimeout(typeCode, 800);
  }

  // Animate stats counters
  const animateCount = (el, target, suffix = "") => {
    if (!el) return;
    const dur = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const statsConfig = [
    ["statProjects", PORTFOLIO_STATS.projects, "+"],
    ["statCerts", PORTFOLIO_STATS.certifications, ""],
    ["statHours", PORTFOLIO_STATS.hours, "+"],
    ["statClients", PORTFOLIO_STATS.clients, "+"],
  ];
  const statsTriggered = () => {
    const stats = document.querySelector(".stats-panel");
    if (!stats) return false;
    return stats.getBoundingClientRect().top < window.innerHeight - 40;
  };
  let statsAnimated = false;
  const maybeAnimStats = () => {
    if (!statsAnimated && statsTriggered()) {
      statsAnimated = true;
      statsConfig.forEach(([id, val, suffix]) =>
        animateCount(document.getElementById(id), val, suffix)
      );
    }
  };
  window.addEventListener("scroll", maybeAnimStats);
  maybeAnimStats();

  // Animate social proof counters
  const proofNums = document.querySelectorAll(".proof-number");
  if (proofNums.length) {
    const animProof = (el) => {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      const dur = 1200;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const proofIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animProof(entry.target);
            proofIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    proofNums.forEach((n) => proofIo.observe(n));
  }

  // Projects horizontal stack-carousel
  const track = document.getElementById("projectsTrack");
  if (track) {
    const renderHomeCards = () => {
      if (typeof ALL_PROJECTS === "undefined") return;
      const projects = ALL_PROJECTS.slice(0, HOME_PROJECT_LIMIT);
      track.innerHTML = projects
        .map((p) => {
          const badge = (p.tags[0] || "").toUpperCase();
          const stack = (p.chips || []).slice(0, 2).join(" · ");
          return `
            <article class="project-card">
              <div class="project-thumb" style="--thumb: ${p.thumb};">
                <span class="thumb-glyph"><i class='${p.glyph}'></i></span>
                <span class="badge-tag">${badge}</span>
              </div>
              <div class="card-info">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="card-foot">
                  <span class="stack">${stack}</span>
                  <a href="${p.repoUrl}" class="view-link" target="_blank" rel="noopener">View <i class='bx bx-right-arrow-alt'></i></a>
                </div>
              </div>
            </article>`;
        })
        .join("");
    };

    renderHomeCards();

    const prevBtn = document.getElementById("projectsPrev");
    const nextBtn = document.getElementById("projectsNext");
    const dotsWrap = document.getElementById("projectsDots");

    const updateDots = () => {
      if (!dotsWrap) return;
      const cards = track.querySelectorAll(".project-card");
      const visible = Math.max(1, Math.round(track.clientWidth / 340));
      const pageCount = Math.max(1, cards.length - visible + 1);
      const current = Math.round(track.scrollLeft / 330);
      const active = Math.min(Math.floor(current / 1), pageCount - 1);

      dotsWrap.innerHTML = "";
      for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement("button");
        dot.className = "dot" + (i === active ? " active" : "");
        dot.setAttribute("aria-label", "Go to project group " + (i + 1));
        dot.addEventListener("click", () => {
          track.scrollTo({ left: i * 330, behavior: "smooth" });
        });
        dotsWrap.appendChild(dot);
      }
    };

    if (prevBtn) prevBtn.addEventListener("click", () =>
      track.scrollBy({ left: -330, behavior: "smooth" })
    );
    if (nextBtn) nextBtn.addEventListener("click", () =>
      track.scrollBy({ left: 330, behavior: "smooth" })
    );

    track.addEventListener("scroll", updateDots, { passive: true });
    window.addEventListener("resize", updateDots);
    updateDots();

    // Drag-to-scroll
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let dragged = false;
    track.addEventListener("mousedown", (e) => {
      if (e.target.closest("a")) return;
      isDown = true;
      dragged = false;
      startX = e.pageX - track.offsetLeft;
      startScroll = track.scrollLeft;
      track.classList.add("dragging");
    });
    track.addEventListener("mouseleave", () => {
      isDown = false;
      track.classList.remove("dragging");
    });
    track.addEventListener("mouseup", () => {
      isDown = false;
      track.classList.remove("dragging");
    });
    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const delta = x - startX;
      if (Math.abs(delta) > 6) dragged = true;
      track.scrollLeft = startScroll - delta;
    });
    const allowCardClicks = (e) => {
      if (dragged) e.stopImmediatePropagation();
    };
    track.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", allowCardClicks)
    );
  }
});
