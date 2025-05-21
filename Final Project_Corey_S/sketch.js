// Name: Corey Spitzer
// Title: Racing Game
// Instructions: Dodge the yellow objects! Click "Restart" to reset the game.

let car;
let obstacles = [];
let gameStarted = false;
let gameOverFlag = false;
let startButton;
let restartButton;
let lives = 3;
let laneLines = [];
let score = 0;
let highScore = 0;
let carSound;


function setup() {
  createCanvas(400, 600);
  car = new Car();

  startButton = createButton('Start Game');
  startButton.position(width / 2 - 40, height / 2);
  startButton.mousePressed(startGame);

  restartButton = createButton('Restart Game');
  restartButton.position(width / 2 - 50, height / 2 + 40);
  restartButton.mousePressed(restartGame);
  restartButton.hide();

  for (let i = 0; i < height; i += 40) {
    laneLines.push(i);
  }
}

function startGame() {
  gameStarted = true;
  gameOverFlag = false;
  startButton.hide();
  restartButton.hide();
  lives = 3;
  obstacles = [];
  score = 0;

  if (carSound && !carSound.isPlaying()) {
    carSound.loop();
  }
}

function restartGame() {
  car = new Car();
  obstacles = [];
  lives = 3;
  gameStarted = true;
  gameOverFlag = false;
  score = 0;
  restartButton.hide();

  if (carSound && !carSound.isPlaying()) {
    carSound.loop();
  }
}

function draw() {
  background(30, 30, 30);
  drawRoad();

  if (gameStarted && !gameOverFlag) {
    car.show();
    car.move();

    if (frameCount % 60 === 0) {
      obstacles.push(new Obstacle());
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].show();

      if (obstacles[i].hits(car)) {
        lives--;
        obstacles.splice(i, 1);
        if (lives <= 0) {
          endGame();
          break;
        }
      } else if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    score++;

    fill(255);
    textSize(16);
    textAlign(LEFT);
    text("Lives: " + lives, 10, 20);
    text("Score: " + score, 10, 40);
    text("High Score: " + highScore, 10, 60);
  } else if (!gameStarted) {
    fill(255);
    textAlign(CENTER);
    textSize(24);
    text('Car Racing Game', width / 2, height / 2 - 50);
  } else if (gameOverFlag) {
    fill(255, 0, 0);
    textSize(30);
    textAlign(CENTER);
    text('You lost all your lives!', width / 2, height / 2 - 40);

    fill(255);
    textSize(20);
    text("Press 'R' to Restart the game", width / 2, height / 2 + 10);

    restartButton.show();
  }
}

function drawRoad() {
  fill(60);
  rect(100, 0, 200, height);

  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < laneLines.length; i++) {
    line(width / 2, laneLines[i], width / 2, laneLines[i] + 20);
    laneLines[i] += 5;
    if (laneLines[i] > height) {
      laneLines[i] = 0;
    }
  }
  noStroke();
}

function endGame() {
  gameOverFlag = true;
  gameStarted = false;

  if (carSound && carSound.isPlaying()) {
    carSound.stop();
  }

  if (score > highScore) {
    highScore = score;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    car.setDir(-1);
  } else if (keyCode === RIGHT_ARROW) {
    car.setDir(1);
  } else if ((key === 'r' || key === 'R') && gameOverFlag) {
    restartGame();
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    car.setDir(0);
  }
}

class Car {
  constructor() {
    this.x = width / 2 - 20;
    this.y = height - 80;
    this.w = 40;
    this.h = 60;
    this.dir = 0;
  }

  show() {
    fill(0, 200, 255);
    rect(this.x, this.y, this.w, this.h, 5);
  }

  setDir(dir) {
    this.dir = dir;
  }

  move() {
    this.x += this.dir * 5;
    this.x = constrain(this.x, 100, 260);
  }
}

class Obstacle {
  constructor() {
    this.w = 40;
    this.h = 40;
    this.x = random(110, 260);
    this.y = -this.h;
    this.speed = 5;
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(255, 255, 0);
    rect(this.x, this.y, this.w, this.h, 5);
  }

  hits(car) {
    return !(
      car.x + car.w < this.x ||
      car.x > this.x + this.w ||
      car.y + car.h < this.y ||
      car.y > this.y + this.h
    );
  }

  offscreen() {
    return this.y > height;
  }
}
