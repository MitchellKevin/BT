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
