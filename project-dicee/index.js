/**
 * Dicee Game - Improved Architecture with Error Handling
 * Generates random dice rolls and determines the winner
 */

// Original Solution:
/*
var randomNumber1 = Math.floor(Math.random() * 6) + 1; // 1-6
var randomDiceImage1 = "dice" + randomNumber1 + ".png"; // dice1.png - dice6.png
var randomImageSource1 = "images/" + randomDiceImage1;
document.querySelectorAll("img")[0].setAttribute("src", randomImageSource1);

var randomNumber2 = Math.floor(Math.random() * 6) + 1; // 1-6
var randomDiceImage2 = "dice" + randomNumber2 + ".png"; // dice1.png - dice6.png
var randomImageSource2 = "images/" + randomDiceImage2;
document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);
 */

// Game Configuration
const DICE_CONFIG = {
    MIN_VALUE: 1,
    MAX_VALUE: 6,
    IMAGE_PATH: "images/",
    IMAGE_EXTENSION: ".png"
};

// Game Messages
const GAME_MESSAGES = {
    PLAYER1_WINS: "🚩 Player 1 Wins!",
    PLAYER2_WINS: "Player 2 Wins! 🚩",
    DRAW: "😐 Draw! 😐",
    ERROR: "❌ Game Error - Please Refresh"
};

/**
 * Generates a random dice number between 1 and 6
 * @returns {number} Random number between 1-6
 */
function generateDiceRoll() {
    try {
        return Math.floor(Math.random() * DICE_CONFIG.MAX_VALUE) + DICE_CONFIG.MIN_VALUE;
    } catch (error) {
        console.error("Error generating dice roll:", error);
        return DICE_CONFIG.MIN_VALUE; // Fallback to 1
    }
}

/**
 * Creates the dice image source path
 * @param {number} diceNumber - The dice number (1-6)
 * @returns {string} Complete image source path
 */
function getDiceImageSource(diceNumber) {
    try {
        if (diceNumber < DICE_CONFIG.MIN_VALUE || diceNumber > DICE_CONFIG.MAX_VALUE) {
            throw new Error(`Invalid dice number: ${diceNumber}`);
        }
        
        const imageName = `dice${diceNumber}${DICE_CONFIG.IMAGE_EXTENSION}`;
        return `${DICE_CONFIG.IMAGE_PATH}${imageName}`;
    } catch (error) {
        console.error("Error creating dice image source:", error);
        return `${DICE_CONFIG.IMAGE_PATH}dice1${DICE_CONFIG.IMAGE_EXTENSION}`; // Fallback
    }
}

/**
 * Updates a dice image element with new source
 * @param {HTMLImageElement} imageElement - The image element to update
 * @param {number} diceNumber - The dice number to display
 * @returns {boolean} Success status
 */
function updateDiceImage(imageElement, diceNumber) {
    try {
        if (!imageElement) {
            throw new Error("Image element not found");
        }
        
        const imageSource = getDiceImageSource(diceNumber);
        imageElement.setAttribute("src", imageSource);
        imageElement.setAttribute("alt", `Dice showing ${diceNumber}`);
        return true;
    } catch (error) {
        console.error("Error updating dice image:", error);
        return false;
    }
}

/**
 * Determines and returns the winner message
 * @param {number} player1Roll - Player 1's dice roll
 * @param {number} player2Roll - Player 2's dice roll
 * @returns {string} Winner message
 */
function determineWinner(player1Roll, player2Roll) {
    try {
        if (player1Roll > player2Roll) {
            return GAME_MESSAGES.PLAYER1_WINS;
        } else if (player1Roll < player2Roll) {
            return GAME_MESSAGES.PLAYER2_WINS;
        } else {
            return GAME_MESSAGES.DRAW;
        }
    } catch (error) {
        console.error("Error determining winner:", error);
        return GAME_MESSAGES.ERROR;
    }
}

/**
 * Updates the game title with the result
 * @param {string} message - The message to display
 * @returns {boolean} Success status
 */
function updateGameTitle(message) {
    try {
        const titleElement = document.querySelector("h1");
        if (!titleElement) {
            throw new Error("Title element not found");
        }
        
        titleElement.innerHTML = message;
        return true;
    } catch (error) {
        console.error("Error updating game title:", error);
        return false;
    }
}

/**
 * Main game initialization function
 * Orchestrates the entire dice game flow
 */
function initializeDiceGame() {
    try {
        // Get all dice image elements
        const diceImages = document.querySelectorAll("img");
        
        if (diceImages.length < 2) {
            throw new Error("Not enough dice images found in DOM");
        }
        
        // Generate random rolls for both players
        const player1Roll = generateDiceRoll();
        const player2Roll = generateDiceRoll();
        
        console.log(`Game Round: Player 1 rolled ${player1Roll}, Player 2 rolled ${player2Roll}`);
        
        // Update dice images
        const player1Success = updateDiceImage(diceImages[0], player1Roll);
        const player2Success = updateDiceImage(diceImages[1], player2Roll);
        
        if (!player1Success || !player2Success) {
            throw new Error("Failed to update dice images");
        }
        
        // Determine winner and update title
        const winnerMessage = determineWinner(player1Roll, player2Roll);
        const titleSuccess = updateGameTitle(winnerMessage);
        
        if (!titleSuccess) {
            throw new Error("Failed to update game title");
        }
        
        console.log("Game initialized successfully:", winnerMessage);
        
    } catch (error) {
        console.error("Critical error initializing dice game:", error);
        
        // Attempt to show error message to user
        try {
            updateGameTitle(GAME_MESSAGES.ERROR);
        } catch (titleError) {
            console.error("Could not even update error message:", titleError);
        }
    }
}

/**
 * DOM Content Loaded Event Handler
 * Ensures the DOM is fully loaded before initializing the game
 */
function handleDOMContentLoaded() {
    console.log("DOM loaded, initializing dice game...");
    initializeDiceGame();
}

// Initialize game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
} else {
    // DOM is already loaded
    handleDOMContentLoaded();
}
