let shellBtn = document.getElementById('shellBtn');
let shellDisplay = document.getElementById('display');

let upgrade = document.getElementById('upgrade');
let autoClicker = document.getElementById('autoClicker');

let jackpot = document.getElementById('jackpot');
let jackpotDisplay = document.getElementById('jackpotDiv');

let shells = 0;
let multi = 1;
let multiCost = 25;
let autoClickers = 0;
let autoClickerCost = 15;

let entryCost = 10;
let entries = 0;
let npcEntries = 0;

let jackpotCd = 30;
let jackpotTimeLeft = jackpotCd;

function displayShells() {
    shellDisplay.innerHTML = `You have ${shells} <img src="images/shell.png" alt="shell" width="15" height="15">`;
}

shellBtn.addEventListener("click", function(e) {
    shells += multi;
    displayShells();
})

upgrade.addEventListener("click", function(e) {
    if (shells >= multiCost) {
        shells -= multiCost;
        multi += 1;
        upgrade.innerHTML = `You have ${multi}x <img src="images/shell.png" alt="shell" width="10" height="10"> multiplier`;
        displayShells();
    } else {
        alert('Not enough shells!')
    }
})

autoClicker.addEventListener("click", function(e) {
    if (shells >= autoClickerCost) {
        shells -= autoClickerCost;
        autoClickers ++;
        autoClickerCost = Math.round(autoClickerCost * 1.25);
        autoClicker.innerHTML = `Upgrade autoclicker for ${autoClickerCost} <img src="images/shell.png" alt="shell" width="10" height="10">`;
        displayShells();
    } else {
        alert('Not enough shells!')
    }
})

function displayJackpot() {
    if (entries > 0) {
        if ((jackpotTimeLeft) > 0) {
            jackpotDisplay.innerHTML = `Time left until lottery ends: ${jackpotTimeLeft} days`;
        } else {
            jackpotDisplay.innerHTML = `Drawing winner...`;
        }
    } else {
        jackpotDisplay.innerHTML = `Enter the jackpot to start a lottery!`
    }
}

jackpot.addEventListener("click", function(e) {
    if (shells >= entryCost) {
        shells -= entryCost;
        entries ++;
        jackpot.innerHTML = `You have ${entries} <img src="images/shell.png" alt="shell" width="10" height="10"> entry!`;
        displayShells();
        displayJackpot();
    } else {
        alert('Not enough shells!')
    }
})

const autoInterval = setInterval(function() {
    if (autoClickers > 0) {
        shells += autoClickers;
        displayShells();
    }
}, 1000);

const jackpotInterval = setInterval(function() {
    if (entries > 0) {
        jackpotTimeLeft -= 1;
        displayJackpot();

        if (jackpotTimeLeft <= 0) {
            npcEntries += getRandomInt(entries * 5, entries * 10);
            winner = getRandomInt(entries, npcEntries);
            if (winner === entries){
                shells += npcEntries * entryCost;
            }

            entries = 0;
            npcEntries = 0;
            jackpotTimeLeft = jackpotCd;

            displayShells();
            displayJackpot();
        }
    } else {
        jackpotTimeLeft = jackpotCd;
        displayJackpot();
    }
}, 1000);

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}