
//Equations of motion
//4/3*l*theta''_1 + 1/2*l*theta''_2*cos(theta_1-theta_2) + 
//1/2*l*(theta'_2)^2*sin(theta_1-theta_2) + 3/2*g*sin(theta_1) = 0

//1/3*l*theta''_2 + 1/2*l*theta''_1*cos(theta_1-theta_2) -
//1/2*l*(theta'_1)^2*sin(theta_1-theta_2) + 1/2*g*sin(theta_2) = 0

let stateVector1 = {length: 185, mass: 15, theta: 0, velocity: 0, acceleration: 0, x: 0, y: 0};
let stateVector2 = {length: 125, mass: 7.5, theta: 0, velocity: 0, acceleration: 0, x: 0, y: 0};
let midLineHeight;
let midLineWidth;

const pi = Math.PI;

//this means it will rotate within a circle of radius 310
//canvas height is 750 and anchorLine is at 333 (which is height/2.25)
//this is sufficient room for the pendulum

let initial_x1;
let initial_y1;
let initial_x2;
let initial_y2;

const dt = 0.001;

let canvas;
let ctx;
let height;
let width;


function timeStep(){
  
}

function drawBolt(x, y, radius){
  ctx.beginPath();
  ctx.arc(x,y, radius, 0, Math.PI*2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}

function convert_xy_2_coords(x, y){

  //x will come from a circle of radius l1 centered at (0,0)
  //we want it to be centered at width/2, midlineHeight
  //so send 0 ->width/2 and 0 -> midlineHeight
  //
  //same for y1 except we also need to invert it
  x1 = x + Math.floor(width/2);
  y1 = -y + midLineHeight;

  return [x1,y1]
}


function initializePendulums(){
  stateVector1.theta = pi/2;

  stateVector1.x = stateVector1.length*Math.cos(stateVector1.theta);
  stateVector1.y = stateVector1.length*Math.sin(stateVector1.theta);
  
  stateVector2.theta = stateVector1.theta + Math.asin((stateVector2.length)/(Math.sqrt(stateVector2.length**2 + stateVector1.length**2)));

  stateVector2.x = (Math.sqrt(stateVector2.length**2 + stateVector1.length**2))*Math.cos(stateVector2.theta)
  stateVector2.y = (Math.sqrt(stateVector2.length**2 + stateVector1.length**2))*Math.sin(stateVector2.theta)

  const [x1, y1] = convert_xy_2_coords(stateVector1.x, stateVector1.y);
  stateVector1.x = x1;
  stateVector1.y = y1;

  const [x2, y2] = convert_xy_2_coords(stateVector2.x, stateVector2.y);
  stateVector2.x = x2;
  stateVector2.y = y2;

  console.log("Starting position for top pendulum: x: ", stateVector1.x , " y: ", stateVector1.y);
  console.log("Starting position for bottom pendulum: x: ", stateVector2.x, " y: ", stateVector2.y);

  ctx.lineWidth = 10;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(Math.floor((1/2)*width), midLineHeight)
  ctx.lineTo(stateVector1.x, stateVector1.y);
  ctx.stroke()

  ctx.strokeStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(stateVector1.x, stateVector1.y)
  ctx.lineTo(stateVector2.x, stateVector2.y);
  ctx.stroke();

  drawBolt(stateVector1.x, stateVector1.y, 15);
  drawBolt(Math.floor(width/2), midLineHeight, 15);

}

function drawMidline(){
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, midLineHeight);
    ctx.lineTo(midLineWidth, midLineHeight);
    ctx.stroke();
}

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("pendulumCanvas");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  midLineHeight = Math.floor((1/2.25)*height);
  midLineWidth = width;
  drawMidline();
  initializePendulums();
});