/* ================================================================
   script.js  –  erfenis.html
   Verantwoordelijkheden (alleen wat HTML/CSS niet kan):
     1. BSN elfproef
     2. Overlijdensdatum: zet max op vandaag
     3. Notarisnummer: alleen positieve gehele getallen
     4. localStorage: opslaan bij input, herstellen bij laden
   ================================================================ */

const STORAGE_KEY = "erfenisForm";
const form        = document.getElementById("persoonsForm");

// ── 1. DATUM MAX  Perplexity──────────────────────────────────────────────────
const overlijdenEl = document.getElementById("overlijden");
if (overlijdenEl) {
  overlijdenEl.max = new Date().toISOString().split("T")[0];

  overlijdenEl.addEventListener("change", () => {
    const errEl = document.getElementById("error-overlijden");
    if (!errEl) return;
    if (overlijdenEl.value > overlijdenEl.max) {
      errEl.textContent = "Overlijdensdatum mag niet in de toekomst liggen";
      errEl.hidden = false;
      overlijdenEl.setCustomValidity("Overlijdensdatum mag niet in de toekomst liggen");
    } else {
      errEl.hidden = true;
      overlijdenEl.setCustomValidity("");
    }
  });
}

// ── 2. BSN ELFPROEF perplexity ───────────────────────────────────────────────
function elfProef(bsn) {
  const d = bsn.split("").map(Number);
  return (d[0]*9 + d[1]*8 + d[2]*7 + d[3]*6 + d[4]*5 +
          d[5]*4 + d[6]*3 + d[7]*2 - d[8]) % 11 === 0;
}

const bsnEl = document.getElementById("bsn");
if (bsnEl) {
  bsnEl.addEventListener("input", () => {
    const errEl = document.getElementById("error-bsn");
    const val   = bsnEl.value.trim();

    if (!/^[0-9]{9}$/.test(val)) {
      bsnEl.setCustomValidity("");
      if (errEl) errEl.hidden = true;
      return;
    }

    if (!elfProef(val)) {
      const msg = "BSN is ongeldig (elfproef mislukt)";
      bsnEl.setCustomValidity(msg);
      if (errEl) { errEl.textContent = msg; errEl.hidden = false; }
    } else {
      bsnEl.setCustomValidity("");
      if (errEl) errEl.hidden = true;
    }
  });
}

// ── 3. NOTARISNUMMER ──────────────────────────────────────────────
// type="number" min="1" step="1" in HTML doet al veel,
// maar geeft geen fijne live-feedback.
const notarisEl = document.getElementById("notaris");
if (notarisEl) {
  notarisEl.addEventListener("input", () => {
    const errEl = document.getElementById("error-notaris");
    const val   = Number(notarisEl.value);
    const ok    = notarisEl.value !== "" && Number.isInteger(val) && val > 0;

    if (!ok) {
      const msg = "Vul een geldig protocolnummer in (positief geheel getal)";
      notarisEl.setCustomValidity(msg);
      if (errEl) { errEl.textContent = msg; errEl.hidden = false; }
    } else {
      notarisEl.setCustomValidity("");
      if (errEl) errEl.hidden = true;
    }
  });
}

// ── 4. LOCALSTORAGE: OPSLAAN ──────────────────────────────────────
if (form) {
  form.addEventListener("input", () => {
    const data = {};
    new FormData(form).forEach((v, k) => { data[k] = v; });
    // Radio's die nog niet aangevinkt zijn komen niet in FormData — apart opslaan
    form.querySelectorAll("input[type=radio]:checked").forEach(r => {
      data[r.name] = r.value;
    });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (_) {}
  });

  // ── 5. LOCALSTORAGE: HERSTELLEN ────────────────────────────────
  // CSS :has() herstelt de zichtbaarheid automatisch als de radio checked is.
  window.addEventListener("DOMContentLoaded", () => {
    let saved;
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) {}
    if (!saved) return;

    Object.entries(saved).forEach(([name, value]) => {
      const el = form.elements[name];
      if (!el) return;
      if (el.type === "radio" || el instanceof RadioNodeList) {
        const radio = form.querySelector(`input[name="${name}"][value="${value}"]`);
        if (radio) radio.checked = true;
      } else {
        el.value = value;
      }
    });
  });
}