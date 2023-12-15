// Your JavaScript code

let money = 0;
let upgradeLevel = 1;
let upgradeCost = 2;
let autoClickers = 0;
let autoClickerCost = 10;
let autoClickerInterval;

const clickerCircle = document.getElementById('clicker-circle');
const moneyDisplay = document.getElementById('money');
const upgradeBtn = document.getElementById('upgrade-btn');
const upgradeLevelDisplay = document.getElementById('upgrade-level');
const shopBtn = document.getElementById('shop-btn');
const shopMenu = document.getElementById('shop-menu');
const buyAutoClickerBtn = document.getElementById('buy-auto-clicker-btn');

// Load saved data when the page is loaded
window.addEventListener('load', () => {
    loadGame();
});

clickerCircle.addEventListener('click', () => {
    money += upgradeLevel; // Increase money based on the upgrade level
    moneyDisplay.textContent = money;
    saveGame(); // Save the game data
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
        saveGame(); // Save the game data
    } else {
        alert("Not enough money to upgrade!");
    }
});

shopBtn.addEventListener('click', () => {
    shopMenu.style.display = 'block';
});

buyAutoClickerBtn.addEventListener('click', () => {
    if (money >= autoClickerCost) {
        money -= autoClickerCost;
        autoClickers += 1;
        autoClickerCost = Math.ceil(autoClickerCost * 1.2); // Increase cost by 20% (adjust as needed)

        // Start the auto-clicker interval if not already running
        if (!autoClickerInterval) {
            autoClickerInterval = setInterval(() => {
                money += autoClickers;
                moneyDisplay.textContent = money;
            }, 1000); // 1000 milliseconds = 1 second
        }

        // Update displays
        moneyDisplay.textContent = money;
        updateAutoClickerCostDisplay();
        saveGame(); // Save the game data
    } else {
        alert("Not enough money to buy auto-clicker!");
    }
});

function updateUpgradeCostDisplay() {
    upgradeBtn.textContent = `Upgrade Clicker ($${upgradeCost})`;
}

function updateAutoClickerCostDisplay() {
    buyAutoClickerBtn.textContent = `Buy AutoClicker ($${autoClickerCost})`;
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

function saveGame() {
    document.cookie = `money=${money}; expires=${new Date(Date.now() + 31536000000).toUTCString()}`; // 1 year expiration
    document.cookie = `upgradeLevel=${upgradeLevel}`;
    document.cookie = `autoClickers=${autoClickers}`;
}

function loadGame() {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        switch (name) {
            case 'money':
                money = parseInt(value) || 0;
                break;
            case 'upgradeLevel':
                upgradeLevel = parseInt(value) || 1;
                break;
            case 'autoClickers':
                autoClickers = parseInt(value) || 0;
                break;
        }
    }

    // Update displays
    moneyDisplay.textContent = money;
    upgradeLevelDisplay.textContent = upgradeLevel;
    updateUpgradeCostDisplay();
    updateAutoClickerCostDisplay();
}

createSnowflakes();
