// Your JavaScript code
let money = 0;
let upgradeLevel = 1;
let upgradeCost = 2;

const clickerCircle = document.getElementById('clicker-circle');
const moneyDisplay = document.getElementById('money');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeLevelDisplay = document.getElementById('upgrade-level');

clickerCircle.addEventListener('click', () => {
    money += upgradeLevel; // Increase money based on the upgrade level
    moneyDisplay.textContent = money;
});

upgradeBtn.addEventListener('click', () => {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        upgradeLevel += 1;
        upgradeCost = Math.ceil(upgradeCost * 1.1); // Increase cost by 10% (adjust as needed)

        // Update displays
        moneyDisplay.textContent = money;
        upgradeLevelDisplay.textContent = upgradeLevel;
        updateUpgradeCostDisplay();
    } else {
        alert("Not enough money to upgrade!");
    }
});

function updateUpgradeCostDisplay() {
    upgradeBtn.textContent = `Upgrade Clicker ($${upgradeCost})`;
}

function createSnowflakes() {
    const snowflakesContainer = document.querySelector('.snowflakes');

    for (let i = 0; i < 20; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 2 + 3}s`;
        snowflakesContainer.appendChild(snowflake);
    }
}

createSnowflakes();
