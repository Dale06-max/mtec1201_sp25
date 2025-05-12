// Name: Your Name
// Title: Dodge the Yellow Balls
// Instructions: Dodge the yellow objects! Click "Restart" to reset the game.

class BouncingBall {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 'yellow';
    this.xSpeed = random(-3, 3);
    this.ySpeed = random(-3, 3);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < this.radius || this.x > width - this.radius) {
      this.xSpeed *= -1;
    }

    if (this.y < this.radius || this.y > height - this.radius) {
      this.ySpeed *= -1;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }

  hitsPlayer(px, py) {
    let d = dist(this.x, this.y, px, py);
    return d < this.radius + 7.5; // mouse circle is radius 7.5
  }
}

let balls = [];
let restartButton;
let gameStarted = false;
let lives = 3;
let gameOver = false;
let totalBalls = 10; // You can increase this number

function setup() {
  createCanvas(600, 400);
  createBalls();

  restartButton = createButton('Restart');
  restartButton.position(10, 10);
  restartButton.mousePressed(restartGame);
}

function draw() {
  background(240);

  fill(0);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Dodge the yellow objects!", width / 2, 10);

  if (!gameStarted) {
    fill(50);
    textSize(16);
    text("Click 'Restart' to begin the game.", width / 2, height / 2);
    return;
  }

  if (gameOver) {
    fill('red');
    textSize(24);
    text("Game Over! Click 'Restart' to try again.", width / 2, height / 2);
    return;
  }

  // HUD: Lives and instructions
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Lives: " + lives, 10, 40);
  text("Avoid the yellow balls with your mouse!", 10, 60);

  for (let ball of balls) {
    ball.move();
    ball.display();

    if (ball.hitsPlayer(mouseX, mouseY)) {
      lives--;
      if (lives <= 0) {
        gameOver = true;
        gameStarted = false;
      } else {
        ball.x = random(width);
        ball.y = random(height);
      }
    }
  }

  // Draw player (mouse)
  fill('black');
  ellipse(mouseX, mouseY, 15);
}

function createBalls() {
  balls = [];
  for (let i = 0; i < totalBalls; i++) {
    let radius = random(15, 30);
    let x = random(radius, width - radius);
    let y = random(radius, height - radius);
    balls.push(new BouncingBall(x, y, radius));
  }
  lives = 3;
  gameOver = false;
  gameStarted = true;
}

function restartGame() {
  createBalls();
}
