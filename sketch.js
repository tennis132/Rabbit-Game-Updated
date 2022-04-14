const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var ground;
var rope;
var rope2;
var rope3;
var fruit;
var fruitConnect;
var fruitConnect2;
var fruitConnect3;
var bgimg;
var fruitimg;
var rabbit;
var rabbitimg;
var button;
var button2;
var button3;
var blinkimg,eatimg,sadimg;
var cutsound,bgsound,sadsound,eatsound,airsound
var airBlow

let engine;
let world;

function preload()
{
bgimg = loadImage("background.png")
fruitimg = loadImage("melon.png")
rabbitimg = loadImage("Rabbit-01.png")
blinkimg = loadAnimation("gameimages/blink_1.png","gameimages/blink_2.png","gameimages/blink_3.png")
eatimg = loadAnimation("gameimages/eat_0.png","gameimages/eat_1.png","gameimages/eat_2.png","gameimages/eat_3.png","gameimages/eat_4.png")
sadimg = loadAnimation("gameimages/sad_1.png","gameimages/sad_2.png","gameimages/sad_3.png")
bubbleimg = loadImage("bubble.png")

cutsound = loadSound("sound/Cutting Through Foliage.mp3")
bgsound = loadSound("sound/sound1.mp3")
sadsound = loadSound("sound/sad.wav")
eatsound = loadSound("sound/eating_sound.mp3")
airsound = loadSound("sound/air.wav")

blinkimg.playing = true //activates the blinkimg
eatimg.playing = true //activates the eatimg
eatimg.looping = true //keeps it going forever
sadimg.looping = false
eatimg.looping = false
sadimg.playing = true
}


function setup() 
{
  createCanvas(windowWidth, windowHeight);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)


  //creating a ground
  ground = new Ground(1000,300,200,20)

  //creating a rope
  rope = new Rope(7,{x:550, y:330})
  //6 = the number of partitions 
  //{x:245, y:30} = position of the rope

  rope2 = new Rope(7,{x:695, y:500})

  rope3 = new Rope(7,{x:390, y:370})


//creating physcial properties for the fruit
  var fruitOptions = 
  {
    isStatic: false,
  }

  //creating a fruit
fruit = Bodies.circle(300, 300, 15, fruitOptions)
World.add (world, fruit)


//composite creates a box to add the things that are going to be connected
Matter.Composite.add(rope.body, fruit)

//linking the fruit and the rope
  fruitConnect = new Link(rope, fruit)
  fruitConnect2 = new Link(rope2, fruit)
  fruitConnect3 = new Link(rope3, fruit)
imageMode (CENTER)
blinkimg.frameDelay = 20 //delaying the the animation timing
eatimg.frameDelay = 20 //delaying the animation timing
sadimg.frameDelay = 20 //delaying the animation timing
//creating the rabbit
rabbit = createSprite(1000,225,100,100)
rabbit.addAnimation("blink", blinkimg)
rabbit.addAnimation("eat", eatimg)
rabbit.addAnimation("sad", sadimg)
rabbit.changeAnimation("blink")
rabbit.scale = 0.2

bubble = createSprite(300,700,100,100)
bubble.addImage("bubble", bubbleimg)
bubble.scale = 0.2

//creating a button
button = createImg("cut_button.png")
button.position(525,330)
button.size(50,50)
button.mouseClicked(Drop)//calling the drop function

button2 = createImg("cut_button.png")
button2.position(650,500)
button2.size(50,50)
button2.mouseClicked(Drop2)

button3 = createImg("cut_button.png")
button3.position(370,350)
button3.size(50,50)
button3.mouseClicked(Drop3)

airblow = createImg("gameimages/blower.png")
airblow.position(10,250)
airblow.size(100,100)
airblow.mouseClicked(Blow)

//bgsound.play()
bgsound.setVolume(0.1)
}

function draw() 
{
  background(51);
  //giving background image
  image (bgimg, width/2, height/2, windowWidth, windowHeight)
  
  //creating the display function codes for the fruit

  
  push ()
  fill ("red")
  pop ()
  

 //displaying the ground by calling the display function in the ground file 
ground.display()

//displaying the rope by calling the display function in the rope file
 rope.show()
 rope2.show()
 rope3.show()
 if(fruit!=null)
 {
  var pos = fruit.position
  image (fruitimg, pos.x, pos.y, 60, 60)
 }
 Engine.update(engine);

if(collide(fruit,rabbit)==true)
{
  rabbit.changeAnimation("eat")
  fruit.remove()
}
if(collide(fruit,ground.body)==true)
{
  rabbit.changeAnimation("sad")
  fruit.remove()
}

if(collide(fruit,bubble)==true)
{
  bubble.remove()
}



 //display the rabbit
 drawSprites()
}



function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(d<=80)
    {
      
      return true
    }
    else
    {
      return false
    }
  }
}



function Drop()
{
fruitConnect.detach()
rope.break()
//once the fruit get detached from the rope the connection turns to be null(doesn't exist)
fruitConnect = null
}

function Drop2()
{
fruitConnect2.detach()
rope2.break()
//once the fruit get detached from the rope the connection turns to be null(doesn't exist)
fruitConnect2 = null
}



function Drop3()
{
fruitConnect3.detach()
rope3.break()
//once the fruit get detached from the rope the connection turns to be null(doesn't exist)
fruitConnect3 = null
}



function Blow()
{
  Matter.Body.applyForce(fruit,{x:0, y:0}, {x:0.01, y:0})
  airsound.play()
}

function Mute()
{
  
}
