//Christian Cochran
//N220
//4.29.2019




let Mypaddle = new paddle;
let MywallOne= new wallOne;
let MywallTwo = new wallTwo;
let MywallThree = new wallThree;
let MywallFour = new wallFour;
let Mykblock = new kBlock;
let rects = []
let score = 0
function setup(){
    createCanvas(800,600)
    for(i = 0; i<8; i++){
      let  Myblocky = new blocky();
        Myblocky.x = i*50+50
        
        rects.push(Myblocky)
    }
    for(i = 0; i<8; i++){
        let  Myblocky = new blocky();
          Myblocky.x = i*50+50
          
          rects.push(Myblocky)
      }
    for(i=0; i<8;i++){
        fill(200,50,84);
        let Myblocky = new blocky;
        Myblocky.x = i * 50 +50;
        Myblocky.y= 125;
        rects.push(Myblocky);
    }
    for(i=0; i<8;i++){
        fill(200,50,84);
        let Myblocky = new blocky;
        Myblocky.x = i * 50 +50;
        Myblocky.y= 150;
        rects.push(Myblocky);
        
    }
    for(i=0; i<8;i++){
        fill(200,50,84);
        let Myblocky = new blocky;
        Myblocky.x = i * 50 +50;
        Myblocky.y= 175;
        rects.push(Myblocky);
    }
}

function draw(){
    background(0);
    textSize(32);
    fill(random(255),0,0)
    text('Final TTV/itslowki Christian Cochran ',200,50)
    for(i=0;i<rects.length;i++){
        rects[i].update();

    }
    for(i = rects.length-1; i>=0; i--) {
        rects[i].update()
        let hit = collideRectCircle(rects[i].x, rects[i].y,rects[i].width,rects[i].height, Mykblock.x,Mykblock.y,30);
        if(hit){
            rects.splice(i,1)
            Mykblock.gravity = 3;
            Mykblock.velicity= 1;
            score = score + 1;
        }
        if(score==32){
            fill(random(255),random(255),100)
            text('GAME OVER', 300,300)
        }
     textSize(30);
     fill(random(255),0,random(100))
     text('Score: ' + score,50,50)
      
      
      
      
        

    }
    Mypaddle.update()
    MywallOne.update()
    MywallTwo.update()
    MywallThree.update()
    MywallFour.update()
    Mykblock.update()
    


    hit = collideRectCircle(Mypaddle.x,Mypaddle.y,80,15,Mykblock.x,Mykblock.y,30);
    if(hit){
        Mykblock.velocity +1;
        Mykblock.gravity = -3;
    }
   
    hit2 = collideRectCircle(MywallOne.x, MywallOne.y,800,20,Mykblock.x,Mykblock.y,30);
    if(hit2){
        
        Mykblock.gravity= 3;
        Mykblock.velocity = -1
    }

    hit3 = collideRectCircle(MywallTwo.x, MywallTwo.y,800,20,Mykblock.x,Mykblock.y,30);
    if(hit3){
        Mykblock.gravity = -3;
    }
    hit4 = collideRectCircle(MywallThree.x,MywallThree.y,20,600,Mykblock.x,Mykblock.y,30);
    if(hit4){
        Mykblock.gravity = -3;
    }

    hit5 = collideRectCircle(MywallFour.x,MywallFour.y,20,600,Mykblock.x,Mykblock.y,30);
    if(hit5){
        Mykblock.gravity = -3;
        Mykblock.velocity = -1;
      
    }
    
}







function blocky(){
    this.x= 50
    this.y=  100
    this.width = 40
    this.height =10

    this.update = function(){
    fill(255)
    rect(this.x, this.y,this.width,this.height)}

}

function paddle(){
    this.x= 350;
    this.y = 550;
    this.update = function(){
        this.x=mouseX;
        fill(255,100,175);
        rect(this.x,this.y,80,15);
    }

}
function wallOne(){
    this.x=20;
    this.y=0;
    this.update = function(){
        fill(100,200,150)
        rect(this.x, this.y,780,20)
    }

    

}
function wallTwo(){
    this.x=20;
    this.y=580;
    this.update = function(){
        fill(100,200,150);
        rect(this.x,this.y,780,20)
    }
}
function wallThree(){
    this.x=0;
    this.y = 0;
    this.update = function(){
        fill(100,200,150);
        rect(this.x,this.y,20,600)
    }
}
function wallFour(){
    this.x = 780;
    this.y=0;
    this.update = function(){
        fill(100,200,150);
        rect(this.x,this.y, 20,600)
    }
}

function kBlock(){
    this.x = 500;
    this.y = 40;
    this.gravity = 3;
    this.velocity = 1;
    this.update = function(){
        this.y += this.gravity;
        this.x += this.velocity;
        fill(255,0,0)
        circle(this.x,this.y,8,)
    }
}

