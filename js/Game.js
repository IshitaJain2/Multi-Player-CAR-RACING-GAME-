class Game{
    constructor(){

    }

    getState(){
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState = data.val();

        })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        })
    }
//async-: when we have to take datbase from any other website ,so it takes a little bit more time,means it is not in proper ordering.
    async start(){
        if (gameState === 0) {
            player = new Player();
            //once means doing it only once for a particular use
            //await-: it is awaiting for the data which is coming from firebase console(website)
            var playerCountRef = await database.ref('playerCount').once("value");
            if(playerCountRef.exists ()){
                playerCount = playerCountRef.val();
                player.getCount();
            }

            form = new Form();
            form.display();
        }

        car1 = createSprite(100,200);
        car1.addImage("car1",car1_img);
         car2 = createSprite(300,200);
         car2.addImage("car2",car2_img);
         car3  =createSprite(500,200);
         car3.addImage("car3",car3_img);
        car4 = createSprite(700,200);
        car4.addImage("car4",car4_img);
        //array sign [] array is like
        cars = [car1,car2,car3,car4]       
    }

    play(){
        form.hide();
        //textSize(30);
        //text("GAME STARTS",100,100);
        //when static function we will call Class "PLAYER" (all capitals)
        Player.getPlayerInfo();
        player.getCarsAtEnd();

        // !== is the sign for not equal
        if(allPlayers !== undefined){
            background(rgb(198,135,103));
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
            //index is the position of each array element
            var index = 0
            var x = 150;
            var y ;
            //var display_position = 150;//plr 
            for(var plr in allPlayers){
                index = index+1;
                 //check 65 line
                  x= x+200;
                 y = displayHeight - allPlayers[plr].distance
                 cars[index - 1].x = x;
                 cars[index - 1].y = y;

              if(index === player.index){
                  stroke(10);
                  fill("red");
                  ellipse(x,y,60,60);
                 cars[index-1].shapeColor = "red";
                 camera.position.x = displayWidth/2;
                 camera.position.y = cars[index-1].y;
              }
              
              //display_position += 20;
              //textSize(15);
              //text(allPlayers[plr].name+ ": " + allPlayers[plr].distance,120,display_position);
            }

        }

        if(keyIsDown(UP_ARROW)&& player.index !==null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>3860){
           gameState = 2;
           player.rank += 1;
           Player.updateCarsAtEnd(player.rank);
        }
        drawSprites();
    }
    end(){
        console.log("ended");
        console.log(player.rank);
    }
}
