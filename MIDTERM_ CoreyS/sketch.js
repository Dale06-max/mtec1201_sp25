// Midterm_CoreyS
// Theme: Night Sky
// This sketch represents a starry night sky with an image of a moon that changes position over time. 
// Instructions: The moon image moves across the canvas, and the background changes color every 5 seconds. 
// Press the mouse to change the moon's direction.
let shapeSize = 50;
let bgColor;
let shapeColor;
let circleSize = 20;
let circleSpeed = 1;
let maxCircleSize = 100;
let moonImg;
let moonX;
let moonY;
let lastChangeTime = 0;
let backgroundColor = [0, 0, 0]; // Night sky black background
let moonSpeedX = 1; // Moon's speed on X-axis
let moonSpeedY = 1; // Moon's speed on Y-axis
let moonDirectionX = 1; // 1 for right, -1 for left
let moonDirectionY = 1; // 1 for down, -1 for up

function preload() {
  // Load the moon image (place an image in your 'images' folder)
  moonImg = loadImage('images/moon.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(random(255), random(255), random(255));  // Random background color
  shapeColor = color(random(255), random(255), random(255));  // Random shape color
  moonX = width / 2;
  moonY = height / 2;
  noStroke();
}

function draw() {
  // Change background color every 5 seconds
  if (millis() - lastChangeTime > 5000) {
    backgroundColor = [random(100, 255), random(100, 255), random(100, 255)];
    lastChangeTime = millis();
  }

  // Apply the background color
  background(backgroundColor);

  // Draw dynamic circles at mouse positions
  circleSize += circleSpeed;
  if (circleSize > maxCircleSize || circleSize < 10) {
    circleSpeed *= -1;  // Reverse direction of circle size
  }
  fill(100, 150, 255, 150);
  ellipse(mouseX, mouseY, circleSize, circleSize);
  fill(255, 100, 100, 150);
  ellipse(pmouseX, pmouseY, circleSize * 0.8, circleSize * 0.8);

  // Draw random shapes based on mouse position and click events
  if (mouseIsPressed) {
    fill(shapeColor);
    ellipse(mouseX, mouseY, shapeSize, shapeSize);  // Circle when mouse is pressed
  } else if (mouseX > width / 2) {
    fill(shapeColor);
    rect(mouseX - shapeSize / 2, mouseY - shapeSize / 2, shapeSize, shapeSize);  // Rectangle
  } else {
    fill(shapeColor);
    triangle(mouseX - shapeSize / 2, mouseY + shapeSize / 2,
             mouseX + shapeSize / 2, mouseY + shapeSize / 2,
             mouseX, mouseY - shapeSize / 2);  // Triangle
  }

  // Draw the moon (it moves in different directions)
  image(moonImg, moonX, moonY, 100, 100);  // Moon image, size 100x100px

  // Move the moon in both X and Y directions based on the directions set
  moonX += moonSpeedX * moonDirectionX;
  moonY += moonSpeedY * moonDirectionY;

  // Reverse moon's direction if it hits canvas boundaries
  if (moonX >= width - 100 || moonX <= 0) {
    moonDirectionX *= -1;  // Reverse X direction when moon hits the canvas edges
  }
  if (moonY >= height - 100 || moonY <= 0) {
    moonDirectionY *= -1;  // Reverse Y direction when moon hits the canvas edges
  }

  // Display some text
  fill(255);  // White text
  textSize(32);
  text("Press any key or click to interact with the game!", 30, 30);
}

function keyPressed() {
  // Change colors when a key is pressed
  bgColor = color(random(255), random(255), random(255));  // Random background color
  shapeColor = color(random(255), random(255), random(255));  // Random shape color
  shapeSize = random(30, 100);  // Random size for shapes

  // Change moon direction randomly on key press
  moonDirectionX = random([-1, 1]);  // Randomize X direction (left or right)
  moonDirectionY = random([-1, 1]);  // Randomize Y direction (up or down)
}

function mousePressed() {
  // Increase circle size on mouse press
  circleSize += 10;
  if (circleSize > maxCircleSize) {
    circleSize = maxCircleSize;  // Prevent exceeding max size
  }

  // Change the direction of the moon based on mouse position
  moonDirectionX = mouseX > width / 2 ? 1 : -1; // Move right if mouse is on the right half, else move left
  moonDirectionY = mouseY > height / 2 ? 1 : -1; // Move down if mouse is on the bottom half, else move up
}

function mouseReleased() {
  // Decrease circle size when mouse is released
  circleSize -= 10;
  if (circleSize < 10) {
    circleSize = 10;  // Prevent circle size going below minimum size
  }
}
