var estadodejogo = "vivo";
var gpcacto;
var gpnuve;
var floor, imagefloor;
var invisiblefloor;
var trex ,trex_running;
var cacto1;
var cacto2;
var cacto3;
var cacto4;
var cacto5;
var cacto6;
var score;
var botaorestart;
var gameover;
var trexjump;
var trexMORTE;
var trexPONTO;
var pontuacao;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");

  trexjump = loadSound("jump.mp3");
  trexMORTE = loadSound("die.mp3");
  trxPONTO = loadSound("checkPoint.mp3");

  imagenuvem = loadImage("cloud.png");
  imagefloor = loadImage("ground2.png");

  botaorestart = loadImage("botaorestart.png");
  gameover = loadImage("gameOver.png");

  cacto1 = loadImage("obstacle1.png");
  cacto2 = loadImage("obstacle2.png");
  cacto3 = loadImage("obstacle3.png");
  cacto4 = loadImage("obstacle4.png");
  cacto5 = loadImage("obstacle5.png");
  cacto6 = loadImage("obstacle6.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  pontuacao = 000;

  invisiblefloor = createSprite(width/2, height/2, width, 0.1);

  game1over = createSprite(width/2, height/2 -250, 20, 20);
  game1over.addImage (gameover);
  game1over.visible = false;
  game1over.scale = 2;

  restart = createSprite(width/2, height/2 -150, 20, 20);
  restart.addImage (botaorestart);
  restart.visible = false;

  trex = createSprite(50,160,20,50);
  trex.addAnimation ("running", trex_running);
  trex.frameDelay = 1.5;

  trex.setCollider("circle", -10,0, 42);

  floor = createSprite (width/2, height/2, 20, 20);
  floor.addImage ("floor",imagefloor);

  gpnuve = new Group();
  gpcacto = new Group();
}

function draw(){
  background("white");
  drawSprites();

  fill("black");
  textSize(30);
  text(pontuacao, width -100, 40);

  if(estadodejogo == "vivo"){
    trex.velocityY += 0.4;
    floor.velocityX = -10;

    pontuacao = pontuacao+Math.round(getFrameRate()/60);

    restart.visible = false;
    game1over.visible = false;


    if(frameCount%55==0){
      nuve()
      cact()
      
      }

   if (trex.collide (invisiblefloor)){
    if (touches.length>0 || keyDown("space")) {     
        trex.velocityY = -10;
        trexjump.play();
      }
    }
  
    if (floor.x<0){
      floor.x = floor.width/2;
    }

    if (gpcacto.isTouching(trex)){
      estadodejogo = "morto";

      trexMORTE.play();
    }
  }

  if(estadodejogo == "morto"){

    trex.addAnimation("MORREU", trex_collided);
    trex.changeAnimation("MORREU");

    if(touches.length>0 || mousePressedOver(restart)){
      estadodejogo = "vivo";

      trex.changeAnimation("running");

      pontuacao = 0;

      restart.visible = false;
      game1over.visible = false;

      gpcacto.destroyEach();
      gpnuve.destroyEach();
    }

    game1over.visible = true;
    restart.visible = true;

    trex.velocityY = 0.0;
    floor.velocityX = 0.0;

    gpcacto.setVelocityXEach(0.0);
    gpnuve.setVelocityXEach(0.0);
  }
} 
  
  function nuve(){
    var nuvem = createSprite (width, 75, 20, 20);

    nuvem.velocityX = -9;

    nuvem.y = Math.round(random(50,100));

    nuvem.addImage(imagenuvem);
    nuvem.lifetime = 69.5;

    trex.depth = 6;
    nuvem.depth = 1;

    gpnuve.add(nuvem);
  }

  function cact(){
    var cacto = createSprite (width, height/2 -30, 20, 20);
    var UmASeis = Math.round(random(1,6));

    cacto.velocityX = -9;

    switch(UmASeis){
      case 1: cacto.addImage(cacto1);
      break 
      case 2: cacto.addImage(cacto2);
      break 
      case 3: cacto.addImage(cacto3);
      break 
      case 4: cacto.addImage(cacto4);
      break 
      case 5: cacto.addImage(cacto5);
      break 
      case 6: cacto.addImage(cacto6);
      break 
     }

     gpcacto.add(cacto);
  } 