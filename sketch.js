
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, edges;
var groundImage;
var obstaclesGroup;
var cloudsGroup
var score;
var message;

function preload(){
  // loading images and animation
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
    trex_collided = loadAnimation("trex_collided.png")
    groundImage = loadImage("ground2.png")
    cloudImage = loadImage("cloud.png")
    obstacle1 = loadImage("obstacle1.png")
    obstacle2 = loadImage("obstacle2.png")
    obstacle3 = loadImage("obstacle3.png")
    obstacle4 = loadImage("obstacle4.png")
    obstacle5 = loadImage("obstacle5.png")
    obstacle6 = loadImage("obstacle6.png")
    game_overimage = loadImage("gameOver.png")
    restart_image = loadImage("restart.png")
    jumpSound = loadSound("jump.mp3")
    checkpointSound = loadSound("checkpoint.mp3")
    dieSound = loadSound("die.mp3")


}
function setup(){
    createCanvas(600,200);
    
    message = "This is just for learning scope of the variable"
  
    score = 0

    // creating ground 
    ground = createSprite(300,180,600,20)
    ground.addImage("ground",groundImage)
    
    
    // creating trex
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running",trex_running)
     trex.scale = .5
     trex.addAnimation("collided",trex_collided)
 
    // creating invisible ground
    invisibleGround = createSprite(300,190,600,10)
    invisibleGround.visible = false
 
   obstaclesGroup = new Group();

   cloudsGroup = new Group();

   trex.setCollider("rectangle",0,0,40, trex.height ) 
//   trex.debug = true
    gameOver = createSprite(300,100)
    gameOver.addImage(game_overimage)
    restart = createSprite(300,140)
    restart.addImage(restart_image)
    gameOver.scale = 0.5
    restart.scale = 0.5
}


function draw(){
    //set background color 
   // console.log(message)

    background(100);
    console.log(gameState)
    //score: 0
    text("score: " + score, 500, 20)

    if(gameState === PLAY){
         // making ground move
        ground.velocityX = -(2 +  score/100)

        gameOver.visible = false
        restart.visible = false
        //increasing score
        score = score + Math.round(frameCount/60);
        //score += 1;
        if (score % 500 == 0 && score>0){
            checkpointSound.play();

        }
        
        
        // making ground never ending
        if (ground.x < 0){
            ground.x = ground.width/2
        }

        // trex jump when space key pressed
        if(keyDown("space") &&  trex.y >= 160){

                trex.velocityY = -13;  
                jumpSound.play();
        }
          
        // adding gravity
        trex.velocityY += 0.5

        //calling spawnClouds
        spawnClouds()


        //calling spawnObstacles
        spawnObstacles()

        if (trex.isTouching(obstaclesGroup)) {
            dieSound.play();
        gameState = END
        //trex.velocityY = -12
        //jumpSound.play();
            
        }
    }
    
    else if(gameState === END){
        // making ground stop
        ground.velocityX = 0

        obstaclesGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)
        trex.changeAnimation("collided",trex_collided)
        obstaclesGroup.setLifetimeEach(-1)
        cloudsGroup.setLifetimeEach(-1)
        trex.velocityY = 0
        gameOver.visible = true
        restart.visible = true
              if(mousePressedOver(restart)){
            reset();
      }
    }
  //  var ran = Math.round(random(1,10))
   // console.log(ran);
    
    //console.log(trex.y)
   
    
   
    



   // making trex touch invisible ground instead of falling through it
    trex.collide(invisibleGround)
 
 


    drawSprites();
}

function reset(){
    gameState = PLAY
    gameOver.visible = false
    restart.visible = false
    obstaclesGroup.destroyEach()
    cloudsGroup.destroyEach()
    trex.changeAnimation("running",trex_running);
    score = 0
}

function spawnClouds(){
    if(frameCount % Math.round(random(30,80))  == 0){
        var cloud = createSprite(600,100,40, 10)
        cloudsGroup.add(cloud);
        cloud.velocityX = -3
        cloud.addImage (cloudImage)
        cloud.scale = random(.5,1);
        cloud.y = Math.round(random(10,60));
        cloud.lifetime = 200
    }

}

function spawnObstacles(){
    if(frameCount % 100  == 0){
        obstacle = createSprite(600,165,10, 40)
        obstaclesGroup.add(obstacle);
        obstacle.velocityX = -(3 +  score/100       )
    //    obstacle.addImage (cloudImage)
        obstacle.scale = .5
        obstacle.lifetime = 200
    
        var ran = Math.round(random(1,6))
        switch(ran){
            case 1:
                obstacle.addImage(obstacle1)
                break
            case 2:
                obstacle.addImage(obstacle2)
                break
            case 3:
                obstacle.addImage(obstacle3)
                break
            case 4:
                obstacle.addImage(obstacle4)
                break
            case 5:
                obstacle.addImage(obstacle5)
                break
            case 6:
                obstacle.addImage(obstacle6)
                break
            }
    }
}
