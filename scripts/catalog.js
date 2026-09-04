// ===== CATALOG FILTERING =====
document.addEventListener("DOMContentLoaded", () => {
  // Loading screen
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) setTimeout(() => loader.classList.add("hidden"), 1500);
  });

  // Scroll progress
  const scrollBar = document.getElementById("scrollProgress");
  function updateProgress() {
    if (!scrollBar) return;
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress);
  updateProgress();

  // Back to top
  const backBtn = document.getElementById("backToTop");
  const ring = document.getElementById("progressRing");
  function updateBack() {
    if (!backBtn) return;
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    backBtn.classList.toggle("visible", window.scrollY > 400);
    if (ring) ring.style.strokeDashoffset = 2 * Math.PI * 20 * (1 - pct);
  }
  window.addEventListener("scroll", updateBack);
  updateBack();

  // Custom cursor
  const dot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");
  if (dot && cursorRing && window.innerWidth >= 768) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });
    (function anim() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      cursorRing.style.left = rx + "px"; cursorRing.style.top = ry + "px";
      requestAnimationFrame(anim);
    })();
    const hoverSel = "a, button, .catalog-card, .filter-btn";
    document.querySelectorAll(hoverSel).forEach((el) => {
      el.addEventListener("mouseenter", () => { dot.classList.add("hover"); cursorRing.classList.add("hover"); });
      el.addEventListener("mouseleave", () => { dot.classList.remove("hover"); cursorRing.classList.remove("hover"); });
    });
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  const grid = document.getElementById("catalogGrid");
  const countEl = document.getElementById("projectCount");
  const emptyEl = document.getElementById("catalogEmpty");
  let cards = [];

  const renderCards = () => {
    if (typeof ALL_PROJECTS === "undefined" || !grid) return;
    grid.innerHTML = ALL_PROJECTS.map((p, i) => {
      const badge = (p.tags[0] || "").toUpperCase();
      const chips = (p.chips || [])
        .map((c) => `<span class="tag">${c}</span>`)
        .join("");
      return `
        <article class="catalog-card" data-tags="${p.tags.join(" ")}" data-reveal style="transition-delay: ${(i % 4) * 0.08}s">
          <div class="catalog-thumb" style="--thumb: ${p.thumb};">
            <span class="thumb-glyph"><i class='${p.glyph}'></i></span>
            <span class="badge-tag">${badge}</span>
          </div>
          <div class="catalog-info">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="catalog-tags">${chips}</div>
            <div class="catalog-links">
              <a href="${p.repoUrl}" class="btn btn-outline btn-sm" target="_blank" rel="noopener"><i class='bx bx-git-repo'></i> Repository</a>
            </div>
          </div>
        </article>`;
    }).join("");
    cards = Array.from(grid.querySelectorAll(".catalog-card"));
    if (countEl) countEl.textContent = cards.length;

    // Observe reveal
    const reveals = grid.querySelectorAll("[data-reveal]");
    if (reveals.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("revealed"); io.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      reveals.forEach((el) => io.observe(el));
    }
  };

  const applyFilter = (filter) => {
    if (!cards.length) return;
    let visible = 0;
    cards.forEach((card) => {
      const tags = card.getAttribute("data-tags") || "";
      const show = filter === "all" || tags.split(" ").includes(filter);
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    if (countEl) countEl.textContent = visible;
    if (emptyEl) emptyEl.style.display = visible ? "none" : "block";
  };

  renderCards();

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  // Footer terminal code typing
  const typeCodeEl = document.getElementById("type-code");
  if (typeCodeEl) {
    const codeLines = [
      "browse.all_projects()",
      "filter('BI')",
      "git clone --inspire",
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

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
