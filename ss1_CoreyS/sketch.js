//Corey Spitzer 
//2D objecrts 
function setup() {
  createCanvas(400, 400);

  //set background color
	background(20, 100, 220);
  
  // Define three different primitive types:
  let numberPrimitive = 50; // Number type
  let stringPrimitive = 'blue'; // String type
  let booleanPrimitive = true; // Boolean type

  // Draw a circle with variation in stroke weight and fill color
  if (booleanPrimitive) {
    strokeWeight(numberPrimitive);  // Set stroke weight from numberPrimitive
    fill(stringPrimitive);  // Set fill color from stringPrimitive
    ellipse(100, 100, 150, 150);  // Draw a circle
  }

  // Draw a rectangle with different stroke weight and color
  strokeWeight(5); // Set stroke weight
  fill('green'); // Set fill color
  rect(200, 50, 100, 100); // Draw a rectangle

  // Draw a line with different stroke weight and color
  strokeWeight(10); // Set stroke weight
  stroke('red'); // Set stroke color
  line(50, 300, 350, 300); // Draw a line
}