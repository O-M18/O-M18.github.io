// ===== PORTFOLIO CONFIG (edit these to update stats) =====
const PORTFOLIO_STATS = {
  projects: 15, // total number of projects
  certifications: 6,
};
// ==========================================================

const roles = [" Analyst ", " Scientist "];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 100;
const erasingSpeed = 65;
const delayBetweenRoles = 1500;
const typingText = document.getElementById("typing-text");

function type() {
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

document.addEventListener("DOMContentLoaded", () => {
  if (typingText) type();

  // Scroll-reveal for cards across sections
  const revealTargets = document.querySelectorAll(
    ".about-card, .tools-card, .certs-card"
  );
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
      { threshold: 0.18 }
    );
    revealTargets.forEach((card) => io.observe(card));
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
  navToggle.addEventListener("click", () => navbar.classList.toggle("open"));

  // Close mobile nav on link click
  navbar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navbar.classList.remove("open"));
  });

  // Active nav link highlighting
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = navbar.querySelectorAll("a");
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
    themeIcon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
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

  // Animate stats counters from PORTFOLIO_STATS config
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

  // Projects horizontal stack-carousel
  const track = document.getElementById("projectsTrack");
  if (track) {
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

    prevBtn.addEventListener("click", () =>
      track.scrollBy({ left: -330, behavior: "smooth" })
    );
    nextBtn.addEventListener("click", () =>
      track.scrollBy({ left: 330, behavior: "smooth" })
    );

    track.addEventListener("scroll", updateDots, { passive: true });
    window.addEventListener("resize", updateDots);
    updateDots();

    // Drag-to-scroll for modern UX (guards against accidental link clicks)
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
