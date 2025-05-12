// Name: Your Name
// Title: Bouncing Balls with Instructions and Restart
// Instructions: Dodge the yellow objects! Click "Restart" to reset the game.

class BouncingBall {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
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
  }
  
  let balls = [];
  let restartButton;
  let gameStarted = false;
  
  function setup() {
    createCanvas(600, 400);
    createBalls();
  
    // Create a restart button
    restartButton = createButton('Restart');
    restartButton.position(10, 10);
    restartButton.mousePressed(restartGame);
  }
  
  function draw() {
    background(240);
  
    // Display instruction text
    fill(0);
    textSize(20);
    textAlign(CENTER, TOP);
    text("Dodge the yellow objects!", width / 2, 40);
  
    if (gameStarted) {
      // Animate and show balls
      for (let i = 0; i < balls.length; i++) {
        balls[i].move();
        balls[i].display();
      }
    } else {
      // Show message before game starts
      fill(50);
      textSize(16);
      text("Click 'Restart' to begin the game.", width / 2, height / 2);
    }
  }
  
  function createBalls() {
    balls = [];
    balls.push(new BouncingBall(100, 200, 20, 'red'));
    balls.push(new BouncingBall(300, 100, 25, 'blue'));
    balls.push(new BouncingBall(500, 300, 30, 'yellow'));
    gameStarted = true;
  }
  
  function restartGame() {
    createBalls(); // Recreate all balls and reset positions
  }
  