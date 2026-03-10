function isValidBSN(bsn) {
  if (!/^\d{9}$/.test(bsn)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += (9 - i) * parseInt(bsn[i], 10);
  }
  return sum % 11 === 0;

  
}


document.getElementById("addFormBtn").addEventListener("click", addForm);
document.getElementById("submitAllBtn").addEventListener("click", submitAll);

function addForm() {
  const container = document.getElementById("forms-container");
  const original = document.getElementById("verkrijgerInfo");
  const clone = original.cloneNode(true);
  formCount++;

  clone.id = "verkrijgerInfo_" + formCount;

  clone.querySelectorAll("input").forEach(input => {
    if (input.type === "radio") {
      input.name = "verkrijgerHeleVermogen_" + formCount;
      input.checked = false;
    } else {
      input.value = "";
    }
  });

  container.appendChild(clone);
}

// Met assistentie van AI Perplexity
function submitAll() {
  const container = document.getElementById("forms-container");
  const forms = container.querySelectorAll("form");

  const payload = [];

  forms.forEach(form => {
    const formData = new FormData(form);
    const entry = {};

    for (const [key, value] of formData.entries()) {
      entry[key] = value;
    }

    payload.push(entry);
  });

  console.log("Te versturen data:", payload);
}

const form = document.querySelector("#form");
const STORAGE_KEY = "autosave_form";

/* FORM HERSTELLEN BIJ LADEN */
const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

if (savedData) {

  Object.entries(savedData).forEach(([name, value]) => {

    const field = form.elements[name];
    if (!field) return;

    if (field.type === "radio") {

      const radio = form.querySelector(`input[name="${name}"][value="${value}"]`);
      if (radio) radio.checked = true;

    } else {

      field.value = value;

    }

  });

}

/* AUTOSAVE BIJ WIJZIGEN */
form.addEventListener("input", () => {

  const data = Object.fromEntries(new FormData(form));

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

});