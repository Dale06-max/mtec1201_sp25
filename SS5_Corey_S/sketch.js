// SS5_CoreyS
// Theme: Night Sky
// This sketch represents a starry night sky with an image of a moon that changes position over time. 
// Instructions: The moon image moves across the canvas, and the background changes color every 5 seconds. 
// Press the mouse to change the moon's direction and shape o nthe rocket.
let shapeSize = 50;
let shapeColor;
let circleSize = 20;
let circleSpeed = 1;
let maxCircleSize = 100;
let moonImg;
let moonX;
let moonY;
let starArray = [];
let showStars = false;
let moonSpeedX = 1;
let moonSpeedY = 1;
let moonDirectionX = 1;
let moonDirectionY = 1;
let rocketImg;
let rocketTrail = [];

let cometArray = [];
let lastBgChangeTime = 0;
let bgColor = 0;

function preload() {
  moonImg = loadImage('images/moon.png');
  rocketImg = loadImage('images/rocket.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shapeColor = color(random(255), random(255), random(255));
  moonX = width / 2;
  moonY = height / 2;
  noStroke();
  generateComets();
}

function draw() {
  // Change background every 5 seconds
  if (millis() - lastBgChangeTime > 5000) {
    bgColor = color(random(10, 50), random(10, 50), random(50, 100));
    lastBgChangeTime = millis();
  }
  background(bgColor);

  if (showStars) {
    drawStars();
  }

  // Draw comets (loop-based pattern)
  drawComets();

  for (let i = 0; i < rocketTrail.length; i++) {
    let trail = rocketTrail[i];
    fill(255, 100, 0, 150);
    noStroke();
    ellipse(trail.x, trail.y, trail.size, trail.size);
  }

  if (rocketTrail.length > 10) {
    rocketTrail.shift();
  }
  rocketTrail.push({ x: mouseX, y: mouseY, size: random(5, 15) });

  image(rocketImg, mouseX - rocketImg.width / 2, mouseY - rocketImg.height / 2);

  if (mouseIsPressed) {
    fill(shapeColor);
    ellipse(mouseX, mouseY, shapeSize, shapeSize);
  } else if (mouseX > width / 2) {
    fill(shapeColor);
    rect(mouseX - shapeSize / 2, mouseY - shapeSize / 2, shapeSize, shapeSize);
  } else {
    fill(shapeColor);
    triangle(mouseX - shapeSize / 2, mouseY + shapeSize / 2,
      mouseX + shapeSize / 2, mouseY + shapeSize / 2,
      mouseX, mouseY - shapeSize / 2);
  }

  image(moonImg, moonX, moonY, 100, 100);

  moonX += moonSpeedX * moonDirectionX;
  moonY += moonSpeedY * moonDirectionY;

  if (moonX >= width - 100 || moonX <= 0) {
    moonDirectionX *= -1;
  }
  if (moonY >= height - 100 || moonY <= 0) {
    moonDirectionY *= -1;
  }

  fill(255);
  textSize(24);
  text("Press 'S' to show stars, or click to interact!", 30, 30);
}

// Comet generation (creates a grid of diagonal comets)
function generateComets() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 2; j++) {
      cometArray.push({
        x: random(-width, 0),
        y: random(height),
        speedX: random(2, 4),
        speedY: random(-1, 1),
        size: random(5, 8),
        color: color(255, 255, 200, 180)
      });
    }
  }
}

// Draw comets in motion using iteration
function drawComets() {
  for (let i = 0; i < cometArray.length; i++) {
    let comet = cometArray[i];
    fill(comet.color);
    ellipse(comet.x, comet.y, comet.size);
    comet.x += comet.speedX;
    comet.y += comet.speedY;

    // Reset if off screen
    if (comet.x > width || comet.y < 0 || comet.y > height) {
      comet.x = random(-width, 0);
      comet.y = random(height);
    }
  }
}

function keyPressed() {
  if (key === 'S' || key === 's') {
    showStars = !showStars;
    if (showStars) {
      generateStars();
    }
  }

  moonDirectionX = random([-1, 1]);
  moonDirectionY = random([-1, 1]);
}

function mousePressed() {
  circleSize += 10;
  if (circleSize > maxCircleSize) {
    circleSize = maxCircleSize;
  }

  moonDirectionX = mouseX > width / 2 ? 1 : -1;
  moonDirectionY = mouseY > height / 2 ? 1 : -1;
}

function mouseReleased() {
  circleSize -= 10;
  if (circleSize < 10) {
    circleSize = 10;
  }
}

function generateStars() {
  let numStars = int(random(50, 200));
  starArray = [];
  for (let i = 0; i < numStars; i++) {
    let star = {
      x: random(width),
      y: random(height),
      size: random(2, 5),
      brightness: random(150, 255)
    };
    starArray.push(star);
  }
}

function drawStars() {
  for (let i = 0; i < starArray.length; i++) {
    let star = starArray[i];
    fill(star.brightness);
    noStroke();
    ellipse(star.x, star.y, star.size, star.size);
  }
}
