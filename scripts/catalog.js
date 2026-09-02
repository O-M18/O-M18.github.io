// ===== CATALOG FILTERING =====
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".catalog-card");
  const countEl = document.getElementById("projectCount");
  const emptyEl = document.getElementById("catalogEmpty");

  const applyFilter = (filter) => {
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
