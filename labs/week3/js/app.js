class Ball {//this class creates a ball that has an x of 100 and a y of 100 and a x velocity of 10 and a y velocity of zero meaing it moves horizontally.
  
    constructor() {
      this.position = { x: 100, y: 100 };
      this.velocity = { x: 10, y: 0 };
    }
    
    update() {//this draws the ball which moves at the said velocity on the x and y axis
      
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      
      circle(this.position.x, this.position.y, 20);//draws the circle
      
      if(this.position.x < 0 || this.position.x > 400) {
        World.ballBeyond(this);
      }
    }
    
  }
  
  var World = {//creates a variable called world
    bgcolor: [237, 119, 83],//gives the world a backgroud color
    ballBeyond: function(whichBall) {
      this.bgcolor = [ Math.random()*255, Math.random()*255, 83 ];
      whichBall.position.x = 100;
      whichBall.velocity.x = (Math.random() - .5) * 20;
    }
  }
  
  //class for a box
  class box{
    constructor(){
      this.x =
    }
  }
  //Grows in size every time a ball hits an edge and is reset
  // "For fun": multiple balls
  
  var ball = new Ball();// creates new ball variable 
  
  
  
  function setup() {
    createCanvas(400,300);//creates the canvas.
    
  }
  
  function draw() {
    background( World.bgcolor );//sets the background color to what the worlds background color is when hit by the ball
    ball.update();
  }