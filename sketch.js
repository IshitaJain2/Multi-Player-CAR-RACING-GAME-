var database;
var canvas,backgroundImg,gameState=0,playerCount,form,player,game;
var allPlayers,distance=0;
var cars,car1,car2,car3,car4;

function preload(){
track = loadImage("images/track.jpg");
car1_img = loadImage("images/car1.png");
car2_img = loadImage("images/car2.png");
car3_img = loadImage("images/car3.png");
car4_img = loadImage("images/car4.png");
ground = loadImage("images/ground.png");
}

function setup(){
        database = firebase.database();
    console.log(database);
    createCanvas(displayWidth-20,displayHeight-30);
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    if (playerCount===4){
        //when there are 4 players it will show the gamestate as 1 in database
        game.update(1);

    }

    if(gameState === 1){
        clear();
        game.play();
    }

    if(gameState === 2){
       game.end();
        }
}