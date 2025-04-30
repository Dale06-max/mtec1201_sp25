// Midterm_V2_CoreyS
// Theme: Night Sky
// This sketch represents a starry night sky with an image of a moon that changes position over time. 
// Instructions: The moon image moves across the canvas, and the background changes color every 5 seconds. 
// Press the mouse to change the moon's direction.
let shapeSize = 50;
let shapeColor;
let circleSize = 20;
let circleSpeed = 1;
let maxCircleSize = 100;
let moonImg;
let moonX;
let moonY;
let starArray = []; // Array to hold star positions
let showStars = false; // Flag to toggle stars
let moonSpeedX = 1; // Moon's speed on X-axis
let moonSpeedY = 1; // Moon's speed on Y-axis
let moonDirectionX = 1; // 1 for right, -1 for left
let moonDirectionY = 1; // 1 for down, -1 for up
let rocketImg;
let rocketTrail = []; // Array to hold rocket trail positions

function preload() {
  // Load the moon and rocket image (place images in your 'images' folder)
  moonImg = loadImage('images/moon.png');
  rocketImg = loadImage('images/rocket.png');  // Add your rocket image path here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shapeColor = color(random(255), random(255), random(255));  // Random shape color
  moonX = width / 2;
  moonY = height / 2;
  noStroke();
}

function draw() {
  // Keep background black
  background(0); // Night sky black background

  // If "showStars" is true, draw stars
  if (showStars) {
    drawStars();
  }

  // Draw rocket trail (smoke or fire behind the rocket)
  for (let i = 0; i < rocketTrail.length; i++) {
    let trail = rocketTrail[i];
    fill(255, 100, 0, 150);  // Rocket trail color (orange/yellow)
    noStroke();
    ellipse(trail.x, trail.y, trail.size, trail.size);  // Draw trail
  }

  // Add new trail behind the rocket
  if (rocketTrail.length > 10) {
    rocketTrail.shift();  // Remove the oldest trail if there are more than 10
  }
  rocketTrail.push({ x: mouseX, y: mouseY, size: random(5, 15) });  // Add new trail position

  // Draw the rocket at mouse position
  image(rocketImg, mouseX - rocketImg.width / 2, mouseY - rocketImg.height / 2);  // Rocket image

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
  text("Press 'S' to show stars, or click to interact with the game!", 30, 30);
}

function keyPressed() {
  if (key === 'S' || key === 's') {
    // Toggle the star display when "S" is pressed
    showStars = !showStars;
    if (showStars) {
      generateStars(); // Generate new stars when enabling star display
    }
  }

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

function generateStars() {
  // Generate a random number of stars (between 50 and 200)
  let numStars = int(random(50, 200));
  starArray = []; // Clear previous stars

  for (let i = 0; i < numStars; i++) {
    let star = {
      x: random(width),
      y: random(height),
      size: random(2, 5), // Random size for each star
      brightness: random(150, 255) // Random brightness
    };
    starArray.push(star);
  }
}

function drawStars() {
  // Draw all stars in the array
  for (let i = 0; i < starArray.length; i++) {
    let star = starArray[i];
    fill(star.brightness);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }
}
