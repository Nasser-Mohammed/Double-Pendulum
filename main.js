
//Equations of motion
//4/3*l*theta''_1 + 1/2*l*theta''_2*cos(theta_1-theta_2) + 
//1/2*l*(theta'_2)^2*sin(theta_1-theta_2) + 3/2*g*sin(theta_1) = 0

//1/3*l*theta''_2 + 1/2*l*theta''_1*cos(theta_1-theta_2) -
//1/2*l*(theta'_1)^2*sin(theta_1-theta_2) + 1/2*g*sin(theta_2) = 0

let p1 = {length: 185, mass: 15, theta: 0, velocity: 0, acceleration: 0, x: 0, y: 0};
let p2 = {length: 125, mass: 7.5, theta: 0, velocity: 0, acceleration: 0, x: 0, y: 0};
let midLineHeight;
let midLineWidth;

const pi = Math.PI;
const g = 9.81;
console.log("constants are: pi: ", pi, " and g: ", g);

//this means it will rotate within a circle of radius 310
//canvas height is 750 and anchorLine is at 333 (which is height/2.25)
//this is sufficient room for the pendulum

let initial_x1;
let initial_y1;
let initial_x2;
let initial_y2;

const dt = 0.1;

let canvas;
let ctx;
let height;
let width;

let animationId;
let lastTime = null

function timeStep() {
  let m1 = p1.mass;
  let m2 = p2.mass;
  let l1 = p1.length;
  let l2 = p2.length;
  let a1 = p1.theta;
  let a2 = p2.theta;
  let w1 = p1.velocity;
  let w2 = p2.velocity;

  let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
  let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let num3 = -2 * Math.sin(a1 - a2) * m2;
  let num4 = w2 * w2 * l2 + w1 * w1 * l1 * Math.cos(a1 - a2);
  let den = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  let a1_acc = (num1 + num2 + num3 * num4) / den;

  let num5 = 2 * Math.sin(a1 - a2);
  let num6 = (w1 * w1 * l1 * (m1 + m2));
  let num7 = g * (m1 + m2) * Math.cos(a1);
  let num8 = w2 * w2 * l2 * m2 * Math.cos(a1 - a2);
  let den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));
  let a2_acc = (num5 * (num6 + num7 + num8)) / den2;

  // integrate using Euler method
  p1.velocity += a1_acc * dt;
  p1.theta += p1.velocity * dt;

  p2.velocity += a2_acc * dt;
  p2.theta += p2.velocity * dt;

  // Cartesian coordinates
  let x1 = l1 * Math.sin(p1.theta);
  let y1 = -l1 * Math.cos(p1.theta);

  let x2 = x1 + l2 * Math.sin(p2.theta);
  let y2 = y1 - l2 * Math.cos(p2.theta);

  [p1.x, p1.y] = convert_xy_2_coords(x1, y1);
  [p2.x, p2.y] = convert_xy_2_coords(x2, y2);

  console.log("New p1 x,y: (", p1.x, p1.y, ")");
  console.log("New p2 x,y: (", p2.x, p2.y, ")");
}


function draw(){
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height)
  drawMidline();

  ctx.lineWidth = 10;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(Math.floor((1/2)*width), midLineHeight)
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke()

  ctx.strokeStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();

  drawBolt(Math.floor(p1.x), Math.floor(p1.y), 15);
  drawBolt(Math.floor(width/2), Math.floor(midLineHeight), 15);
}


function animate(currentTime){
    if (!lastTime) lastTime = currentTime;
    const deltaTime = (currentTime - lastTime)/1000;
    lastTime = currentTime;

    timeStep(); //can input a variable dt here
    draw();
    //console.log("simulation...........")
    animationId = requestAnimationFrame(animate);
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

function computeXY_from_theta(theta, r){
  let x = 0;
}


function initializePendulums(){
  p1.theta = pi;
  p2.theta = pi/2;

  p1.x = p1.length*Math.sin(p1.theta);
  p1.y = -p1.length*Math.cos(p1.theta);

  let totalTheta = p1.theta+p2.theta - pi/2

  p2.x = p1.x + p2.length*Math.cos(totalTheta);
  p2.y = p1.y + p2.length*Math.sin(totalTheta);

  const [x1, y1] = convert_xy_2_coords(p1.x, p1.y);
  p1.x = x1;
  p1.y = y1;

  const [x2, y2] = convert_xy_2_coords(p2.x, p2.y);
  p2.x = x2;
  p2.y = y2;

  console.log("Starting position for top pendulum: x: ", p1.x , " y: ", p1.y);
  console.log("Starting position for bottom pendulum: x: ", p2.x, " y: ", p2.y);

  ctx.lineWidth = 10;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(Math.floor((1/2)*width), midLineHeight)
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke()

  ctx.strokeStyle = "yellow";
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();

  drawBolt(p1.x, p1.y, 15);
  drawBolt(Math.floor(width/2), midLineHeight, 15);

  p1.acceleration = 0;
  p1.velocity = 0;

  p2.acceleration = 0;
  p2.velocity = 0;

}

function drawMidline(){
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, midLineHeight);
    ctx.lineTo(midLineWidth, midLineHeight);
    ctx.stroke();
}

function startSimulation(){
  console.log("Starting simulation.........")
  initializePendulums();
  animationId = requestAnimationFrame(animate);
}

function stopSimulation(){
  cancelAnimationFrame(animationId);
  console.log("Stopped simulation");
  ctx.fillStyle = "black";
  ctx.fillRect(0,0, width, height);
  p1.x = 0;
  p1.y = 0;
  p1.theta = 0;
  p1.acceleration = 0;
  p1.velocity = 0;
  p2.x = 0;
  p2.y = 0;
  p2.theta = 0;
  p2.acceleration = 0;
  p2.velocity = 0;
  initCanvas();
}

function initCanvas(){
  drawMidline();
  initializePendulums();
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
  initCanvas();

  const stopBtn = document.getElementById("stopBtn");
  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", () => {
    startSimulation();
  });

  stopBtn.addEventListener("click", () => {
    stopSimulation();
  })




});