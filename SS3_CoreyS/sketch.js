// Author: [Your Name]
// Title: Reactive Patterns
// Description: This sketch creates a dynamic and random set of patterns that respond to mouse movements and keyboard inputs. 
// The random colors and shapes are triggered using conditional statements and mouse interactions to create an engaging experience.
// User Instructions: Move your mouse across the canvas and press any key to change the shape and colors.

// Declare variables
let shapeSize = 50;
let bgColor;
let shapeColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(random(255), random(255), random(255)); // Random background color
  shapeColor = color(random(255), random(255), random(255)); // Random initial shape color
  noStroke();
}

function draw() {
  background(bgColor);

  // If mouse is pressed, draw a circle
  if (mouseIsPressed) {
    fill(shapeColor);
    ellipse(mouseX, mouseY, shapeSize, shapeSize);
  } 
  // Else if mouse is not pressed, draw a rectangle
  else if (mouseX > width / 2) {
    fill(shapeColor);
    rect(mouseX - shapeSize / 2, mouseY - shapeSize / 2, shapeSize, shapeSize);
  } 
  // Else, draw a triangle
  else {
    fill(shapeColor);
    triangle(mouseX - shapeSize / 2, mouseY + shapeSize / 2, 
             mouseX + shapeSize / 2, mouseY + shapeSize / 2, 
             mouseX, mouseY - shapeSize / 2);
  }
}

// Change colors when a key is pressed
function keyPressed() {
  bgColor = color(random(255), random(255), random(255)); // Random background color
  shapeColor = color(random(255), random(255), random(255)); // Random shape color
  shapeSize = random(30, 100); // Random size for the shape
}
