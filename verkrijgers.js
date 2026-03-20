/* ================================================================
   verkrijgers.js  –  verkrijgers.html
   Verantwoordelijkheden (alleen wat HTML niet kan):
     1. "Voeg verkrijger toe" knop zichtbaar maken en laten werken
     2. Dynamisch verkrijger-blokken aanmaken / verwijderen
     3. BSN elfproef per verkrijger
     4. localStorage: opslaan bij input, herstellen bij laden
   ================================================================ */

const STORAGE_KEY    = "erfenisVerkrijgers";
const container      = document.getElementById("formsContainer");
const addBtn         = document.getElementById("addFormBtn");
const verkrijgersForm = document.getElementById("verkrijgersForm");

// ── ELFPROEF ──────────────────────────────────────────────────────
function elfProef(bsn) {
  const d = bsn.split("").map(Number);
  return (d[0]*9 + d[1]*8 + d[2]*7 + d[3]*6 + d[4]*5 +
          d[5]*4 + d[6]*3 + d[7]*2 - d[8]) % 11 === 0;
}

// ── TELLER: hoeveel blokken bestaan er al? ────────────────────────
function huidigeAantalVerkrijgers() {
  return container.querySelectorAll(".verkrijger").length;
}

// ── MAAK EEN VERKRIJGER-BLOK ──────────────────────────────────────
function maakVerkrijgerBlok(n, data = {}) {
  const fs = document.createElement("fieldset");
  fs.className = "verkrijger";
  fs.innerHTML = `
    <legend>Verkrijger ${n}</legend>
    <button type="button" class="remove-btn" aria-label="Verwijder verkrijger ${n}">✕</button>

    <div class="q">BSN / RSIN <span aria-hidden="true">*</span></div>
    <input type="text" name="vk_bsn_${n}" maxlength="9" inputmode="numeric"
      pattern="[0-9]{9}" title="BSN moet uit 9 cijfers bestaan"
      required autocomplete="off" value="${data.bsn || ""}" />
    <p class="veld-fout" id="error-vk-bsn-${n}" role="alert" hidden></p>

    <div class="q">Voorletter(s) <span aria-hidden="true">*</span></div>
    <input type="text" name="vk_voorletters_${n}" required
      pattern="[A-Za-z]+" autocomplete="off" value="${data.voorletters || ""}" />

    <div class="q">Tussenvoegsels</div>
    <input type="text" name="vk_tussenvoegsel_${n}"
      autocomplete="off" value="${data.tussenvoegsel || ""}" />

    <div class="q">Achternaam <span aria-hidden="true">*</span></div>
    <input type="text" name="vk_achternaam_${n}" required
      pattern="[A-Za-z]+" autocomplete="off" value="${data.achternaam || ""}" />

    <fieldset>
      <legend>Krijgt deze verkrijger het hele vermogen?</legend>
      <div class="radio-inputs">
        <label class="radio">
          <input type="radio" name="vk_heleVermogen_${n}" value="nee" required
            ${data.heleVermogen === "nee" ? "checked" : ""}>
          <span class="name">Nee</span>
        </label>
        <label class="radio">
          <input type="radio" name="vk_heleVermogen_${n}" value="ja"
            ${data.heleVermogen === "ja" ? "checked" : ""}>
          <span class="name">Ja</span>
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Doet deze verkrijger een beroep op diens legitieme portie?</legend>
      <div class="radio-inputs">
        <label class="radio">
          <input type="radio" name="vk_legitiemePortie_${n}" value="nee" required
            ${data.legitiemePortie === "nee" ? "checked" : ""}>
          <span class="name">Nee</span>
        </label>
        <label class="radio">
          <input type="radio" name="vk_legitiemePortie_${n}" value="ja"
            ${data.legitiemePortie === "ja" ? "checked" : ""}>
          <span class="name">Ja</span>
        </label>
      </div>
    </fieldset>
  `;

  // BSN elfproef live
  const bsnInput = fs.querySelector(`[name="vk_bsn_${n}"]`);
  const bsnErr   = fs.querySelector(`#error-vk-bsn-${n}`);
  bsnInput.addEventListener("input", () => {
    const val = bsnInput.value.trim();
    if (!/^[0-9]{9}$/.test(val)) {
      bsnInput.setCustomValidity("");
      bsnErr.hidden = true;
      return;
    }
    if (!elfProef(val)) {
      const msg = "BSN is ongeldig (elfproef mislukt)";
      bsnInput.setCustomValidity(msg);
      bsnErr.textContent = msg;
      bsnErr.hidden = false;
    } else {
      bsnInput.setCustomValidity("");
      bsnErr.hidden = true;
    }
  });

  // Verwijderknop
  fs.querySelector(".remove-btn").addEventListener("click", () => {
    fs.remove();
    hernummer();
    slaVerkrijgersOp();
  });

  return fs;
}

