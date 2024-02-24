var trex
var trex_running
var ground
var PLAY = 1
var END = 0
var game_state = PLAY
var trex_collided
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  ground1 = loadImage("ground2.png")
  cloud_ = loadImage("cloud.png")
  obstacle_img1 = loadImage("obstacle1.png")
  obstacle_img2 = loadImage("obstacle2.png")
  obstacle_img3 = loadImage("obstacle3.png")
  obstacle_img4 = loadImage("obstacle4.png")
  obstacle_img5 = loadImage("obstacle5.png")
  obstacle_img6 = loadImage("obstacle6.png")
  trex_collided = loadAnimation("trex_collided.png")
  restart1 = loadImage("restart.png")
  gameOver1 = loadImage("gameOver.png")
  jump_ = loadSound("jump.mp3")
  die_ = loadSound("die.mp3")
  check_point = loadSound("checkpoint.mp3")
}
function setup() 
{
  canvas = createCanvas(windowWidth,windowHeight);
  
  
  trex = createSprite(50,windowHeight-75,50,50)
  trex.addAnimation("running", trex_running)
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.8;
  edges = createEdgeSprites();
  ground = createSprite(windowWidth/2, windowHeight-50, windowWidth+200,10)
  ground.addImage("ground_", ground1)
  
  invisible_ground= createSprite(200,windowHeight-45,400,5)
  invisible_ground.visible= false;

  obstacle_group = new Group()
  cloud_group= new Group()
  trex.debug =true
  trex.setCollider("rectangle",0,0,90,trex.height)

  restart = createSprite(windowWidth/2,windowHeight/2)
  restart.addImage(restart1)

  gameOver= createSprite(windowWidth/2,(windowHeight/2)-50)
  gameOver.addImage(gameOver1)
  
}

function clouds(){
  if(frameCount%60 == 0){
    cloud = createSprite(windowWidth, 100, 50,50)
    cloud.addImage("cloud__", cloud_)
    cloud.scale=0.6
    cloud.y =Math.round(random(10, 200))
    // console.log(cloud.y)
    cloud.velocityX=-3
    cloud.lifetime = 300
    cloud.depth = trex.depth
    trex.depth = trex.depth +1
    console.log(trex.depth)
    console.log(cloud.depth)
    cloud_group.add(cloud)
  }

}
function obstacles(){
   if(frameCount%100 ==0){
    obs = createSprite(windowWidth,windowHeight-60, 10,60)
    no_ = Math.round(random(1,6))
    switch(no_){
      case 1 : obs.addImage(obstacle_img1)
                break;
      case 2 : obs.addImage(obstacle_img2)
                break;
      case 3 : obs.addImage(obstacle_img3)
                break;
      case 4 : obs.addImage(obstacle_img4)
                break;
      case 5 : obs.addImage(obstacle_img5)
                break;
      case 6 : obs.addImage(obstacle_img6)
                break;
      default : break;
    }
    obs.velocityX = -(5+score/100);
    obs.lifetime = 300;
    obs.scale = 0.5;
    obs.debug =true
    obs.setCollider("circle",0,0,50)
    obstacle_group.add(obs)
    
   }
}
score = 0;
high_score = 0;
bk = "white"
function draw() 
{
  background(bk)
  if(frameCount%100 == 0 && bk == "white"){
    bk = "black"
    background("gray")
  }
  if(frameCount%100 == 0 && bk == "black"){
    bk = "white"
    background("white")
  }

  text("score : " + score, windowWidth-100,50)
  text("HS : " + high_score,windowWidth-175,50)
  trex.velocityY = trex.velocityY+0.9;
  trex.collide(invisible_ground)
  if(game_state == PLAY){
    restart.visible = false;
    gameOver.visible = false;
      if((keyDown(UP_ARROW)|| touches.length>0 )&& trex.y > windowHeight-150 ){
      
        trex.velocityY = -15;
        jump_.play()
        touches = []
    }
    clouds()
    obstacles()

    if(ground.x <280){
      ground.x = ground.width/2;
    }
   

    score= score+Math.round(getFrameRate()/60)
    if(score%500 ==0 && score >0){
      check_point.play()
    }
    
    ground.velocityX = -5;  
    if(trex.isTouching(obstacle_group)){
      game_state = END
      console.log(game_state)
      die_.play()

      // trex.velocityY = -12;
      // jump_.play()
    }
    
  }
  else if(game_state == END){
    
    restart.visible = true;
    gameOver.visible = true;
    trex.changeAnimation("collided",trex_collided)
    ground.velocityX = 0
    trex.velocityY =0
    cloud_group.setVelocityXEach(0)
    obstacle_group.setVelocityXEach(0)
    obstacle_group.setLifetimeEach(-1)
    cloud_group.setLifetimeEach(-1)
    if(high_score < score){
      high_score = score
    }
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  // console.log(frameCount)
  drawSprites();
}
function reset(){
  game_state = PLAY
  restart.visible = false
  gameOver.visible = false
  obstacle_group.destroyEach()
  cloud_group.destroyEach()
  trex.changeAnimation("running", trex_running)
  score = 0;
}

// n = 10
// sum = 0
// for(i=1; i<=n; i++){
//   sum= i+sum
// }

// console.log(sum)
// a = 11
// b=2
// console.log("answer :" + a%b)

// abc = [25,32,65,44,72,85]
// for(i=0; i<=5; i++){

//   ans = abc[i]%2
//   if(ans==0){
//     console.log(abc[i] + "is even")
//   }
  
// }

// abc =[50, 10, 30,25,40,82,39]

// for(i=0; i<=abc.length;i++){
//   if(abc[i]==40){
//     console.log(" 40 is present")
//   }

// }