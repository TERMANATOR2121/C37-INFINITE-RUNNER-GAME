var spaceImg, space;
var asteroidImg, asteroid, asteroidGroup;
var planetImg, planet, planetGroup;
var spaceship, spaceshipImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  spaceImg = loadImage("space.jpg");
  asteroidImg = loadImage("generic-asteroid.png");
  spaceshipImg = loadImage("spaceship.jpg");
  planetImg = loadImage("mercury.png");
}

function setup() {
  createCanvas(600, 600);
  space = createSprite(600,600);
  space.addImage("space",spaceImg);
  space.velocityY = 2;
  space.scale=2
  spaceship = createSprite(200,200,50,50);
  spaceship.addImage("spaceship", spaceshipImg)
  spaceship.scale= 0.2
  //spaceship.debug=true
  asteroidGroup= new Group();
  planetGroup= new Group();
  invisibleBlockGroup= new Group();
}

function draw() {
 if(gameState === "play"){

  if(keyDown("left_arrow")){
    spaceship.x = spaceship.x - 8
  }
  if(keyDown("right_arrow")){
    spaceship.x = spaceship.x + 10
  }
  if(keyDown("up_arrow")){
    spaceship.y = spaceship.y - 8
  }
  if(keyDown("down_arrow")){
    spaceship.y = spaceship.y + 8
  }
 
  if(space.y > 600){
      space.y = 0
    }

 spawnasteroids();
 spawnplanets();

  if(asteroidGroup.isTouching(spaceship)||
  planetGroup.isTouching(spaceship)||spaceship.y > 600||
  spaceship.y < 0||spaceship.x > 600||spaceship.x < 0){
    spaceship.destroy();
    spaceship.velocityY = 0
    gameState = "end"
  }

  drawSprites();
 }

  if(gameState === "end"){
    stroke("yellow")
    fill("Red")
    textSize(30);
    text("GAME OVER", 230, 250)
  }
}

function spawnasteroids(){
if(frameCount%70 === 0){
  var asteroid = createSprite(200,-50);
  asteroid.addImage(asteroidImg)
  asteroid.velocityY = 2
  asteroid.scale=0.1;
  asteroid.x = Math.round(random(50,550));
  asteroid.lifetime = 800;
  asteroidGroup.add(asteroid)
  spaceship.depth = asteroid.depth;
  spaceship.depth += 1
  }
}

function spawnplanets(){
  if(frameCount%100 === 0){
    var planet = createSprite(200,-50);
    planet.addImage(planetImg)
    planet.velocityY = 2;
    planet.scale=0.3;
    planet.x = Math.round(random(50,550));
    planet.lifetime = 800;
    planetGroup.add(planet)
    spaceship.depth = planet.depth;
    spaceship.depth += 1
  }
}
