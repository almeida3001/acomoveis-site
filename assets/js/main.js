(function () {
  var noAnim = new URLSearchParams(location.search).has("noanim") || typeof gsap === "undefined";

  // ---------- Header: badge encolhe no scroll ----------
  function onScroll() {
    document.body.classList.toggle("scrolled", window.scrollY > 60);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Meganav ----------
  var toggle = document.querySelector(".menu-toggle");
  var meganav = document.querySelector(".meganav");
  var closeBtn = document.querySelector(".meganav .close");
  function setMenu(open) {
    if (!meganav) return;
    meganav.classList.toggle("open", open);
    if (toggle) toggle.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(!meganav.classList.contains("open")); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
  if (meganav) meganav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  // ---------- Lista interativa de categorias ----------
  var catItems = document.querySelectorAll(".cat-item");
  var mainImg = document.getElementById("cat-img-a");
  catItems.forEach(function (item) {
    item.addEventListener("mouseenter", function () {
      catItems.forEach(function (i) { i.classList.remove("active"); });
      item.classList.add("active");
      var src = item.getAttribute("data-img");
      if (mainImg && src && mainImg.getAttribute("src") !== src) {
        mainImg.style.opacity = 0;
        setTimeout(function () {
          mainImg.setAttribute("src", src);
          mainImg.style.opacity = 1;
        }, 180);
      }
    });
  });
  if (mainImg) mainImg.style.transition = "opacity .35s cubic-bezier(.165,.84,.44,1)";

  // ---------- Contadores ----------
  function animateCounters() {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      if (noAnim) { el.textContent = target + suffix; return; }
      var done = false;
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !done) {
            done = true;
            var obj = { v: 0 };
            gsap.to(obj, {
              v: target, duration: 1.6, ease: "power2.out",
              onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; }
            });
            obs.disconnect();
          }
        });
      }, { threshold: 0.4 });
      obs.observe(el);
    });
  }
  animateCounters();

  if (noAnim) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---------- Hero intro ----------
  var heroEls = document.querySelectorAll(".hero-panel .eyebrow, .hero-panel h1, .hero-panel p, .hero-panel .hero-ctas, .page-hero .eyebrow, .page-hero h1, .page-hero .lead");
  if (heroEls.length) {
    gsap.from(heroEls, { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 });
  }
  var heroPhoto = document.querySelector(".hero-photo img");
  if (heroPhoto) {
    gsap.from(heroPhoto, { scale: 1.08, duration: 1.6, ease: "power2.out" });
  }

  // ---------- Reveals on scroll ----------
  document.querySelectorAll(".reveal").forEach(function (el) {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" }
    });
  });

  // ---------- Stagger em grids ----------
  document.querySelectorAll("[data-stagger]").forEach(function (grid) {
    gsap.from(grid.children, {
      y: 40, opacity: 0, duration: 0.85, stagger: 0.08, ease: "power3.out",
      scrollTrigger: { trigger: grid, start: "top 84%" }
    });
  });

  // ---------- Fotos empilhadas entram ----------
  var stack = document.querySelector(".stack-photos");
  if (stack) {
    gsap.from(stack.querySelectorAll("figure"), {
      y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: stack, start: "top 80%" }
    });
  }

  // ---------- Banda escura: leve parallax na foto ----------
  document.querySelectorAll(".band-dark .bg img").forEach(function (img) {
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: "none",
      scrollTrigger: { trigger: img.closest(".band-dark"), start: "top bottom", end: "bottom top", scrub: true }
    });
  });
})();