// ── HERNUMMER LEGENDAS NA VERWIJDERING ────────────────────────────
function hernummer() {
  container.querySelectorAll(".verkrijger").forEach((fs, i) => {
    fs.querySelector("legend").textContent = `Verkrijger ${i + 1}`;
  });
}

// ── OPSLAAN ───────────────────────────────────────────────────────
function slaVerkrijgersOp() {
  const blokken = container.querySelectorAll(".verkrijger");
  const lijst = Array.from(blokken).map(fs => ({
    bsn:             fs.querySelector("[name^='vk_bsn_']")?.value             || "",
    voorletters:     fs.querySelector("[name^='vk_voorletters_']")?.value     || "",
    tussenvoegsel:   fs.querySelector("[name^='vk_tussenvoegsel_']")?.value   || "",
    achternaam:      fs.querySelector("[name^='vk_achternaam_']")?.value      || "",
    heleVermogen:    fs.querySelector("[name^='vk_heleVermogen_']:checked")?.value    || "",
    legitiemePortie: fs.querySelector("[name^='vk_legitiemePortie_']:checked")?.value || "",
  }));
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(lijst)); } catch (_) {}
}

// ── HERSTELLEN UIT LOCALSTORAGE ───────────────────────────────────
function herstelVerkrijgers() {
  let lijst;
  try { lijst = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) {}
  if (!Array.isArray(lijst) || lijst.length === 0) return;

  // Vervang het vaste eerste blok door opgeslagen data
  container.innerHTML = "";
  lijst.forEach((data, i) => {
    container.appendChild(maakVerkrijgerBlok(i + 1, data));
  });
}

window.addEventListener("DOMContentLoaded", () => {

  // Toon de "voeg toe"-knop (was hidden voor no-JS)
  if (addBtn) addBtn.hidden = false;

  // Herstel opgeslagen verkrijgers (vervangt het statische eerste blok als er data is)
  herstelVerkrijgers();

  // Voeg eerste blok elfproef toe als het statische blok nog aanwezig is
  const eersteBlok = container.querySelector(".verkrijger");
  if (eersteBlok) {
    const bsnInput = eersteBlok.querySelector("[name^='vk_bsn_']");
    const bsnErr   = document.getElementById("error-vk-bsn-1");
    if (bsnInput && bsnErr) {
      bsnInput.addEventListener("input", () => {
        const val = bsnInput.value.trim();
        if (!/^[0-9]{9}$/.test(val)) { bsnInput.setCustomValidity(""); bsnErr.hidden = true; return; }
        if (!elfProef(val)) {
          const msg = "BSN is ongeldig (elfproef mislukt)";
          bsnInput.setCustomValidity(msg); bsnErr.textContent = msg; bsnErr.hidden = false;
        } else { bsnInput.setCustomValidity(""); bsnErr.hidden = true; }
      });
    }
  }

  // Knop: voeg verkrijger toe
  addBtn?.addEventListener("click", () => {
    const n = huidigeAantalVerkrijgers() + 1;
    container.appendChild(maakVerkrijgerBlok(n));
  });

  // Autosave
  verkrijgersForm?.addEventListener("input", slaVerkrijgersOp);
});