// SS4_CoreyS
// Theme: Night Sky
// This sketch represents a starry night sky with an image of a moon that changes position over time. 
// Instructions: The moon image moves across the canvas, and the background changes color every 5 seconds. 
// Press the mouse to change the moon's direction.

let moonImg;
let moonX;
let moonY;
let lastChangeTime = 0;
let backgroundColor = [0, 0, 0]; // Black background (night sky)

function preload() {
  // Load the image of the moon
  moonImg = loadImage('images/moon.jpg'); 
}

function setup() {
  createCanvas(800,600);
  moonX = width / 2;
  moonY = height / 2;
}

function draw() {
  // Change background color every 5 seconds (5000 milliseconds)
  if (millis() - lastChangeTime > 5000) {
    // Change the background color randomly every 5 seconds
    backgroundColor = [random(100, 255), random(100, 255), random(100, 255)];
    lastChangeTime = millis();
  }

  // Apply the background color
  background(backgroundColor);

  // Draw the moon
  image(moonImg, moonX, moonY, 100, 100); // Moon image, size 100x100px

  // Display some text
  fill(255); // White text
  textSize(32);
  text("Press the mouse to change the moon's direction", 30, 30);

  // Move the moon across the canvas horizontally with conditional statement
  if (moonX < width) {
    moonX += 1; // Move right
  } else {
    moonX = 0; // Reset moon position if it goes off screen
  }
}

function mousePressed() {
  // Change the direction of the moon when the mouse is pressed
  moonX = width - mouseX; // Inverse the direction based on mouse position
}

