function isValidBSN(bsn) {
  if (!/^\d{9}$/.test(bsn)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += (9 - i) * parseInt(bsn[i], 10);
  }
  return sum % 11 === 0;

  
}


/* =========================
   ERFENIS FORM STORAGE
========================= */

const form = document.getElementById("form");
const STORAGE_KEY = "erfenisForm";

if (form) {

form.addEventListener("input", () => {

const data = {};
const formData = new FormData(form);

formData.forEach((value, key) => {
data[key] = value;
});

localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

});

window.addEventListener("DOMContentLoaded", () => {

const saved = localStorage.getItem(STORAGE_KEY);
if (!saved) return;

const data = JSON.parse(saved);

Object.keys(data).forEach(name => {

const field = form.elements[name];
if (!field) return;

if (field.type === "radio") {

const radio = form.querySelector(`input[name="${name}"][value="${data[name]}"]`);
if (radio) radio.checked = true;

} else {

field.value = data[name];

}

});

});

}


/* =========================
   VERKRIJGERS FORM
========================= */

let formCount = 1;

const addBtn = document.getElementById("addFormBtn");
const submitBtn = document.getElementById("submitAllBtn");

if (addBtn) {
addBtn.addEventListener("click", addForm);
}

if (submitBtn) {
submitBtn.addEventListener("click", submitAll);
}


function addForm() {

const container = document.getElementById("forms-container");
const original = document.querySelector(".verkrijger");

if (!container || !original) return;

const clone = original.cloneNode(true);

formCount++;

clone.querySelectorAll("input").forEach(input => {

if (input.type === "radio") {

input.name = input.name + "_" + formCount;
input.checked = false;

} else {

input.value = "";

}

});

container.appendChild(clone);

}


function submitAll(){

const forms = document.querySelectorAll(".verkrijger");
const data = [];

forms.forEach(form => {

const inputs = form.querySelectorAll("input");

const obj = {};

inputs.forEach(input => {

if(input.type === "radio"){

if(input.checked){
obj[input.name] = input.value;
}

}else{

obj[input.name] = input.value;

}

});

data.push(obj);

});

localStorage.setItem("verkrijgers", JSON.stringify(data));

alert("Verkrijgers opgeslagen");

}