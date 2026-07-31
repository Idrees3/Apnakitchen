import { SITE, waLink } from "./site-config.js";
import { MENU, SECTIONS, DELIVERED, REVIEWS } from "./menu-data.js";

const path = window.location.pathname.split("/").pop() || "index.html";

function money(n) {
  return `$${n}`;
}

function dishCard(item, layout = "grid") {
  const msg = `Assalamu Alaikum, I want to order ${item.name} (${item.unit}) — Apna Kitchen Frisco.`;
  const body = `
      <div class="dish-top">
        <h3>${item.name}</h3>
        <span class="dish-price">${money(item.price)}</span>
      </div>
      <div class="dish-unit">${item.unit} · 100% Halal · Frisco pickup</div>
      <p>${item.blurb}</p>
      <a class="btn btn-whatsapp btn-sm" href="${waLink(msg)}" target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
  `;
  if (layout === "list") {
    return `
    <article class="dish reveal" id="${item.id}">
      <div class="dish-media">
        <img src="${item.image}" alt="Halal ${item.name} — Apna Kitchen Frisco TX pickup" loading="lazy" width="640" height="640" />
      </div>
      <div class="dish-body">${body}</div>
    </article>`;
  }
  return `
    <article class="dish reveal" id="${item.id}">
      <div class="dish-media">
        <img src="${item.image}" alt="Halal ${item.name} — Apna Kitchen Frisco TX pickup" loading="lazy" width="640" height="480" />
      </div>
      ${body}
    </article>
  `;
}

function renderMenu(targetId, { limitPerSection = null, layout = "grid", homePreview = false } = {}) {
  const el = document.getElementById(targetId);
  if (!el) return;

  if (homePreview) {
    const featured = [
      ...MENU.mutton.slice(0, 2),
      ...MENU.chickenRice.slice(0, 2),
      ...MENU.frozen.slice(0, 2),
    ];
    el.classList.add("menu-grid");
    el.innerHTML = featured.map((item) => dishCard(item, "grid")).join("");
    return;
  }

  el.innerHTML = SECTIONS.map((section) => {
    let items = MENU[section.key] || [];
    if (limitPerSection) items = items.slice(0, limitPerSection);
    const gridClass = layout === "list" ? "dish-list" : "menu-grid";
    return `
      <div class="menu-block" id="section-${section.key}" style="margin-bottom:2.75rem">
        <div class="section-head">
          <span class="kicker">Apna Kitchen menu</span>
          <h2>${section.title}</h2>
          <p>${section.subtitle}</p>
        </div>
        <div class="${gridClass}">
          ${items.map((item) => dishCard(item, layout)).join("")}
        </div>
      </div>
    `;
  }).join("");
}

function renderGallery() {
  const el = document.getElementById("delivered-gallery");
  if (!el) return;
  el.innerHTML = DELIVERED.map(
    (item) => `
    <figure class="gallery-item reveal">
      <img src="${item.src}" alt="${item.alt}" loading="lazy" width="640" height="480" />
      <figcaption>${item.label}</figcaption>
    </figure>`
  ).join("");
}

function renderReviews() {
  const el = document.getElementById("reviews-grid");
  if (!el) return;
  el.innerHTML = REVIEWS.map(
    (r) => `
    <article class="review reveal">
      <div class="stars" aria-label="5 stars">★★★★★</div>
      <blockquote>“${r.text}”</blockquote>
      <div class="review-meta">
        <strong>${r.name}</strong>
        <span>${r.area}</span>
      </div>
    </article>`
  ).join("");
}

