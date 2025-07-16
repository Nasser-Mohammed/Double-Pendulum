
//Equations of motion
//4/3*l*theta''_1 + 1/2*l*theta''_2*cos(theta_1-theta_2) + 
//1/2*l*(theta'_2)^2*sin(theta_1-theta_2) + 3/2*g*sin(theta_1) = 0

//1/3*l*theta''_2 + 1/2*l*theta''_1*cos(theta_1-theta_2) -
//1/2*l*(theta'_1)^2*sin(theta_1-theta_2) + 1/2*g*sin(theta_2) = 0

let stateVector1 = {length: 100, mass: 15, theta: 0, velocity: 0, acceleration: 0, x: 0, y: 0};
let stateVector2 = {length: 10, mass: 7.5, theta: 0, velocity: 0, acceleration: 0, x: 0, y: 0};
let lineHeight;
let lineWidth;

let canvas;
let ctx;
let height;
let width;


function initializePendulums(){
  stateVector1.theta = 45;
  stateVector1.velocity = 0;
  stateVector1.acceleration = 0;
  stateVector1.x = (1/2)*stateVector1.length*Math.sin(stateVector1.theta);
  stateVector2.y = (-1/2)*stateVector1.length*Math.cos(stateVector1.theta);

  stateVector2.theta = 90;
  stateVector2.velocity = 0;
  stateVector2.acceleration = 0;
  //need to compute the middle start point of the bottom pendulum
  stateVector2.x = (1/2)*stateVector2.length*Math.sin(stateVector2.theta);
  stateVector2.y = (-1/2)*stateVector2.length*Math.cos(stateVector2.theta);

  console.log("Starting position for top pendulum: x: ", stateVector1.x +200, " y: ", stateVector1.y+200);
  console.log("Starting position for bottom pendulum: x: ", stateVector2.x+200, " y: ", stateVector2.y+200);

  ctx.lineWidth = 3;
  ctx.strokeStyle = 'red';

  ctx.beginPath();
  ctx.moveTo(Math.floor(stateVector1.x+200), Math.floor(stateVector2.y+200));
  ctx.lineTo(Math.floor(stateVector2.x+200), Math.floor(stateVector2.y+200));
  ctx.stroke();

}

function drawMidline(){
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(0, lineHeight);
    ctx.lineTo(width, lineHeight);
    ctx.stroke();
}

document.addEventListener("DOMContentLoaded", () => {
  canvas = document.getElementById("pendulumCanvas");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  lineHeight = Math.floor((1/3)*height);
  lineWidth = width;
  drawMidline();
  initializePendulums();
});