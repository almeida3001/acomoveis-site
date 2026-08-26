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
  // Crossfade so na foto principal: uma nova <img> entra por cima e a antiga
  // sai depois. As figuras do stack nunca mudam de opacidade, entao a coluna
  // esquerda nunca some. Sem hover (touch), o stack fica fixo.
  var catItems = document.querySelectorAll(".cat-item");
  var phA = document.querySelector(".stack-photos .ph-a");
  var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  if (phA && canHover) {
    var baseImg = phA.querySelector("img");
    var currentSrc = baseImg ? baseImg.getAttribute("src") : "";
    catItems.forEach(function (item) {
      item.addEventListener("mouseenter", function () {
        catItems.forEach(function (i) { i.classList.remove("active"); });
        item.classList.add("active");
        var src = item.getAttribute("data-img");
        if (!src || src === currentSrc) return;
        currentSrc = src;
        var next = new Image();
        next.alt = "Categoria de produto Açomóveis";
        next.className = "xfade";
        next.onload = function () {
          if (currentSrc !== src) return;
          var prev = Array.prototype.slice.call(phA.querySelectorAll("img"));
          phA.appendChild(next);
          void next.offsetWidth;
          next.style.opacity = 1;
          setTimeout(function () {
            prev.forEach(function (p) {
              if (p !== next && p.parentNode) p.parentNode.removeChild(p);
            });
            next.classList.remove("xfade");
            next.style.opacity = "";
          }, 450);
        };
        next.src = src;
      });
    });
  }

  // ---------- Formulário de orçamento -> WhatsApp ----------
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

  // Aba oculta no load: rAF pausado deixaria tweens de entrada presos em
  // opacity 0 (secoes em branco). Nesse caso, pula as animacoes de entrada.
  if (noAnim || document.hidden) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ---------- Hero intro ----------
  var heroEls = document.querySelectorAll(".hero-panel .hero-logo, .hero-panel .eyebrow, .hero-panel h1, .hero-panel p, .hero-panel .hero-ctas, .page-hero .eyebrow, .page-hero h1, .page-hero .lead, .page-hero .hero-ctas");
  var heroPhoto = document.querySelector(".hero-photo img");
  if (document.hidden) {
    if (heroEls.length) gsap.set(heroEls, { clearProps: "all" });
    if (heroPhoto) gsap.set(heroPhoto, { clearProps: "all" });
  } else {
    if (heroEls.length) {
      gsap.from(heroEls, { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.1 });
    }
    if (heroPhoto) {
      gsap.from(heroPhoto, { scale: 1.08, duration: 1.6, ease: "power2.out" });
    }
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
  // once + clearProps: um ScrollTrigger.refresh (troca de aba etc.) nao pode
  // devolver as figuras para opacity 0.
  var stack = document.querySelector(".stack-photos");
  if (stack && !document.hidden) {
    var figs = stack.querySelectorAll("figure");
    gsap.from(figs, {
      y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out",
      scrollTrigger: { trigger: stack, start: "top 80%", once: true },
      onComplete: function () { gsap.set(figs, { clearProps: "opacity,transform" }); }
    });
  }

  // ---------- Robustez: aba oculta no load pausa o rAF e pode prender tweens ----------
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) { ScrollTrigger.refresh(); }
  });
  window.addEventListener("load", function () {
    setTimeout(function () { ScrollTrigger.refresh(); }, 400);
  });

  // ---------- Banda escura: leve parallax na foto ----------
  document.querySelectorAll(".band-dark .bg img").forEach(function (img) {
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6, ease: "none",
      scrollTrigger: { trigger: img.closest(".band-dark"), start: "top bottom", end: "bottom top", scrub: true }
    });
  });
})();
