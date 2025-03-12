// SS2_CoreyS
// Title: Dynamic Circles
// Concept/Theme: Exploring dynamic shapes and interactivity with user input. This sketch ties into the theme of "User-Driven Art," where the user influences the drawing process through mouse and keyboard actions.
// Instructions: Press the mouse or any key to add more circles. Observe how the circles change over time as the user interacts.

let circleSize = 20;  // Variable to control circle size
let circleSpeed = 1;  // Variable to control speed of size change
let maxCircleSize = 100; // Maximum size of the circle

function setup() {
  createCanvas(600, 400);
  noStroke();
}

function draw() {
  background(255);

  // Calculate a new circle size that increases over time
  circleSize += circleSpeed;

  // Limit the circle size to prevent it from getting too large
  if (circleSize > maxCircleSize || circleSize < 10) {
    circleSpeed *= -1;  // Reverse the direction when size exceeds limits
  }

  // Draw circles at the mouse position and previous mouse position
  fill(100, 150, 255, 150);
  ellipse(mouseX, mouseY, circleSize, circleSize);  // Circle at current mouse position
  fill(255, 100, 100, 150);
  ellipse(pmouseX, pmouseY, circleSize * 0.8, circleSize * 0.8); // Circle at previous mouse position
}

// Event function for mousePressed() to increase the circle size temporarily
function mousePressed() {
  circleSize += 10;
  if (circleSize > maxCircleSize) {
    circleSize = maxCircleSize;  // Prevent exceeding max size
  }
}

// Event function for keyPressed() to decrease the circle size temporarily
function keyPressed() {
  circleSize -= 10;
  if (circleSize < 10) {
    circleSize = 10;  // Prevent circle size going below minimum size
  }
}
