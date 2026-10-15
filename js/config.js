/* =====================================================================
   POWERHER FIT FEST: SITE SETTINGS
   Everything that changes during the campaign lives here.
   Change a value, save, redeploy. Every page picks it up.
   ===================================================================== */

window.PH = {
  /* PAGES THAT ARE LIVE
     Only these appear in the menu and footer. When a new page is built,
     add its name here (e.g. "legacy") and it shows up everywhere. */
  livePages: ["home", "tickets", "experience", "partners", "faq", "contact"],

  /* CONTACT DETAILS (Contact page and FAQs). Leave "" to hide a line. */
  contact: {
    email: "info@gandgpro.com",
    phone: ""    // e.g. "+27 11 000 0000"
  },

  links: {
    jhb: "https://powerher.howler.co.za/events/powerher-fit-fest-jhb-7-nov-2026-5a9d",
    cpt: "https://powerher.howler.co.za/events/powerher-fit-fest-cpt-14-nov-2026-fde2",
    instagram: "https://www.instagram.com/powerherfitfest/",
    tiktok: "https://www.tiktok.com/@powerherfitfest",
    legacyDonate: "https://womenforchange.co.za/donate/",
    terms: "",   // paste the T&Cs link when ready
    privacy: ""  // paste the Privacy Policy link when ready
  },

  cities: {
    jhb: {
      name: "Johannesburg", short: "JHB",
      date: "2026-11-07T11:00:00+02:00", dateLabel: "Saturday, 7 November 2026",
      pill: "JHB • 7 NOV ’26",
      venue: "The Chosen Convention & Expo Centre",
      address: "23 Summit Dr, Rispark, Johannesburg South",
      map: "https://maps.google.com/?q=The+Chosen+Convention+%26+Expo+Centre+23+Summit+Dr+Rispark"
    },
    cpt: {
      name: "Cape Town", short: "CPT",
      date: "2026-11-14T11:00:00+02:00", dateLabel: "Saturday, 14 November 2026",
      pill: "CPT • 14 NOV ’26",
      venue: "Allée Bleue Wine Estate",
      address: "Cnr R45 & R310, Groot Drakenstein, Franschhoek",
      map: "https://maps.google.com/?q=Allee+Bleue+Wine+Estate+Franschhoek"
    }
  },
  /* EVENT TIMES: shown on every page. If they change, also update the
     "startDate"/"endDate" times in the <head> of index.html (used by Google). */
  hours: "11:00 – 21:00",

  /* Ticket sales roll-out (South African time) */
  onSale: [
    { key: "investec", label: "Investec clients", when: "2026-09-30T10:00:00+02:00", dayLabel: "Wed 30 Sept, 10am" },
    { key: "waitlist", label: "Waitlist members", when: "2026-10-01T10:00:00+02:00", dayLabel: "Thu 1 Oct, 10am" },
    { key: "public",   label: "Everyone",         when: "2026-10-02T10:00:00+02:00", dayLabel: "Fri 2 Oct, 10am" }
  ],

  /* PRICING
     currentPhase: set to 2 when Phase 1 sells out, 3 when Phase 2 sells out. */
  currentPhase: 1,
  general: [
    { phase: 1, price: "R890" },
    { phase: 2, price: "R1,090" },
    { phase: 3, price: "R1,290" }
  ],
  vvip: "R3,790",
  investec: { general: "R667.50", vvip: "R2,842.50" },

  /* WHATSAPP SHARE: the ready-written message a guest can send her friends.
     It opens HER WhatsApp; she picks who to send it to. Nothing is collected.
     Follows the Authors Guide partner order. */
  share: {
    text: "Motherkind is proud to present PowerHER Fit Fest, in partnership with Investec and Dis-Chem: a full day live with Kayla Itsines. JHB 7 Nov or CPT 14 Nov. Who’s coming with me?",
    url: "https://powerherfitfest.com/"
  },

  /* Howler adds a booking fee per ticket at checkout */
  bookingFees: { general: ["R89", "R109", "R129"], investecGeneral: "R66.75", vvip: "R200" }
};

/* Preview any date: add ?now=2026-10-02T11:00 to the URL */
window.PH.now = (function () {
  var q = new URLSearchParams(location.search).get("now");
  var d = q ? new Date(q.length <= 16 ? q + ":00+02:00" : q) : new Date();
  return isNaN(d) ? new Date() : d;
})();
