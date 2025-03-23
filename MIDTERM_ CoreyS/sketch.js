// Your Name: Corey Spitzer
// Title: Interactive Visual Experience
// Instructions: 
// Use the navigation menu at the top to switch between three different interactive experiences.
// 1. Interact with the dynamic circle that changes size and color based on mouse position.
// 2. Observe the starry night sky with a moving moon. Press the spacebar to change its movement type and make it move up.
// 3. Interact with basic shapes: a circle, rectangle, and line, each with varying properties.

let currentScene = 0; // Keeps track of the current scene

// Variables for dynamic circle (Code 2)
let circleX = 100, circleY = 100, circleSize = 50, circleColor;
let targetSize = circleSize, targetX = circleX, targetY = circleY;
let sizeIncrement = 2, smoothingFactor = 0.1;

// Variables for moving moon (Code 3)
let moonImg;
let moonX, moonY;
let moonSpeed = 1; // Speed of the moon's horizontal movement
let moonAngle = 0; // Initial angle for rotating the moon
let lastChangeTime = 0;
let backgroundColor = [0, 0, 0]; // Black background (night sky)
let movementType = 0; // Tracks the movement type of the moon (0: smooth, 1: bouncing)
let moonDirection = 1; // Direction for the bouncing movement
let moonVerticalSpeed = 1; // Speed for vertical movement (upward or downward)
let moonVerticalDirection = 1; // Direction for vertical movement

// Variables for shapes (Code 1)
let numberPrimitive = 50;
let stringPrimitive = 'blue';
let booleanPrimitive = true;

// Setup function to load moon image and initial canvas setup
function preload() {
  moonImg = loadImage('images/moon.jpg'); // Ensure you have this image in your "images" folder
}

function setup() {
  createCanvas(800, 600);
  circleColor = color(255, 0, 0); // Initial red color for the circle
  moonX = width / 2;
  moonY = height / 2;
  createMenu(); // Create navigation menu
}

// Draw function, used to update visuals for all scenes
function draw() {
  if (currentScene === 0) {
    background(220); // Neutral background for dynamic circle
    drawCircleScene();
  } else if (currentScene === 1) {
    // Change background color every 5 seconds
    if (millis() - lastChangeTime > 5000) {
      backgroundColor = [random(100, 255), random(100, 255), random(100, 255)];
      lastChangeTime = millis();
    }

    background(backgroundColor); // Apply dynamic background color in moon scene
    drawMoonScene();
  } else if (currentScene === 2) {
    background(220); // Neutral background for shapes
    drawShapeScene();
  }
}

// Scene 1: Interactive Circle (Code 2)
function drawCircleScene() {
  targetSize = map(mouseX, 0, width, 20, 150); // Map mouseX to control size range between 20 and 150
  circleSize += (targetSize - circleSize) * 0.05;

  targetX = mouseX;
  targetY = mouseY;
  circleX += (targetX - circleX) * smoothingFactor;
  circleY += (targetY - circleY) * smoothingFactor;

  let red = map(mouseX, 0, width, 0, 255);
  let green = map(mouseY, 0, height, 0, 255);
  let blue = (sin(frameCount * 0.05) + 1) * 127; // Sine function for smooth oscillation
  circleColor = color(red, green, blue);

  fill(circleColor);
  ellipse(circleX, circleY, circleSize, circleSize);
}

// Scene 2: Night Sky with Moon (Code 3)
function drawMoonScene() {
  // Apply rotation to the moon based on the current angle
  push();
  translate(moonX + 50, moonY + 50); // Move the origin to the moon's center
  rotate(moonAngle); // Rotate the moon
  image(moonImg, -50, -50, 100, 100); // Draw the moon centered at the origin
  pop();

  // Text displayed a quarter way down the screen
  fill(255); // White text
  textSize(32);
  text("Press the spacebar to change the moon's movement type", 30, height / 4); // Text a quarter way down the canvas

  // Movement logic for the moon
  if (movementType === 0) {
    // Smooth horizontal movement (to the right until it reaches the edge)
    moonX += moonSpeed;
    moonY += moonVerticalSpeed * moonVerticalDirection; // Add vertical movement

    if (moonX > width) {
      moonX = -100; // Reset the moon to the left side if it goes off-screen
    }

    // Moon vertical boundary conditions (up and down)
    if (moonY > height - 100 || moonY < 0) {
      moonVerticalDirection *= -1; // Reverse vertical direction when it hits top/bottom
    }
  } else if (movementType === 1) {
    // Bouncing movement (left and right)
    moonX += moonSpeed * moonDirection;
    moonY += moonVerticalSpeed * moonVerticalDirection;

    if (moonX > width - 100 || moonX < 0) {
      moonDirection *= -1; // Reverse horizontal direction when the moon hits the boundaries
    }

    // Moon vertical boundary conditions (up and down)
    if (moonY > height - 100 || moonY < 0) {
      moonVerticalDirection *= -1; // Reverse vertical direction
    }
  }

  // Increase the rotation angle of the moon
  moonAngle += 0.01;
}

// Scene 3: Basic Shapes (Code 1)
function drawShapeScene() {
  if (booleanPrimitive) {
    strokeWeight(numberPrimitive); // Set stroke weight from numberPrimitive
    fill(stringPrimitive); // Set fill color from stringPrimitive
    ellipse(100, 100, 150, 150); // Draw a circle
  }

  strokeWeight(5); // Set stroke weight
  fill('green'); // Set fill color
  rect(200, 50, 100, 100); // Draw a rectangle

  strokeWeight(10); // Set stroke weight
  stroke('red'); // Set stroke color
  line(50, 300, 350, 300); // Draw a line
}

// Event function to switch scenes based on the menu choice
function mousePressed() {
  // This could be used for further scene-specific interactions if necessary
}

// Event handler for spacebar key press to change moon movement type
function keyPressed() {
  if (key === ' ') {
    // Toggle between different movement types (smooth or bouncing)
    movementType = (movementType + 1) % 2; // 0 = smooth, 1 = bouncing
    if (movementType === 0) {
      moonSpeed = random(1, 3); // Change the moon speed when switching to smooth movement
      moonVerticalSpeed = random(1, 3); // Add random vertical speed for smooth mode
    } else {
      moonSpeed = random(1, 5); // Change speed for bouncing mode
      moonVerticalSpeed = random(1, 5); // Change vertical speed for bouncing mode
    }
  }
}

// Function to create a navigation menu
function createMenu() {
  let menu = createDiv();
  menu.position(10, 10);
  menu.style('color', 'white');
  menu.style('font-size', '20px');
  menu.style('background-color', 'rgba(0, 0, 0, 0.5)');
  menu.style('padding', '10px');
  
  let btn1 = createButton('Scene 1: Dynamic Circle');
  btn1.mousePressed(() => {
    currentScene = 0;
  });
  menu.child(btn1);

  let btn2 = createButton('Scene 2: Night Sky with Moon');
  btn2.mousePressed(() => {
    currentScene = 1;
  });
  menu.child(btn2);

  let btn3 = createButton('Scene 3: Basic Shapes');
  btn3.mousePressed(() => {
    currentScene = 2;
  });
  menu.child(btn3);
}
