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
const autoClickerCountDisplay = document.getElementById('auto-clicker-count');

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
        updateAutoClickerDisplay(); // Update the display for auto-clickers
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

function updateAutoClickerDisplay() {
    autoClickerCountDisplay.textContent = autoClickers;
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
    // Save relevant game data to localStorage
    localStorage.setItem('money', money);
    localStorage.setItem('upgradeLevel', upgradeLevel);
    localStorage.setItem('autoClickers', autoClickers);
}

function loadGame() {
    // Load relevant game data from localStorage
    const savedMoney = localStorage.getItem('money');
    const savedUpgradeLevel = localStorage.getItem('upgradeLevel');
    const savedAutoClickers = localStorage.getItem('autoClickers');

    if (savedMoney !== null) {
        money = parseInt(savedMoney);
        moneyDisplay.textContent = money;
    }

    if (savedUpgradeLevel !== null) {
        upgradeLevel = parseInt(savedUpgradeLevel);
        upgradeLevelDisplay.textContent = upgradeLevel;
        updateUpgradeCostDisplay();
    }

    if (savedAutoClickers !== null) {
        autoClickers = parseInt(savedAutoClickers);
        updateAutoClickerDisplay();
    }
}

function closeShop() {
    shopMenu.style.display = 'none';
}

createSnowflakes();
