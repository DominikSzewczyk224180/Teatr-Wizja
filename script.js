/* =====================================================================
   TEATR WIZJA — interakcje
   ===================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  /* ---------- rok w stopce ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nawigacja: stan po scrollu ---------- */
  const nav = $("#nav");
  const onScrollNav = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScrollNav();
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- menu mobilne ---------- */
  const burger = $("#burger");
  const menu = $("#mobileMenu");
  const toggleMenu = (open) => {
    if (!burger || !menu) return;
    const isOpen = open ?? !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", isOpen);
    burger.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    menu.setAttribute("aria-hidden", String(!isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };
  if (burger) burger.addEventListener("click", () => toggleMenu());
  $$(".mobilemenu__links a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggleMenu(false); });

  /* ---------- reveal na scroll ---------- */
  const revealEls = $$(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- parallaksa (scroll) ---------- */
  const parallaxEls = $$("[data-parallax]");
  if (!reduceMotion && parallaxEls.length) {
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      parallaxEls.forEach((el) => {
        const f = parseFloat(el.getAttribute("data-parallax")) || 0;
        el.style.transform = `translate3d(${el._mx || 0}px, ${(-y * f).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();

    /* delikatna parallaksa od myszy w hero (tylko wskaźnik precyzyjny) */
    if (window.matchMedia("(pointer:fine)").matches) {
      const hero = $("#hero");
      if (hero) {
        hero.addEventListener("mousemove", (e) => {
          const cx = (e.clientX / window.innerWidth - 0.5) * 2;
          parallaxEls.forEach((el) => {
            const f = parseFloat(el.getAttribute("data-parallax")) || 0;
            el._mx = (-cx * f * 240).toFixed(1);
          });
          if (!ticking) { requestAnimationFrame(update); ticking = true; }
        });
      }
    }
  }

  /* ---------- YouTube facade (leniwe ładowanie) ---------- */
  $$(".yt-facade").forEach((facade) => {
    const play = () => {
      const id = facade.getAttribute("data-yt");
      if (!id) return;
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = "Odtwarzacz wideo Teatr Wizja";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      facade.innerHTML = "";
      facade.appendChild(iframe);
      facade.style.cursor = "default";
    };
    facade.addEventListener("click", play);
    facade.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); play(); }
    });
  });

  /* =====================================================================
     STARFIELD — animowane niebo (signature)
     ===================================================================== */
  const canvas = $("#starfield");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let stars = [];
    let shooting = null;
    let nextShoot = 0;

    const palette = ["#ffffff", "#ffe9b8", "#cfe6ff", "#ffd0e6"];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const buildStars = () => {
      const count = Math.round((w * h) / 11000); // gęstość zależna od ekranu
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.3,
          a: Math.random() * 0.6 + 0.25,
          tw: Math.random() * 0.9 + 0.2,        // prędkość migotania
          ph: Math.random() * Math.PI * 2,      // faza
          depth: Math.random() * 0.6 + 0.2,     // do parallaksy
          c: palette[(Math.random() * palette.length) | 0],
        });
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        ctx.globalAlpha = s.a;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    let scrollY = window.scrollY;
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const tw = 0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.ph);
        const py = (s.y - scrollY * s.depth * 0.15) % h;
        const yy = py < 0 ? py + h : py;
        ctx.globalAlpha = s.a * tw;
        ctx.fillStyle = s.c;
        ctx.beginPath();
        ctx.arc(s.x, yy, s.r, 0, Math.PI * 2);
        ctx.fill();

        // delikatna poświata dla większych gwiazd
        if (s.r > 1.35) {
          ctx.globalAlpha = s.a * tw * 0.14;
          ctx.beginPath();
          ctx.arc(s.x, yy, s.r * 2.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // spadające gwiazdy
      if (!shooting && t > nextShoot) {
        shooting = {
          x: Math.random() * w * 0.8 + w * 0.1,
          y: Math.random() * h * 0.4,
          len: 0, vx: 6 + Math.random() * 4, vy: 3 + Math.random() * 2, life: 0,
        };
      }
      if (shooting) {
        shooting.life++;
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.len = Math.min(shooting.len + 4, 160);
        const tx = shooting.x - shooting.vx * (shooting.len / 7);
        const ty = shooting.y - shooting.vy * (shooting.len / 7);
        const grad = ctx.createLinearGradient(shooting.x, shooting.y, tx, ty);
        grad.addColorStop(0, "rgba(255,255,255,.9)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        if (shooting.x > w + 50 || shooting.y > h + 50 || shooting.life > 120) {
          shooting = null;
          nextShoot = t + 5000 + Math.random() * 7000;
        }
      }

      raf = requestAnimationFrame(draw);
    };

    let raf = null;
    resize();
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      resize();
      if (reduceMotion) drawStatic();
      else { nextShoot = performance.now() + 2500; raf = requestAnimationFrame(draw); }
    });

    if (reduceMotion) {
      drawStatic();
    } else {
      nextShoot = performance.now() + 2500;
      raf = requestAnimationFrame(draw);
      // pauza gdy karta nieaktywna
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) { cancelAnimationFrame(raf); }
        else { raf = requestAnimationFrame(draw); }
      });
    }
  }
})();
