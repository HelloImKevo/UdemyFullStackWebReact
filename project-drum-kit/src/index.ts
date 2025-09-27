/**
 * Types for the Drum Kit application
 */

// Define valid drum keys
type DrumKey = 'w' | 'a' | 's' | 'd' | 'j' | 'k' | 'l';

// Sound mapping for each drum key
interface SoundMap {
  [key: string]: string;
}

// The sound files for each drum key
const SOUND_FILES: SoundMap = {
  'w': 'sounds/tom-1.mp3',
  'a': 'sounds/tom-2.mp3',
  's': 'sounds/tom-3.mp3',
  'd': 'sounds/tom-4.mp3',
  'j': 'sounds/snare.mp3',
  'k': 'sounds/crash.mp3',
  'l': 'sounds/kick-bass.mp3'
};

// Valid drum keys as a string for quick checking
const VALID_KEYS: string = Object.keys(SOUND_FILES).join('');

/**
 * Main application logic
 */

// Select all drum buttons
const drumButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.drum');

// Add click event listeners to each drum button
for (let i = 0; i < drumButtons.length; i++) {
  drumButtons[i].addEventListener('click', function(this: HTMLButtonElement) {
    // Get the button's innerHTML to determine which sound to play
    const buttonInnerHTML = this.innerHTML;
    
    // Play the corresponding sound
    playSound(buttonInnerHTML as DrumKey);
    
    // Add animation to the button
    buttonAnimation(buttonInnerHTML as DrumKey);
  });
}

// Add keyboard event listener to the entire document
document.addEventListener('keydown', (event: KeyboardEvent) => {
  // Get the key pressed
  const keyPressed = event.key.toLowerCase();
  
  // Check if the key pressed is one of our drum buttons
  if (VALID_KEYS.includes(keyPressed)) {
    // Play the corresponding sound
    playSound(keyPressed as DrumKey);
    
    // Add animation to the button
    buttonAnimation(keyPressed as DrumKey);
  }
});

/**
 * Plays the sound associated with the given key
 * @param key - The drum key to play sound for
 */
function playSound(key: DrumKey): void {
  const soundFile = SOUND_FILES[key];
  
  if (soundFile) {
    const audio = new Audio(soundFile);
    audio.play().catch(error => {
      console.error(`Failed to play sound for key ${key}:`, error);
    });
  } else {
    console.log(`No sound file found for key: ${key}`);
  }
}

/**
 * Adds an animation to the button associated with the given key
 * @param currentKey - The key whose button should be animated
 */
function buttonAnimation(currentKey: DrumKey): void {
  // Select the active button
  const activeButton = document.querySelector(`.${currentKey}`);
  
  if (activeButton) {
    // Add the "pressed" class to the button
    activeButton.classList.add('pressed');
    
    // Remove the "pressed" class after a short delay
    setTimeout(() => {
      activeButton.classList.remove('pressed');
    }, 100);
  }
}