// BSN https://jsfiddle.net/4m5fg/6/
var bsnNr1 = document.getElementById("bsnNr1"),
    bsnNr2 = document.getElementById("bsnNr2"),
    bsnNr3 = document.getElementById("bsnNr3");
    bsnNr4 = document.getElementById("bsnNr4"),
    bsnNr5 = document.getElementById("bsnNr5");
    bsnNr6 = document.getElementById("bsnNr6"),
    bsnNr7 = document.getElementById("bsnNr7");
    bsnNr8 = document.getElementById("bsnNr8"),
    bsnNr9 = document.getElementById("bsnNr9");

bsnNr1.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr2.focus();
    }
}

bsnNr2.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr3.focus();
    }
}

bsnNr3.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr4.focus();
    }
}

bsnNr4.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr5.focus();
    }
}

bsnNr5.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr6.focus();
    }
}

bsnNr6.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr7.focus();
    }
}

bsnNr7.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr8.focus();
    }
}

bsnNr8.onkeyup = function() {
    if (this.value.length === parseInt(this.attributes["maxlength"].value)) {
        bsnNr9.focus();
    }
}


// Save data on input
const form = document.querySelector('form');
form.addEventListener('input', () => {
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    localStorage.setItem('formData', JSON.stringify(formObj));
});

// Load data on page load
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            if (form.elements[key]) form.elements[key].value = data[key];
        });
    }
});


// const q3 = document.querySelector('.q1');
// const q4 = document.querySelector('.q2');

// if(q3.value='ja'){
//     console.log(q3.value);
//     q4.style.display="block";
// }else{
//     q4.style.display="none"
// }

function isValidBSN(bsn) {
  if (!/^\d{9}$/.test(bsn)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += (9 - i) * parseInt(bsn[i], 10);
  }
  return sum % 11 === 0;

  
}
