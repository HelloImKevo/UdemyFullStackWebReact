// Select all drum buttons
const drumButtons = document.querySelectorAll(".drum");

// Add click event listeners to each drum button
for (let i = 0; i < drumButtons.length; i++) {
  drumButtons[i].addEventListener("click", function() {
    // Get the button's innerHTML to determine which sound to play
    const buttonInnerHTML = this.innerHTML;
    
    // Play the corresponding sound
    playSound(buttonInnerHTML);
    
    // Add animation to the button
    buttonAnimation(buttonInnerHTML);
  });
}

// Function to play the appropriate sound based on the button
function playSound(key) {
  switch (key) {
    case "w":
      const tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;
      
    case "a":
      const tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;
      
    case "s":
      const tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;
      
    case "d":
      const tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;
      
    case "j":
      const snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;
      
    case "k":
      const crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;
      
    case "l":
      const kickBass = new Audio("sounds/kick-bass.mp3");
      kickBass.play();
      break;
      
    default:
      console.log(key);
  }
}

// Function to add button press animation
function buttonAnimation(currentKey) {
  // Select the active button
  const activeButton = document.querySelector("." + currentKey);
  
  // Add the "pressed" class to the button
  activeButton.classList.add("pressed");
  
  // Remove the "pressed" class after a short delay
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}
