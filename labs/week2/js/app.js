//N320
//Christian Cochran
//Week 2



class Drop {
    constructor() {
        this.x = Math.random() * 400;
        this.y = 0;
    }

    update() {
        this.y ++;
        fill(0,0,200);
        circle(this.x, this.y, 5);
        if(this.y > 250){
            this.y=0//resets the y circles
        }
    }
}


class RainManager {
    constructor() {
        this.drops = [];
    }

    createDrop() {
        //make a new drop
        var newDrop = new Drop();
        
        //add this drop to our collection of drops
        this.drops.push(newDrop);
    }

    update() {
        for(var i = 0; i < this.drops.length; i++) {
            this.drops[i].update();
           
        }
        
    }
}




        
      
    //update - draws the rectangle to the screen

    //drop hit - called when a rain drop gets low enough (how do you inform it?)
        //change the color for every ten rain drops hit



//global variables
var rainManager = new RainManager();
let ground = new Ground;

//Run once before the application starts
function setup() {
    createCanvas(400,300);
   
    
    
}

//runs 60 times a second, or so
function draw() {
  
    //clear out background
    background(255);

    //create a new drop on a 1% chance
    if(Math.random() < .05) {
        rainManager.createDrop();
    }

    rainManager.update();
    //ground.create();// supposed to call the ground function 
    
   // newRect.createRect();
    
}
//console.log(ground.update())/// tried logging the ground but it didn't work 