function injectChrome() {
  const header = document.querySelector("[data-header]");
  const footer = document.querySelector("[data-footer]");

  if (header) {
    header.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="container nav-bar">
        <a class="logo" href="/index.html" aria-label="Apna Kitchen home">
          <img class="logo-mark" src="/assets/brand/logo.png" alt="Apna Kitchen logo" width="48" height="48" />
          <span class="logo-text">
            <span class="brand-word">Apna Kitchen</span>
            <small>Halal · Frisco TX</small>
          </span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">☰</button>
        <ul class="nav-links" id="site-nav">
          <li><a href="/index.html" data-nav="index.html">Home</a></li>
          <li><a href="/menu.html" data-nav="menu.html">Menu</a></li>
          <li><a href="/order.html" data-nav="order.html">How to Order</a></li>
          <li><a href="/about.html" data-nav="about.html">About</a></li>
          <li><a href="/faq.html" data-nav="faq.html">FAQ</a></li>
          <li><a href="/contact.html" data-nav="contact.html">Contact</a></li>
          <li><a class="btn btn-whatsapp btn-sm" href="${waLink()}" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
        </ul>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <img src="/assets/brand/logo.png" alt="Apna Kitchen" width="64" height="64" style="border-radius:50%;margin-bottom:0.75rem;border:1px solid rgba(212,160,23,0.4)" />
          <h3>Apna Kitchen</h3>
          <p>Homestyle Pakistani &amp; Desi <strong>halal</strong> food for pickup in Frisco, Texas — trusted by Muslim families near Sherbrooke Drive, Plano, McKinney, Little Elm &amp; Prosper.</p>
          <p>${SITE.serviceNote}</p>
        </div>
        <div>
          <h3>Explore</h3>
          <ul>
            <li><a href="/menu.html">Full Menu &amp; Prices</a></li>
            <li><a href="/order.html">How to Order</a></li>
            <li><a href="/about.html">Our Kitchen</a></li>
            <li><a href="/faq.html">FAQ</a></li>
            <li><a href="/contact.html">Contact &amp; Pickup</a></li>
          </ul>
        </div>
        <div>
          <h3>Order</h3>
          <ul>
            <li><a href="${waLink()}" target="_blank" rel="noopener noreferrer">WhatsApp ${SITE.phoneDisplay}</a></li>
            <li><a href="${SITE.googleBusinessUrl}" id="gbp-link">Google Business Profile</a></li>
            <li>Pickup · ${SITE.addressLine}</li>
            <li>${SITE.city}, ${SITE.state} ${SITE.zip}</li>
          </ul>
        </div>
        <div>
          <h3>Legal</h3>
          <ul>
            <li><a href="/privacy.html">Privacy Policy</a></li>
            <li><a href="/terms.html">Terms of Service</a></li>
            <li><a href="/disclaimer.html">Food &amp; Allergen Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© ${new Date().getFullYear()} Apna Kitchen · Halal Pakistani food · Frisco, TX</span>
        <span>Day-ahead WhatsApp orders · Pickup only</span>
      </div>
    `;
  }

  if (!document.querySelector(".wa-float")) {
    const float = document.createElement("a");
    float.className = "wa-float";
    float.href = waLink();
    float.target = "_blank";
    float.rel = "noopener noreferrer";
    float.setAttribute("aria-label", "Order on WhatsApp");
    float.innerHTML = `<svg width="22" height="22" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.11.55 4.09 1.51 5.81L4 29l8.39-1.48A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.628 3 16.001 3zm6.64 17.18c-.28.79-1.64 1.45-2.28 1.54-.58.08-1.32.12-2.13-.13-.49-.15-1.12-.36-1.93-.7-3.4-1.47-5.61-4.86-5.78-5.09-.17-.22-1.38-1.84-1.38-3.51 0-1.67.87-2.49 1.18-2.83.31-.34.68-.43.9-.43h.65c.21 0 .49-.08.76.58.28.68.95 2.33 1.03 2.5.08.17.14.37.03.59-.11.22-.17.36-.34.55-.17.19-.36.42-.51.57-.17.17-.34.35-.15.68.2.34.88 1.45 1.89 2.35 1.3 1.15 2.39 1.51 2.73 1.68.34.17.54.14.74-.08.2-.22.85-.99 1.08-1.33.22-.34.45-.28.76-.17.31.11 1.97.93 2.31 1.1.34.17.56.25.64.39.08.14.08.81-.2 1.6z"/></svg><span>WhatsApp Order</span>`;
    document.body.appendChild(float);
  }

  document.querySelectorAll("[data-nav]").forEach((a) => {
    if (a.getAttribute("data-nav") === path) a.setAttribute("aria-current", "page");
  });

  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕" : "☰";
    });
    links.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "☰";
      });
    });
  }

  const siteHeader = document.querySelector(".site-header");
  const onScroll = () => siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll("[data-wa]").forEach((el) => {
    const custom = el.getAttribute("data-wa");
    el.href = custom ? waLink(custom) : waLink();
  });

  const gbp = document.getElementById("gbp-link");
  if (gbp && SITE.googleBusinessUrl.startsWith("#")) {
    gbp.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Add your Google Business Profile link in js/site-config.js (googleBusinessUrl) after the profile is live.");
    });
  }
}

function observeReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  nodes.forEach((n) => io.observe(n));
}

function injectSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Apna Kitchen",
    image: "https://apnakitchenmenu.com/assets/brand/logo.png",
    description:
      "Homestyle halal Pakistani and Desi food for pickup in Frisco, Texas near Sherbrooke Drive. Mutton karhai, qorma, chops, kofta, chicken karahi, pulao trays, and frozen chapli & shami kababs. Order a day ahead on WhatsApp.",
    url: "https://apnakitchenmenu.com/",
    telephone: "+14698911406",
    servesCuisine: ["Pakistani", "Indian", "Halal", "Desi"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sherbrooke Drive",
      addressLocality: "Frisco",
      addressRegion: "TX",
      postalCode: "75035",
      addressCountry: "US",
    },
    areaServed: ["Frisco TX", "Plano TX", "McKinney TX", "Little Elm TX", "Prosper TX", "The Colony TX", "Allen TX"],
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Cash App, Zelle (confirm on WhatsApp)",
    hasMenu: "https://apnakitchenmenu.com/menu.html",
    potentialAction: {
      "@type": "OrderAction",
      target: waLink(),
    },
  };

  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.textContent = JSON.stringify(schema);
  document.head.appendChild(s);
}

document.addEventListener("DOMContentLoaded", () => {
  injectChrome();
  injectSchema();

  if (document.getElementById("menu-preview")) {
    renderMenu("menu-preview", { homePreview: true });
  }
  if (document.getElementById("menu-full")) {
    renderMenu("menu-full", { layout: "list" });
  }

  renderGallery();
  renderReviews();
  observeReveal();
});
