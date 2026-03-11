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

