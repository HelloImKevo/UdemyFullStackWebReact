// Game state variables
let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;

// Start the game when a key is pressed
$(document).keydown(function(event) {
  // Only start the game if it hasn't been started yet
  if (!started) {
    // If the key pressed is "A"
    if (event.key.toLowerCase() === "a") {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  }
});

// Handle button clicks
$(".btn").click(function() {
  // Only allow clicks if the game has started
  if (started) {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    // Check the answer after each click
    checkAnswer(userClickedPattern.length - 1);
  }
});

/**
 * Generate the next color in the sequence and show it to the player
 */
function nextSequence() {
  // Reset user's clicked pattern
  userClickedPattern = [];
  
  // Increase the level
  level++;
  
  // Update the level title
  $("#level-title").text("Level " + level);
  
  // Generate a random number between 0 and 3
  let randomNumber = Math.floor(Math.random() * 4);
  
  // Use that to select a random color
  let randomChosenColor = buttonColors[randomNumber];
  
  // Add the new color to the game pattern
  gamePattern.push(randomChosenColor);
  
  // Animate and play sound for each color in the pattern
  animateSequence(0);
}

/**
 * Recursively animate through the entire game pattern sequence
 */
function animateSequence(index) {
  if (index < gamePattern.length) {
    // Flash the button
    $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // Play the sound
    playSound(gamePattern[index]);
    
    // Schedule the next animation after a delay
    setTimeout(function() {
      animateSequence(index + 1);
    }, 600);
  }
}

/**
 * Play the sound associated with a color
 */
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/**
 * Animate the button press effect
 */
function animatePress(currentColor) {
  // Add the "pressed" class
  $("#" + currentColor).addClass("pressed");
  
  // Remove the "pressed" class after 100ms
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/**
 * Check if the user's answer matches the game pattern
 */
function checkAnswer(currentLevel) {
  // Check if the most recent button clicked matches the corresponding color in game pattern
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    
    // Check if the user has finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // Wait 1 second before showing the next sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play the wrong sound
    playSound("wrong");
    
    // Flash the background
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    
    // Update the title
    $("#level-title").text("Game Over, Press A Key to Restart");
    
    // Restart the game
    startOver();
  }
}

/**
 * Reset the game state to start over
 */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
