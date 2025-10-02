const shellBtn = document.getElementById('shellBtn');
const shellDisplay = document.getElementById('display');

const upgrade = document.getElementById('upgrade');
const multiplierBtn = document.getElementById('buyMultiplier');
const multiplierIcon = document.getElementById('multiplierCount')

const autoClicker = document.getElementById('autoClicker');
const buyAutoClickerBtn = document.getElementById('buyAutoClicker');

const jackpot = document.getElementById('jackpot');
const jackpotDisplay = document.getElementById('jackpotDiv');
const jackpotIcon = document.getElementById('jackpotBadge');

const critProgressBar = document.getElementById('critProgressBar');
const cd = document.getElementById('cd');

const toastTrigger = document.getElementById('liveToastBtn');
const toastLiveExample = document.getElementById('liveToast');
let toastBootstrap = null;

if (toastLiveExample) {
  toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
}

if (toastTrigger && toastBootstrap) {
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show();
  });
}

let shells = 0;
let multi = 1;
let multiCost = 15;
let autoClickers = 0;
let autoClickerCost = 67;

let entryCost = 10;
let entries = 0;
let npcEntries = 0;

let jackpotCd = 30;
let jackpotTimeLeft = jackpotCd;

function update() {
    console.log('update()', { shells, multiCost, autoClickerCost, entryCost });
    if (multiplierBtn) {
        multiplierBtn.disabled = shells < multiCost;
        console.log('multiplierBtn.disabled =', multiplierBtn.disabled);
    }
    if (buyAutoClickerBtn) buyAutoClickerBtn.disabled = shells < autoClickerCost;
    if (jackpot) jackpot.disabled = shells < entryCost;
}

update();

const critEvery = getRandomInt(6,7);
const critBonusMultiplier = 2;
let clickCount = 0;

function updateCritProgress() {
  if (!critProgressBar) return;
  const mod = clickCount % critEvery;
  const progress = mod === 0 && clickCount > 0 ? 100 : (mod / critEvery) * 100;
  critProgressBar.style.width = `${progress}%`;
  const container = critProgressBar.parentElement;
  if (container) container.setAttribute('aria-valuenow', Math.round(progress));
}

updateCritProgress();


function displayShells() {
    if (!shellDisplay) return;
    shellDisplay.innerHTML = `You have ${shells} <img src="images/shell.png" alt="shell" width="15" height="15">`;
}


if (multiplierBtn) {
    multiplierBtn.addEventListener("click", function(e) {
        if (shells >= multiCost) {
            shells -= multiCost;

            if (multiplierIcon) multiplierIcon.textContent = `${multi}`;
            multiCost = Math.round(multiCost * 1.25);
            multi += 1;
            multiplierBtn.innerHTML = `Buy for <img src="images/shell.png" alt="shell" width="15" height="15"> ${multiCost} shells!`;
            
            displayShells();
            update();
        } else {
            console.log("Not enough!")
        }
    })
}

if (shellBtn) shellBtn.addEventListener("click", function(e) {
    clickCount += 1;
    let gain = multi;

    if (clickCount % critEvery === 0) {
        gain += multi * critBonusMultiplier;
    }

    shells += gain;
    displayShells();
    updateCritProgress();
    update();
})

if (buyAutoClickerBtn) {
    buyAutoClickerBtn.addEventListener("click", function(e) {
        if (shells >= autoClickerCost) {
            shells -= autoClickerCost;
            autoClickers ++;
            autoClickerCost = Math.round(autoClickerCost * 1.25);
            autoClicker.innerHTML = `Upgrade autoclicker for ${autoClickerCost} <img src="images/shell.png" alt="shell" width="10" height="10">`;
            displayShells();
            update();
        } else {
            console.log("Not enough shells!")
        }
    })
}
function displayJackpot() {
    const jackpotInterval = setInterval(function() {
        if (entries > 0) {
            jackpotTimeLeft -= 1;
            displayJackpot();
    
            if (jackpotTimeLeft <= 0) {
                npcEntries += getRandomInt(entries * 5, entries * 10);
                const winner = getRandomInt(entries, npcEntries);
                if (winner === entries){
                    shells += npcEntries * entryCost;
                }
    
                entries = 0;
                npcEntries = 0;
                jackpotTimeLeft = jackpotCd;
    
                displayShells();
                displayJackpot();
                update();
    
                if (toastBootstrap && toastLiveExample) {
                  const body = toastLiveExample.querySelector('.toast-body');
                  if (body) body.textContent = 'Lottery finished — winner drawn!';
                  toastBootstrap.show();
                }
            }
        } else {
            jackpotTimeLeft = jackpotCd;
            displayJackpot();
        }
    }, 1000);
    if (cd) {
        cd.textContent = entries > 0
            ? (jackpotTimeLeft > 0 ? `${jackpotTimeLeft} secs left` : `Drawing...`)
            : `${jackpotCd} secs`;
    }

    if (!jackpotDisplay) return;
    if (entries > 0) {
        if (jackpotTimeLeft > 0) {
            jackpotDisplay.innerHTML = `Time left until lottery ends: ${jackpotTimeLeft} secs`;
        } else {
            jackpotDisplay.innerHTML = `Drawing winner...`;
        }
    } else {
        jackpotDisplay.innerHTML = `Enter the jackpot to start a lottery!`;
    }
}

if (jackpot) jackpot.addEventListener("click", function(e) {
    if (shells >= entryCost) {
        shells -= entryCost;
        entries ++;
        if (jackpotIcon) jackpotIcon.innerHTML = `${entries}`;
        displayShells();
        displayJackpot();
        update();
        if (entries === 1 && toastBootstrap) {
          toastBootstrap.show();
        }
    } else {
        console.log('Not enough shells!')
    }
})

const autoInterval = setInterval(function() {
    if (autoClickers > 0) {
        shells += autoClickers;
        displayShells();
        update();
    }
}, 1000);

const jackpotInterval = setInterval(function() {
    if (entries > 0) {
        jackpotTimeLeft -= 1;
        displayJackpot();

        if (jackpotTimeLeft <= 0) {
            npcEntries += getRandomInt(entries * 5, entries * 10);
            const winner = getRandomInt(entries, npcEntries);
            if (winner === entries){
                shells += npcEntries * entryCost;
            }

            entries = 0;
            npcEntries = 0;
            jackpotTimeLeft = jackpotCd;

            displayShells();
            displayJackpot();
            update();

            // Show the toast again when the winner has been drawn
            if (toastBootstrap && toastLiveExample) {
                const body = toastLiveExample.querySelector('.toast-body');
                if (body) body.textContent = 'Lottery finished — winner drawn!';
                toastBootstrap.show();
            }

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

displayShells();
displayJackpot();
updateCritProgress();
update();