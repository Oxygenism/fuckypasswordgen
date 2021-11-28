const DEFAULT_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const CAPITALIZED_DEFAULT_LETTERS = DEFAULT_LETTERS.toUpperCase();
const NUMBERS = '0123456790';
const REGULAR_SYMBOLS = '!@#$%^&*?'
const FUCKIER_SYMBOLS = '()[]=-+_-><~`:';
const FUCKIEST_SYMBOLS = ',.;\'"{}|/'

let passwordLength = 22;
let enabledItems = {
    "default": document.getElementById("default").checked,
    "capitalized": document.getElementById("capitalized").checked,
    "numbers": document.getElementById("numbers").checked,
    "normal-symbols": document.getElementById("normal-symbols").checked,
    "fuckier-symbols": document.getElementById("fuckier-symbols").checked,
    "fuckiest-symbols": document.getElementById("fuckiest-symbols").checked,
}

$(document).ready(function () {
    let slider = document.getElementById("passwordLength");
    let output = document.getElementById("passwordLengthOutput");
    passwordLength = slider.value;
    output.innerHTML = passwordLength;

    slider.oninput = function() {
        passwordLength = this.value;
        output.innerHTML = passwordLength;
    }
});

$(".container").on("input", "input", function () {
    enabledItems[this.id] = this.checked;
    regenerate();
});

$(".button").on("click", function () {
    regenerate();
});

function getAllEnabledChars() {
    let characters = '';

    if (enabledItems['default']) {
        characters += DEFAULT_LETTERS;
    }

    if (enabledItems['capitalized']) {
        characters += CAPITALIZED_DEFAULT_LETTERS;
    }

    if (enabledItems['numbers']) {
        characters += NUMBERS;
    }

    if (enabledItems['normal-symbols']) {
        characters += REGULAR_SYMBOLS;
    }

    if (enabledItems['fuckier-symbols']) {
        characters += FUCKIER_SYMBOLS;
    }

    if (enabledItems['fuckiest-symbols']) {
        characters += FUCKIEST_SYMBOLS;
    }

    return characters;
}

function generatePassword() {
    let result           = '';
    let characters       = getAllEnabledChars();
    let charactersLength = characters.length;
    for ( let i = 0; i < passwordLength; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }

    return result;
}

function regenerate() {
    let result = generatePassword();
    $('.password-gen-box').val(result);
}

regenerate();