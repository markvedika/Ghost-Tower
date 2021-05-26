var tower, towerImg;
var door, doorImage, doorsGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlockGroup;
var gameState = "play"
var sound;

function preload() {
  towerImg = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  sound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  sound.loop();
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=2;
  
  doorsGroup=createGroup();
  climberGroup=createGroup();
  invisibleBlockGroup=createGroup();
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale=0.4;
}

function draw() {
  if (tower.y>500) {
    tower.y=300;
  }
  
  if (gameState==="play") {
    if(keyDown("left_arrow")) {
      ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow")) {
    ghost.x+=3
  }
  if(keyDown("space")) {
    ghost.velocityY=-3;
  }
  ghost.velocityY+=0.1;
  
  spawnDoors();
  drawSprites();
  
  if(climberGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600) {
    ghost.destroy();
    gameState="end";
  }
  }
  if (gameState==="end") {
    stroke("yellow")
    fill("red")
    textSize(45)
    text("Game Over", 175, 300);
  }
}

function spawnDoors() {
  if (frameCount%200===0) {
    door = createSprite(random(100, 500), -50);
    door.addImage(doorImage);
    door.velocityY=2;
    door.lifetime=400;
    doorsGroup.add(door);
    
    climber = createSprite(door.x, 10);
    climber.addImage(climberImg);
    climber.velocityY=2;
    climber.lifetime=400;
    climberGroup.add(climber);
    
    invisibleBlock = createSprite(door.x, 15);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.visible=false;
    invisibleBlock.velocityY=2;
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth=door.depth+1;
    ghost.depth=climber.depth+1;
  }
}