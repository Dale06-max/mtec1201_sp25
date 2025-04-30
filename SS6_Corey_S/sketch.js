/**
 * Name: Corey Spitzer
 * Title: SS6_Corey_S
 * Instructions: Press ENTER to start the game. Use LEFT and RIGHT arrow keys to move the car. 
 * Avoid hitting enemy cars and shape obstacles!
 */

let car;
let obstacles = []; // Array for enemy cars
let shapes = [];    // Array for shape obstacles
let laneLines = []; // Array for road lines
let gameStarted = false;

function setup() {
  createCanvas(400, 600);
  car = new Car();
  for (let i = 0; i < 4; i++) {
    obstacles.push(new EnemyCar());
  }
  for (let i = 0; i < 10; i++) {
    laneLines.push(new LaneLine(i * 60));
  }
  for (let i = 0; i < 5; i++) {
    shapes.push(new ShapeObstacle());
  }
}

function draw() {
  background(50);

  if (!gameStarted) {
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("HIGHWAY RACER", width / 2, 50);
    textSize(16);
    text("Press ENTER to Start", width / 2, height / 2 - 20);
    text("Use Arrow Keys to Move", width / 2, height / 2 + 10);
    return;
  }

  // Update and show lane lines
  for (let line of laneLines) {
    line.update();
    line.show();
  }

  // Update and show enemy cars
  for (let obs of obstacles) {
    obs.update();
    obs.show();
    if (car.hits(obs)) {
      endGame();
    }
  }

  // Update and show shape obstacles
  for (let shape of shapes) {
    shape.update();
    shape.show();
    if (car.hitsShape(shape)) {
      endGame();
    }
  }

  car.update();
  car.show();
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    car.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    car.move(1);
  } else if (keyCode === ENTER && !gameStarted) {
    gameStarted = true;
  }
}

function endGame() {
  noLoop();
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('GAME OVER', width / 2, height / 2);
}

// =======================
// CAR CLASS
// =======================
class Car {
  constructor() {
    this.w = 40;
    this.h = 80;
    this.x = width / 2 - this.w / 2;
    this.y = height - this.h - 10;
    this.speed = 5;
  }

  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  move(dir) {
    this.x += dir * this.speed * 10;
    this.x = constrain(this.x, 0, width - this.w);
  }

  update() {
    // Player does not move automatically
  }

  hits(obstacle) {
    return (
      this.x < obstacle.x + obstacle.w &&
      this.x + this.w > obstacle.x &&
      this.y < obstacle.y + obstacle.h &&
      this.y + this.h > obstacle.y
    );
  }

  hitsShape(shape) {
    if (shape.shapeType === 'circle') {
      let d = dist(this.x + this.w / 2, this.y + this.h / 2, shape.x, shape.y);
      return d < this.w / 2 + shape.size / 2;
    } else if (shape.shapeType === 'triangle') {
      // Approximate triangle as bounding box
      return (
        this.x < shape.x + shape.size / 2 &&
        this.x + this.w > shape.x - shape.size / 2 &&
        this.y < shape.y + shape.size / 2 &&
        this.y + this.h > shape.y - shape.size / 2
      );
    }
    return false;
  }
}

// =======================
// ENEMY CAR CLASS
// =======================
class EnemyCar {
  constructor() {
    this.w = 40;
    this.h = 80;
    this.x = random([60, 160, 260, 360] - this.w / 2);
    this.y = random(-600, -100);
    this.speed = random(3, 7);
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-600, -100);
      this.x = random([60, 160, 260, 360] - this.w / 2);
      this.speed = random(3, 7);
    }
  }
}

// =======================
// SHAPE OBSTACLE CLASS
// =======================
class ShapeObstacle {
  constructor() {
    this.size = random(30, 50);
    this.x = random(0, width - this.size);
    this.y = random(-600, -100);
    this.speed = random(3, 6);
    this.shapeType = random(['circle', 'triangle']);
  }

  show() {
    fill(255, 255, 0);
    if (this.shapeType === 'circle') {
      ellipse(this.x, this.y, this.size);
    } else if (this.shapeType === 'triangle') {
      triangle(
        this.x, this.y - this.size / 2,
        this.x - this.size / 2, this.y + this.size / 2,
        this.x + this.size / 2, this.y + this.size / 2
      );
    }
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-600, -100);
      this.x = random(0, width - this.size);
      this.speed = random(3, 6);
      this.shapeType = random(['circle', 'triangle']);
    }
  }
}

// =======================
// LANE LINE CLASS
// =======================
class LaneLine {
  constructor(y) {
    this.x = width / 2 - 5;
    this.y = y;
    this.w = 10;
    this.h = 40;
    this.speed = 5;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = -this.h;
    }
  }
}
