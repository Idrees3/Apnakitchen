(function () {
  "use strict";

  function initDrawer() {
    var toggle = document.getElementById("t6NavToggle");
    var drawer = document.getElementById("t6Drawer");
    if (!toggle || !drawer) return;

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      var open = drawer.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });

    drawer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        document.body.style.overflow = "";
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        drawer.classList.remove("is-open");
        document.body.style.overflow = "";
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  function initStickyCta() {
    var bar = document.querySelector(".t6-mobile-cta");
    if (!bar) return;
    bar.style.transition = "transform .25s ease";
    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        if (y < 120) {
          bar.style.transform = "translateY(100%)";
        } else {
          bar.style.transform = "translateY(0)";
        }
      },
      { passive: true }
    );
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var hash = a.getAttribute("href");
        if (!hash || hash === "#" || hash.length < 2) return;
        var target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function init() {
    initDrawer();
    initStickyCta();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
