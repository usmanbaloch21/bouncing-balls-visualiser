
// Global Constants 
const appWidth = 500;
const appHeight = 500;
const colours = [
"0x581845",
"0x900c3f",
"0xc70039",
"0xff5733",
"0xffc305"
];
let ballsArr = [];


// App initialisation 
const app = new PIXI.Application({
width: appWidth,
height: appHeight,
antialias: true,
transparent: false,
resolution: 1,
backgroundColor: 0xeeeeee
});
document.body.appendChild(app.view);

console.clear();

// Helper method 
function randInt(min:number, max:number): number {
    return Math.random() * (max - min) + min;
};


// Ball Class 
class Ball {
  circle: any;
    colour: string;
    size: number;
    dx: number;
    dy: number;
  
  constructor(colour:string = "0xFF0000", size: number = 15,){
    this.colour = colour;
    this.size = size;
    this.dx = randInt(5,-5);
    this.dy = randInt(5,-5);
    this.initCircle();
  }
  private initCircle(): void {
    this.circle = new PIXI.Graphics();
    app.stage.addChild(this.circle);
  };

  public createBall(): void {
      this.circle.lineStyle(0);
      this.circle.beginFill(this.colour, 1);
      this.circle.drawCircle(this.size/2,this.size/2, this.size); //horizontal - vertical - size
      this.circle.endFill();
  }

  freezeBall(): void {
    this.circle.x = this.dx;
    this.circle.y =this.dy;
  }

  public moveBall(): void {
    if(this.circle.x  > appWidth - this.size  ||  this.circle.x  < 0)
    {
    this.dx *= -1;   
  };
    if(this.circle.y  > appHeight - this.size || this.circle.y < 0  )
    {
    this.dy *= -1;
    };
     
    this.circle.y += this.dy;
    this.circle.x += this.dx;
  };
};


// Button Class
class Button {
  rectangle: any;
    text: any;
    colour: any;
    dx: number;
    dy: number;
    style: any;
    message: string;
    playPause: boolean;
  constructor(dx: number, dy: number,message:string = "button",colour:string = "0x66CCFF") {
    this.colour = colour;
    this.dx = dx;
    this.dy = dy;
    this.initButton();
    this.style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 22,
    }); 
    this.message = message;
    this.text;
    this.playPause = true; 
  }
  
  private initButton(): void {
    this.rectangle = new PIXI.Graphics();
    app.stage.addChild(this.rectangle);
    
  };

  public createButton(): void{
    this.rectangle.lineStyle(1, 0xFF3300, 1);
    this.rectangle.beginFill(this.colour);
    this.rectangle.drawRect(this.dx, this.dy, 100, 50);
    this.rectangle.endFill();
    this.text = new PIXI.Text(this.message,this.style);
    app.stage.addChild(this.text);
    this.text.x = this.dx +10;
    this.text.y = this.dy + 10;
    // Add a hit area..
    this.rectangle.hitArea = new PIXI.Rectangle(this.dx,this.dy, 100, 50);
    this.rectangle.message = this.message;
    this.rectangle.interactive = true;
    this.rectangle.buttonMode = true;
  }; 

  public runButton(): void {
      this.rectangle.click = function (e){
      switch (this.message) {
      case "Pause":
        console.log("Pause");
        break;
      case "Add":
        console.log("Add");
        break;
      case "Remove":
        console.log("Remove");
        break;
}
      }
  }
  
}




// Array helper functions 
function createBallsArray(ballCount:number): number[] {
  const balls = [];
  for (let i = 0;i< ballCount; i++){
  balls[i] = new Ball(colours[i%colours.length]);
}
  return balls;
};

function drawBalls(ballsArray: any):void{
  for (let i = 0; i < ballsArray.length; i++){
    ballsArray[i].createBall();
  }
};
function moveBalls(ballsArray: any): void{
   for (let i = 0; i < ballsArray.length; i++){
    ballsArray[i].moveBall();
  }
}
function addNewBall(ballsArray:any): void{
  ballsArray.push(new Ball());
}

function freezeBalls(ballsArray: any): void{
   for (let i = 0; i < ballsArray.length; i++){
    ballsArray[i].freezeBall();
  }
}

 

// change number in this parameter to get number of balls on the screen 
ballsArr = createBallsArray(30);

drawBalls(ballsArr);

const button1 = new Button(70,0,"Add");
button1.createButton();
button1.runButton();

const button2 = new Button(200,0,"Remove");
button2.createButton();
button2.runButton();

const button3 = new Button(330,0,"Pause");
button3.createButton();
button3.runButton();







app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta):void{
 moveBalls(ballsArr);
};
