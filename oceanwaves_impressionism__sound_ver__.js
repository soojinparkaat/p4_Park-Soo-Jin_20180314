//set variables and arrays
const n = 1000;
let particles = [];
let waviness = 1/50; // for the waves
let interval;
let wavesound;

function preload(){
  wavesound = loadSound('wavesound_1.mp3');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,90);
  angleMode(DEGREES);
  noStroke();
  wavesound.play();
  
  //background color
  background(60, 50, 40); 
  
  //setInterval(function, milliseconds)
  //executes function "createParticles" repeatedly, after waiting several milliseconds
  interval = setInterval(createParticles,800);
}

//draw numerous particles(->lines) until framecount reaches 600
function draw() {
  if (frameCount < 600) {
    for (let p of particles) {
      p.draw();
      p.move();
    }
  } else if (frameCount == 600) {
    clearInterval(interval);
    }
  
  // draw fishes
     else if (frameCount > 600) {
    
       if (mouseIsPressed){
       blendMode(BLEND);
      noStroke();
      fill(0,0,100,random (10,70));
       
  ellipse(random(mouseX-80,mouseX+80), random(mouseY-80,mouseY+80), random(7,17), random(3,8));
 }}
}


function createParticles() {
  particles = [];
  for (let i = 0; i < n; i++) {
    let sx = random(0, windowWidth);
    let sy = random(0, windowHeight);
    let st = random(1, 3.5);//thickness of stroke
    let sc = color(random(45, 60), random(60, 80), random(60, 80), random(50, 100));
    particles.push(new Particle(sx, sy, st, sc));
    
  }
}

//set particle features + movement 
function Particle(sx, sy, st, sc) {
  this.x = sx;
  this.y = sy;
  this.size = st;
  this.c = sc;
  
  this.dist = st;
  
  //change stroke direction by 50% of chance
  if (random(0,1) < 0.5) {
    this.dist *= -1; 
    }
  
  this.move = function() {
    
    //set angle of curves
    let curves = noise(this.x * waviness, this.y * waviness);
    
    //Create a p5.Vector using the fromAngle function
    //p5.Vector.fromAngle(angle, [length])
    let a = p5.Vector.fromAngle(curves, this.dist);
    
    this.x += a.x;
    this.y += a.y;
   
  }
  
  this.draw = function() {
    fill(this.c);
    ellipse(this.x, this.y, this.size);
  }
}
