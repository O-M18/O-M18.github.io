// ===== SHARED THEME TOGGLE & MOBILE NAV =====
document.addEventListener("DOMContentLoaded", () => {
  const storageGet = (key) => {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  };
  const storageSet = (key, val) => {
    try { localStorage.setItem(key, val); } catch (e) {}
  };
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("themeIcon");
    if (icon) icon.className = theme === "dark" ? "bx bx-sun" : "bx bx-moon";
  };

  const themeToggle = document.getElementById("themeToggle");
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
  }

  const navToggle = document.getElementById("navToggle");
  const navbar = document.getElementById("navbar");
  if (navToggle && navbar) {
    navToggle.addEventListener("click", () => navbar.classList.toggle("open"));
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navbar.classList.remove("open"));
    });
  }
});
