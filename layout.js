/* Shared header, menu, footer and live bits (on-sale status, prices, countdowns).
   Pages only need <div data-ph="header"></div> and <div data-ph="footer"></div>. */
(function () {
  var PH = window.PH;
  var page = document.body.dataset.page || "";

  var ALL_NAV = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "tickets", href: "tickets.html", label: "Power<b>TICKETS</b>" },
    { id: "experience", href: "experience.html", label: "The PowerHER Day" },
    { id: "lineup", href: "lineup.html", label: "Power<b>VOICES</b>" },
    { id: "partners", href: "partners.html", label: "Power<b>PARTNERS</b>" },
    { id: "creators", href: "creators.html", label: "Power<b>CREATORS</b>" },
    { id: "legacy", href: "legacy.html", label: "Power<b>LEGACY</b>" },
    { id: "faq", href: "faq.html", label: "FAQs" },
    { id: "powerkit", href: "powerkit.html", label: "Power<b>KIT</b>", note: "Coming soon" },
    { id: "contact", href: "contact.html", label: "Contact" }
  ];
  // Only pages listed in config.js → livePages show in the menu and footer
  var live = PH.livePages || ALL_NAV.map(function (n) { return n.id; });
  var NAV = ALL_NAV.filter(function (n) { return live.indexOf(n.id) > -1; });
  var TOP = ["home", "tickets", "experience", "lineup", "partners", "legacy", "faq", "contact"];
  var CREDIT = "Motherkind PowerHER Fit Fest, in partnership with Investec and Dis-Chem";

  function navLink(n, cls) {
    return '<a class="' + cls + (n.id === page ? " is-current" : "") + '" href="' + n.href + '"' +
      (n.id === page ? ' aria-current="page"' : "") + ">" + n.label +
      (n.note ? ' <span class="nav-note">' + n.note + "</span>" : "") + "</a>";
  }

  var header =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site-header">' +
      '<div class="wrap header-inner">' +
        '<a class="brand" href="index.html" aria-label="PowerHER Fit Fest home">' +
          '<img src="assets/img/logo-gradient.webp" alt="PowerHER Fit Fest" width="1000" height="306">' +
        "</a>" +
        '<nav class="top-nav" aria-label="Main">' +
          NAV.filter(function (n) { return TOP.indexOf(n.id) > -1; }).map(function (n) { return navLink(n, "top-link"); }).join("") +
        "</nav>" +
        '<div class="header-actions">' +
          '<button class="menu-btn" aria-expanded="false" aria-controls="menu"><span></span><span></span><span class="sr">Menu</span></button>' +
        "</div>" +
      "</div>" +
    "</header>" +
    '<div class="menu" id="menu" hidden>' +
      '<div class="menu-bg" aria-hidden="true"><span>Power<i>her</i></span><span>Power<i>her</i></span><span>Power<i>her</i></span></div>' +
      '<nav class="menu-nav wrap" aria-label="Full menu">' +
        NAV.map(function (n) { return navLink(n, "menu-link"); }).join("") +
      "</nav>" +
    "</div>";

  function legal(label, url) {
    return url ? '<a href="' + url + '" target="_blank" rel="noopener">' + label + "</a>"
               : '<span class="muted" title="Coming soon">' + label + "</span>";
  }

  var footer =
    '<footer class="site-footer">' +
      '<div class="wrap">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<img src="assets/img/logo-lockup-cotitle-white.webp" alt="' + CREDIT + '" width="1400" height="663" loading="lazy">' +
            '<p class="footer-credit">' + CREDIT + ".</p>" +
          "</div>" +
          '<div class="footer-cols">' +
            '<div><h3 class="eyebrow">Explore</h3>' + NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + "</a>"; }).join("") + "</div>" +
            '<div><h3 class="eyebrow">Join the PowerCIRCLE</h3>' +
              '<a href="' + PH.links.instagram + '" target="_blank" rel="noopener">Instagram</a>' +
              '<a href="' + PH.links.tiktok + '" target="_blank" rel="noopener">TikTok</a>' +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="footer-creators">' +
          '<span class="eyebrow">Created by</span>' +
          '<img src="assets/img/creator-glow-white.webp" alt="Glow Social Club" width="700" height="432" loading="lazy">' +
          '<span class="divider" aria-hidden="true"></span>' +
          '<img src="assets/img/creator-gg-white.webp" alt="G&amp;G The Goosebumps Company" width="900" height="250" loading="lazy">' +
          '<p class="footer-closing">PowerHER Fit Fest. Created by Glow Social and G&amp;G, The Goosebumps Company.</p>' +
        "</div>" +
        '<div class="footer-legal">' +
          "<span>© 2026 G and G Events and Functions (Pty) Ltd and Golden Creative Events (Pty) Ltd</span>" +
          legal("Terms & Conditions", PH.links.terms) +
          legal("Privacy Policy", PH.links.privacy) +
        "</div>" +
      "</div>" +
    "</footer>";

  document.querySelectorAll('[data-ph="header"]').forEach(function (el) { el.outerHTML = header; });
  document.querySelectorAll('[data-ph="footer"]').forEach(function (el) { el.outerHTML = footer; });

  /* ---------- new pages always open at the top ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  /* ---------- menu ---------- */
  var btn = document.querySelector(".menu-btn"), menu = document.getElementById("menu");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", open);
    document.documentElement.classList.toggle("menu-open", open);
    if (open) { menu.hidden = false; requestAnimationFrame(function () { menu.classList.add("is-open"); }); }
    else { menu.classList.remove("is-open"); setTimeout(function () { menu.hidden = true; }, 300); }
  }
  btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) setMenu(false); });

  var hdr = document.querySelector(".site-header");
  function onScroll() { hdr.classList.toggle("is-scrolled", window.scrollY > 20); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- data bindings ---------- */
  // <a data-ticket="jhb|cpt">  → Howler link
  document.querySelectorAll("[data-ticket]").forEach(function (a) {
    if (a.dataset.ticket !== "active") a.href = PH.links[a.dataset.ticket];
    a.target = "_blank"; a.rel = "noopener";
  });

  // City switch (Tickets page): <div data-city-switch><button data-city="jhb">…
  //   <a data-ticket="active">          → Howler link for the chosen city
  //   <span data-city-text="dateLabel"> → text for the chosen city
  //   <li data-city-only="jhb">         → only shown for that city
  var switches = document.querySelectorAll("[data-city-switch]");
  if (switches.length) {
    var qCity = new URLSearchParams(location.search).get("city");
    var city = PH.cities[qCity] ? qCity : "jhb";
    var setCity = function (c) {
      city = c;
      document.querySelectorAll("[data-city]").forEach(function (b) {
        b.setAttribute("aria-pressed", b.dataset.city === c ? "true" : "false");
      });
      document.querySelectorAll('[data-ticket="active"]').forEach(function (a) { a.href = PH.links[c]; });
      document.querySelectorAll("[data-city-text]").forEach(function (el) { el.textContent = PH.cities[c][el.dataset.cityText]; });
      document.querySelectorAll("[data-city-only]").forEach(function (el) { el.hidden = el.dataset.cityOnly !== c; });
      document.querySelectorAll("[data-city-map]").forEach(function (a) { a.href = PH.cities[c].map; });
    };
    document.querySelectorAll("[data-city]").forEach(function (b) {
      b.addEventListener("click", function () { setCity(b.dataset.city); });
    });
    setCity(city);
  }

  // WhatsApp share: <a data-share> opens the visitor's own WhatsApp with the message from config.js
  if (PH.share) document.querySelectorAll("[data-share]").forEach(function (a) {
    a.href = "https://wa.me/?text=" + encodeURIComponent(PH.share.text + " " + PH.share.url);
    a.target = "_blank"; a.rel = "noopener";
  });

  // Contact details: <a data-contact="email"> / <a data-contact="phone">
  // Hidden automatically while the value in config.js is empty.
  var C = PH.contact || {};
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    var key = el.dataset.contact, v = C[key];
    var wrap = el.closest("[data-contact-item]") || el;
    if (!v) { wrap.hidden = true; return; }
    el.textContent = v;
    if (el.tagName === "A") el.href = (key === "email" ? "mailto:" : "tel:") + v.replace(/\s/g, "");
  });
  document.querySelectorAll("[data-contact-fallback]").forEach(function (el) { el.hidden = !!(C.email || C.phone); });
  // <span data-bind="vvip">  → value from config (dot paths allowed)
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    var v = el.dataset.bind.split(".").reduce(function (o, k) { return o && o[k]; }, PH);
    if (v != null) el.textContent = v;
  });

  // General price phases
  document.querySelectorAll("[data-phases]").forEach(function (el) {
    el.innerHTML = PH.general.map(function (p) {
      var state = p.phase < PH.currentPhase ? "sold" : p.phase === PH.currentPhase ? "now" : "next";
      var tag = state === "sold" ? "Sold out" : state === "now" ? "On sale" : "Coming";
      return '<li class="phase is-' + state + '"><span class="phase-name">Phase ' + p.phase + "</span>" +
        '<span class="phase-price">' + p.price + '</span><span class="phase-tag">' + tag + "</span></li>";
    }).join("");
  });
  document.querySelectorAll("[data-current-price]").forEach(function (el) {
    el.textContent = PH.general[PH.currentPhase - 1].price;
  });
  document.querySelectorAll("[data-current-fee]").forEach(function (el) {
    el.textContent = PH.bookingFees.general[PH.currentPhase - 1];
  });

  // On-sale roll-out
  var now = PH.now;
  var stages = PH.onSale.map(function (s) { return Object.assign({ t: new Date(s.when) }, s); });
  var publicOpen = now >= stages[stages.length - 1].t;
  document.documentElement.classList.toggle("is-public-sale", publicOpen);

  document.querySelectorAll("[data-onsale]").forEach(function (el) {
    if (publicOpen) {
      el.innerHTML = '<div class="onsale-live">' +
        '<p class="onsale-title"><span class="dot" aria-hidden="true"></span><strong>PowerTICKETS are on sale now.</strong></p>' +
        '<a class="btn btn-light btn-sm" href="' + (page === "tickets" ? "#choose" : "tickets.html") + '">Get yours</a></div>';
      return;
    }
    el.innerHTML = '<p class="eyebrow">PowerTICKETS roll-out</p><ol class="onsale-steps">' +
      stages.map(function (s) {
        var live = now >= s.t;
        return '<li class="' + (live ? "is-live" : "") + '">' +
          '<span class="step-state">' + (live ? '<span class="dot" aria-hidden="true"></span>On sale' : "Opens") + "</span>" +
          '<span class="step-who">' + s.label + "</span>" +
          '<span class="step-when">' + s.dayLabel + "</span></li>";
      }).join("") + "</ol>";
  });

  // Countdown: <span data-countdown="jhb">
  document.querySelectorAll("[data-countdown]").forEach(function (el) {
    var d = new Date(PH.cities[el.dataset.countdown].date);
    var days = Math.ceil((d - now) / 864e5);
    el.textContent = days > 1 ? days + " days to go" : days === 1 ? "Tomorrow!" : days === 0 ? "Today!" : "";
  });

  /* ---------- reveal on scroll ---------- */
  var els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(function (el) { el.classList.add("is-in"); }); }
})();
