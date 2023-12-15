// Your JavaScript code

let money = 0;
let upgradeLevel = 1;
let upgradeCost = 2;

const clickerCircle = document.getElementById('clicker-circle');
const moneyDisplay = document.getElementById('money');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeLevelDisplay = document.getElementById('upgrade-level');

// Load saved data on page load
window.addEventListener('load', () => {
    loadGame();
});

// Save game data to localStorage
function saveGame() {
    const gameData = {
        money,
        upgradeLevel,
        upgradeCost
        // Add more properties if needed
    };

    localStorage.setItem('moneyClickerGameData', JSON.stringify(gameData));
}

// Load game data from localStorage
function loadGame() {
    const savedData = localStorage.getItem('moneyClickerGameData');

    if (savedData) {
        const parsedData = JSON.parse(savedData);

        money = parsedData.money;
        upgradeLevel = parsedData.upgradeLevel;
        upgradeCost = parsedData.upgradeCost;

        // Update displays with loaded data
        moneyDisplay.textContent = money;
        upgradeLevelDisplay.textContent = upgradeLevel;
        updateUpgradeCostDisplay();
    }
}

// Add a function to reset the game
function resetGame() {
    localStorage.removeItem('moneyClickerGameData');
    money = 0;
    upgradeLevel = 1;
    upgradeCost = 2;
    moneyDisplay.textContent = money;
    upgradeLevelDisplay.textContent = upgradeLevel;
    updateUpgradeCostDisplay();
}

// Clicker circle event listener
clickerCircle.addEventListener('click', () => {
    money += upgradeLevel;
    moneyDisplay.textContent = money;
    saveGame(); // Save game data after each click
});

// Upgrade button event listener
upgradeBtn.addEventListener('click', () => {
    if (money >= upgradeCost) {
        money -= upgradeCost;
        upgradeLevel += 1;
        upgradeCost = Math.ceil(upgradeCost * 1.1);
        moneyDisplay.textContent = money;
        upgradeLevelDisplay.textContent = upgradeLevel;
        updateUpgradeCostDisplay();
        saveGame(); // Save game data after upgrading
    } else {
        alert("Not enough money to upgrade!");
    }
});

// Function to update upgrade cost display
function updateUpgradeCostDisplay() {
    upgradeBtn.textContent = `Upgrade Clicker ($${upgradeCost})`;
}

// Function to create snowflakes
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
