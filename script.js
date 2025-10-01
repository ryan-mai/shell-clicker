let shellBtn = document.getElementById('shellBtn');
let shellDisplay = document.getElementById('display');

let upgrade = document.getElementById('upgrade');
let autoClicker = document.getElementById('autoClicker');

let shells = 0;
let multi = 1;
let multiCost = 25;
let autoClickers = 0;
let autoClickerCost = 15;

function displayShells() {
    shellDisplay.innerHTML = `You have ${shells} <img src="images/shell.png" alt="shell" width="15" height="15">`;
}

shellBtn.addEventListener("click", function(e) {
    shells += multi;
    displayShells();
})