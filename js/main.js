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
            <li><a href="https://maliang26.github.io/apec/" rel="noopener" target="_blank">Official APEC Lab</a></li>
            <li><a href="${root}pages/correspondence.html">Correspondence</a></li>
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
              <p>Teachers' Day microsite by APEC Lab (Animal Physiological Ecology and Conservation), School of Ecology, Sun Yat-sen University. Official lab site: <a href="https://maliang26.github.io/apec/" rel="noopener" target="_blank">maliang26.github.io/apec</a>. Visual language inspired by <em>Nature</em>; linked articles remain © their publishers.</p>
            </div>
            <div>
              <h3>Explore</h3>
              <ul>
                <li><a href="${root}pages/contents.html">Contents</a></li>
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

  function roleRank(role) {
    const order = { 博士后: 1, 博士生: 2, 硕士生: 3, 本科生: 4 };
    return order[role] || 9;
  }

  /** Display order: four postdocs first, then 周子涵, then everyone else by stage. */
  function letterRank(b) {
    if (b.role === "博士后") return 0;
    if (b.name === "周子涵") return 1;
    return 10 + roleRank(b.role);
  }

  function readyBlessings() {
    if (!window.APEC_BLESSINGS) return [];
    return window.APEC_BLESSINGS
      .filter((b) => b.status === "ready" && b.message && b.name)
      .slice()
      .sort((a, b) => letterRank(a) - letterRank(b) || (a.id || 0) - (b.id || 0));
  }

  function pendingCount() {
    if (!window.APEC_BLESSINGS) return 0;
    return window.APEC_BLESSINGS.filter((b) => b.status !== "ready" || !b.message).length;
  }

  function renderColophon(ready, open) {
    const el = document.querySelector("[data-colophon]");
    if (!el) return;
    const late =
      open > 0
        ? ` ${open} open slot${open === 1 ? "" : "s"} remain for late arrivals.`
        : " The correspondence section is now closed for new letters.";
    el.textContent = `${ready.length} signed letters from the APEC Lab.${late} Science stays unfinished; gratitude need not.`;
  }

  function renderBlessings() {
    const mount = document.querySelector("[data-blessings]");
    if (!mount || !window.APEC_BLESSINGS) return;

    const ready = readyBlessings();
    const open = pendingCount();

    const summary = document.querySelector("[data-blessings-summary]");
    if (summary) {
      summary.textContent =
        open > 0
          ? `${ready.length} letters published · ${open} slots still open`
          : `${ready.length} letters published`;
    }

    renderColophon(ready, open);

    const readyHtml = ready
      .map((b, i) => {
        return `
          <article class="c-correspondence reveal" style="transition-delay:${Math.min(i * 0.04, 0.4)}s">
            <div class="c-correspondence__label">Letter ${String(i + 1).padStart(2, "0")}</div>
            <p class="c-correspondence__quote">${escapeHtml(b.message)}</p>
            <div class="c-correspondence__by">— ${escapeHtml(b.name)}</div>
          </article>
        `;
      })
      .join("");

    const openHtml =
      open > 0
        ? `<p class="c-letters-open meta">Further correspondence welcome — ${open} open slot${open === 1 ? "" : "s"} remain for late letters.</p>`
        : "";

    mount.innerHTML = readyHtml + openHtml;
  }

  function renderHomeLetters() {
    const mount = document.querySelector("[data-home-letters]");
    const ready = readyBlessings();
    const open = pendingCount();

    document.querySelectorAll("[data-letters-count]").forEach((el) => {
      el.textContent =
        open > 0
          ? `${ready.length} published · more open`
          : `${ready.length} published`;
    });
    document.querySelectorAll("[data-letters-count-label]").forEach((el) => {
      el.textContent =
        open > 0
          ? `Correspondence · ${ready.length} published, more open`
          : `Correspondence · ${ready.length} published`;
    });

    const pull = ready.find((b) => b.name === "蒲真") || ready.find((b) => b.message.length < 80) || ready[0];
    const qEl = document.querySelector("[data-pull-quote]");
    const bEl = document.querySelector("[data-pull-by]");
    if (pull && qEl && bEl) {
      let quote = pull.message;
      if (pull.name === "蒲真") {
        quote = "谢谢您在用心做一个好老师，让我相信“完美”导师可以存在且应该存在。";
      }
      qEl.textContent = quote;
      bEl.textContent = `— ${pull.name}`;
    }

    if (!mount) return;

    const preferred = ["姜中文", "蒲真", "王可欣"];
    const featured = [];
    preferred.forEach((name) => {
      const hit = ready.find((b) => b.name === name);
      if (hit && featured.length < 3) featured.push(hit);
    });
    ready.forEach((b) => {
      if (featured.length < 3 && !featured.includes(b)) featured.push(b);
    });

    mount.innerHTML = featured
      .map(
        (b, i) => `
          <article class="c-letter-card reveal">
            <p class="c-letter-card__mark">Letter ${String(i + 1).padStart(2, "0")}</p>
            <p class="c-letter-card__quote">${escapeHtml(b.message)}</p>
            <p class="c-letter-card__by">— ${escapeHtml(b.name)}</p>
          </article>
        `
      )
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

  function observeHeaderScroll() {
    const header = document.querySelector(".c-header");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHeader();
    buildFooter();
    renderBlessings();
    renderHomeLetters();
    observeReveal();
    observeHeaderScroll();
  });
})();
