(function () {
  if (new URLSearchParams(location.search).has("noanim")) {
    document.querySelectorAll(".reveal,.reveal-img").forEach(function (el) {
      el.style.opacity = 1; el.style.transform = "none"; el.style.clipPath = "none";
    });
    document.querySelectorAll("[data-count]").forEach(function (el) {
      el.textContent = el.getAttribute("data-count") + (el.getAttribute("data-suffix") || "");
    });
    var h = document.querySelector(".site-header");
    window.addEventListener("scroll", function () {
      h.classList.toggle("scrolled", window.scrollY > 40);
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // Lenis smooth scroll
  var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  // Header state
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var burger = document.querySelector(".burger");
  var mnav = document.querySelector(".mobile-nav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      mnav.classList.toggle("open");
    });
    mnav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { mnav.classList.remove("open"); });
    });
  }

  // Hero intro
  var heroEls = document.querySelectorAll(".hero .eyebrow, .hero .h-display, .hero .hero-ctas, .hero .hero-meta, .page-hero .eyebrow, .page-hero .h1, .page-hero .lead");
  if (heroEls.length) {
    gsap.from(heroEls, { y: 50, opacity: 0, duration: 1.1, stagger: 0.12, ease: "power3.out", delay: 0.15 });
  }

  // Hero parallax
  document.querySelectorAll(".hero-media img, .sw-band .bg img").forEach(function (img) {
    gsap.to(img, {
      yPercent: 12, ease: "none",
      scrollTrigger: { trigger: img.closest("section") || img.parentElement, start: "top top", end: "bottom top", scrub: true }
    });
  });

  // Generic reveals
  document.querySelectorAll(".reveal").forEach(function (el) {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 86%" }
    });
  });

  // Image clip reveals
  document.querySelectorAll(".reveal-img").forEach(function (el) {
    gsap.to(el, {
      clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 1.2, ease: "power3.inOut",
      scrollTrigger: { trigger: el, start: "top 82%" }
    });
  });

  // Card stagger
  document.querySelectorAll("[data-stagger]").forEach(function (grid) {
    gsap.from(grid.children, {
      y: 46, opacity: 0, duration: 0.9, stagger: 0.09, ease: "power3.out",
      scrollTrigger: { trigger: grid, start: "top 84%" }
    });
  });

  // Counters
  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
      onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; }
    });
  });

  // Marquee
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    track.innerHTML += track.innerHTML;
    gsap.to(track, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
  });

  // WhatsApp form redirect
  var form = document.getElementById("orcamento-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var tel = form.telefone.value.trim();
      var seg = form.segmento.value;
      var msg = form.mensagem.value.trim();
      var text = "Ola, gostaria de solicitar um orcamento.\nNome: " + nome + "\nTelefone: " + tel + "\nSegmento: " + seg + (msg ? "\nMensagem: " + msg : "");
      window.open("https://api.whatsapp.com/send?phone=5521983180196&text=" + encodeURIComponent(text), "_blank");
    });
  }
})();
