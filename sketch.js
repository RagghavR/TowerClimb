var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "start"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,200,10,10)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4
  doorg = createGroup()
  climberg = createGroup()
  blockg = createGroup()
  spookySound.play()
  spookySound.setVolume(0.3)
  Play = createButton("Start")
}

function draw() {
  background("black");

  if (gameState === "start"){
    textSize(30)
    text("Use Space to go up",100,300)
    textSize(20)
    text("Use arrow keys or a & d to move left and right",100,350)
    Play.position(280,400)
    Play.mousePressed(function(){
      Play.hide()
      gameState = "play"
    })
    
  }

  if (gameState === "play"){
  ghost.velocityY = ghost.velocityY + 0.5
  ghost.velocityX = 0
  if(tower.y > 400){
      tower.y = 300
    }
  drawSprites()
  if (keyDown("Space")){
    ghost.velocityY = -10
  }
  if (keyDown("left_arrow")||keyDown("a")){
    ghost.velocityX = -2
  } 
  if(keyDown("right_arrow") || keyDown("d")){
    ghost.velocityX = 2
  }
  doors()
  ghost.collide(climberg)
  if(ghost.isTouching(blockg)|| ghost.y>600 || ghost.y < 0|| ghost.x < 0|| ghost.x > 600) {
    gameState = "end"
  }
  
  }
  
  if (gameState === "end"){
    ghost.destroy()
    tower.destroy()
    doorg.destroyEach()
    climberg.destroyEach()
    blockg.destroyEach()
    textSize(50)
    fill("red")
    text("Game Over",150,300)
    restart = createButton("Reset")
    restart.position(275,400)
    restart.mousePressed(function(){
      location.reload()
    })
    
  }

  ghost.debug = false
  ghost.setCollider("rectangle",-30,25,180,250)
  
}


function doors(){
  if(frameCount%300=== 0){
    door = createSprite(random(100,500),-50,10,10)
    door.addImage(doorImg)
    door.velocityY = 1
    doorg.add(door)
    ghost.depth = door.depth + 1
    climber = createSprite(door.x,door.y+70,10,10)
    climber.addImage(climberImg)
    climber.velocityY = 1
    climberg.add(climber)

    block = createSprite(door.x,door.y+80,80,10)
    block.velocityY = 1
    block.visible = false
    blockg.add(block)
  }
}
