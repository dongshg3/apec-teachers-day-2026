(function () {
  const path = window.location.pathname.replace(/\\/g, "/");
  const inPages = /\/pages\//.test(path);
  const root = inPages ? "../" : "./";

  const NAV = [
    { href: "index.html", label: "Home", match: /(index\.html)?$/ },
    { href: "pages/contents.html", label: "Contents" },
    { href: "pages/editorial.html", label: "Editorial" },
    { href: "pages/profile.html", label: "Profile" },
    { href: "pages/research.html", label: "Research" },
    { href: "pages/news.html", label: "News & Comment" },
    { href: "pages/lab.html", label: "APEC Lab" },
    { href: "pages/correspondence.html", label: "Correspondence" },
    { href: "pages/reading.html", label: "Reading list" }
  ];

  function resolve(href) {
    if (href === "index.html") return root + "index.html";
    if (inPages) return href.replace(/^pages\//, "");
    return href;
  }

  function isCurrent(item) {
    const file = path.split("/").pop() || "index.html";
    if (item.href === "index.html") {
      return file === "" || file === "index.html";
    }
    return file === item.href.replace(/^pages\//, "");
  }

  function buildHeader() {
    const el = document.querySelector("[data-site-header]");
    if (!el) return;

    const navItems = NAV.map((item) => {
      const href = resolve(item.href);
      const current = isCurrent(item) ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${current}>${item.label}</a></li>`;
    }).join("");

    el.innerHTML = `
      <div class="c-publisher">
        <div class="u-container c-publisher__inner">
          <div><span class="c-publisher__mark">nature</span>-inspired special · not an official Springer Nature site</div>
          <div>School of Ecology · Sun Yat-sen University</div>
        </div>
      </div>
      <div class="c-topbar">
        <div class="u-container c-topbar__inner">
          <ul class="c-topbar__links">
            <li><a href="${root}pages/contents.html">View all sections</a></li>
            <li><a href="${root}pages/research.html">Saved research</a></li>
            <li><a href="${root}pages/lab.html">About APEC</a></li>
          </ul>
          <div class="c-topbar__tools">
            <span class="c-search-faux" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              Search this issue
            </span>
            <div class="meta">10 September 2026</div>
          </div>
        </div>
      </div>
      <header class="c-header">
        <div class="u-container">
          <div class="c-header__brand-row">
            <a class="c-logo" href="${root}index.html">
              <span>
                <span class="c-logo__nature">nature</span><span class="c-logo__sep">/</span><span class="c-logo__apec">apec</span>
                <span class="c-logo__tag">Teachers' Day Special</span>
              </span>
            </a>
            <button class="c-nav-toggle" type="button" aria-expanded="false" data-nav-toggle>Menu</button>
            <div class="c-issue-badge">
              <strong>Volume 1 | Teachers' Day 2026</strong>
              Tribute to Liang Ma · 马亮
            </div>
          </div>
          <nav aria-label="Primary">
            <ul class="c-nav" data-nav>${navItems}</ul>
          </nav>
        </div>
      </header>
    `;

    const toggle = el.querySelector("[data-nav-toggle]");
    const nav = el.querySelector("[data-nav]");
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
  }

  function buildFooter() {
    const el = document.querySelector("[data-site-footer]");
    if (!el) return;
    el.innerHTML = `
      <footer class="c-footer">
        <div class="u-container">
          <div class="c-footer__grid">
            <div>
              <div class="c-footer__nature">nature/apec</div>
              <p>Teachers' Day microsite by APEC Lab (Animal Physiological Ecology and Conservation), School of Ecology, Sun Yat-sen University. Visual language inspired by <em>Nature</em>; linked articles remain © their publishers.</p>
            </div>
            <div>
              <h3>Explore</h3>
              <ul>
                <li><a href="${root}pages/editorial.html">Editorial</a></li>
                <li><a href="${root}pages/profile.html">Profile: Liang Ma</a></li>
                <li><a href="${root}pages/correspondence.html">Correspondence</a></li>
              </ul>
            </div>
            <div>
              <h3>Research</h3>
              <ul>
                <li><a href="${root}pages/research.html">APEC publications</a></li>
                <li><a href="${root}pages/article-desert-birds.html">Desert birds feature</a></li>
                <li><a href="${root}pages/article-protected-areas.html">Protected areas feature</a></li>
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul>
                <li><a href="mailto:maliang26@mail.sysu.edu.cn">maliang26@mail.sysu.edu.cn</a></li>
                <li><a href="https://eco.sysu.edu.cn/teacher/MaLiang" rel="noopener" target="_blank">Faculty page</a></li>
                <li>Shenzhen Campus, SYSU</li>
              </ul>
            </div>
          </div>
          <div class="c-footer__legal">
            © 2026 APEC Lab · SYSU. Homage design only — not affiliated with Springer Nature.
          </div>
        </div>
      </footer>
    `;
  }

  function renderBlessings() {
    const mount = document.querySelector("[data-blessings]");
    if (!mount || !window.APEC_BLESSINGS) return;

    const items = window.APEC_BLESSINGS;
    const ready = items.filter((b) => b.status === "ready" && b.message).length;

    const summary = document.querySelector("[data-blessings-summary]");
    if (summary) {
      summary.textContent = `${ready} of ${items.length} correspondence pieces received · open slots remain for Teachers' Day.`;
    }

    mount.innerHTML = items
      .map((b) => {
        const pending = b.status !== "ready" || !b.message;
        const quote = pending
          ? b.note || "Blessing text forthcoming."
          : b.message;
        const by = pending
          ? `Slot ${b.id} · ${b.role || "Group member"}`
          : `${b.name}${b.role ? " · " + b.role : ""}`;
        const status = pending
          ? `<span class="c-status c-status--open">Open</span>`
          : "";
        return `
          <article class="c-correspondence ${pending ? "c-correspondence--pending" : ""} reveal">
            <div class="c-correspondence__label">Correspondence ${String(b.id).padStart(2, "0")}${status}</div>
            <p class="c-correspondence__quote">${escapeHtml(quote)}</p>
            <div class="c-correspondence__by">— ${escapeHtml(by)}</div>
          </article>
        `;
      })
      .join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function observeReveal() {
    const nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((n) => io.observe(n));
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    buildFooter();
    renderBlessings();
    observeReveal();
  });
})();
