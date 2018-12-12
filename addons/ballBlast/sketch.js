var lev = 1
var levelStated = false
var won
var time = 1200
var backImg = []
var bullets = []
var balls = []
var numBack = 0;
var life = 200;
var y = 600
var ball = {
  x : 50,
  y : 50,
  speedX: 3,
  speedY: 7,
  checkForHit: function(x, y) {
    var xs = (x - this.x)*(x-this.x);
    var ys = (y - this.y)*(y - this.y);
    var dis1 = sqrt(xs + ys);


      var xs = (x - this.x)*(x-this.x);
      var ys = (y - this.y)*(y - this.y);
      var dis1 = sqrt(xs + ys);
    if (dis1 < 50) {
      return true;
    }
    return false;
  },
  checkForHitCannon: function() {
    var xs = (mouseX - this.x)*(mouseX-this.x);
    var ys = (height - 7 - this.y)*(height - 75 - this.y);
    var dis = sqrt(xs + ys);
    if (dis < 75) {
      return true;
    }
    return false;
  },
  display: function() {
    fill(178, 255 ,255)
    ellipse(this.x, this.y, 100, 100)
    if(this.y > height-50) {
      this.speedY *= -1;
    }
    else if (this.y < 50) {
      this.speedY *= -1;
    }
    if(this.x > width-50) {
      this.speedX *= -1;
    }
    else if (this.x < 50) {
      this.speedX *= -1;
    }

    this.y += this.speedY;
    this.x += this.speedX;
    fill(0)
    textSize(26)
  text(life, this.x, this.y)

}
}

function preload(){
  won = loadImage("fire.jpg")
  backImg[0] = loadImage("beachBack.jpg");
  backImg[1] = loadImage("circutBack.jpg");
  backImg[2] = loadImage("desertBack.jpg");
  backImg[3] = loadImage("jungleBack.jpg");
  backImg[4] = loadImage("moonBack.jpg");
  backImg[5] = loadImage("houseBack.jpg");
  backImg[6] = loadImage("classBack.jpg");
  backImg[7] = loadImage("galBack.jpg");
  backImg[8] = loadImage("brickBack.jpg");
  backImg[9] = loadImage("waterfallBack.jpg");
}

function setup() {
  colorMode(HSB)
  createCanvas(windowWidth, windowHeight);
  numBack =  floor(random(10));
  level()
}
function draw() {
  background(backImg[numBack])
  cannon();
  for(var i = 0;  i < bullets.length; i++){
    bullets[i].display();
    bullets[i].fire();
    bullets[i].checkForHit();
  }
  ball.display()
  youWin()
  youLose()

}


function cannon() {
  var x = 50
  // wheels of cannon
  fill(170, 255, 25)
  ellipse(mouseX - 1/2 * 5/3 * x + 5/3 * x - 5, windowHeight - (1/2 * x + 20) + 1/2 * x + 10 ,20)
  ellipse(mouseX - 1/2 * 5/3 * x + 5, windowHeight- (1/2 * x + 20) + 1/2 *x + 10,20)
  fill(0)
  ellipse(mouseX - 1/2 * 5/3 * x + 5/3 * x - 5, windowHeight - (1/2 * x + 20) + 1/2 * x + 10 ,7)
  ellipse(mouseX - 1/2 * 5/3 * x + 5, windowHeight- (1/2 * x + 20) + 1/2 *x + 10,7)
  // base of cannon
  fill(1, 255, 50)
  rect(mouseX - 1/2 * 5/3 * x, windowHeight- (1/4 * x + 10), 5/3 * x, 1/4 *x)
  // bady of cannon
  fill(170, 255, 25)
  rect(mouseX- 1/2 * x, windowHeight- (x*3/2 + 10), x, x*3/2)
  // gun of  cannon
  fill(200, 20, 70)
  triangle(mouseX- 1/2 * x, windowHeight- (3/2*x + 10), mouseX- 1/2 * x + 20, windowHeight- (3/2*x + 30),mouseX- 1/2 * x + 20, windowHeight- (3/2*x + 10))
  triangle(mouseX + 1/2 * x, windowHeight- (3/2*x + 10), mouseX + 1/2 * x - 20, windowHeight- (3/2*x + 30),mouseX + 1/2 * x - 20, windowHeight- (3/2*x + 10))
}

function Bullet() {
  this.x = mouseX
  this.y = height - (75 + 10)
  this.spread = 0;
  this.display = function() {
    fill(1, 255, 255)
    ellipse(this.x + this.spread, this.y, 7, 10);
    ellipse(this.x, this.y, 7, 10);
    ellipse(this.x - this.spread, this.y, 7, 10);

  }
  this.fire = function() {
    this.y-=18
    this.spread += 7
  }
  this.checkForHit = function() {
    if(ball.checkForHit(this.x, this.y)==true) {
      console.log("ball hit");
      life--
    }
    else if (ball.checkForHit(this.x + this. spread, this.y)==true) {
      console.log("ball hit");
      life--
    }
    else if(ball.checkForHit(this.x - this.spread, this.y)==true) {
      console.log("ball hit");
      life--
    }
  }
}


function keyPressed() {
  if(key == 'w'){
    bullets.push(new Bullet())
  }
}
function youLose(){
  time--
  if(time <= 0 || ball.checkForHitCannon() == true){
    rect(0, 0, windowWidth, windowHeight)
    fill(255)
    textSize(150)
    text("Maybe Next Time", 100, windowHeight/2)
    time = 0
  }
}
function level(){
  if(lev == 1){
    ball.speedX = 2
    ball.speedY = 6
  }
  if(lev == 2){
    ball.speedX = 3
    ball.speedY = 7
  }
  if(lev == 3){
    ball.speedX = 4
    ball.speedY = 6
  }
  if(lev == 4){
    ball.speedX = 5
    ball.speedY =5
  }
  if(lev == 5){
    ball.speedX = 7
    ball.speedY = 10
  }
}
function youWin(){
  if(life <= 0){
    image(won, 0, 0, windowWidth, windowHeight)
    fill(275)
    textSize(125)
    text("YOU BEAT THE BALL" ,50, 1/2 * windowHeight)
    time++
  }
  if(life <= 0){
    lev++
    level()
    life = 200
    time = 1200
  }
}
