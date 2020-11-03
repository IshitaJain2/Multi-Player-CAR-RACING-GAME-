class Player{
    constructor(){
        this.index = null;
        this.name = null;
        this.distance = 0;
        this.rank = null;
    }

    getCount(){
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value",(data)=>{
            playerCount = data.val();

        })
    }

    updateCount(count){
        database.ref('/').update({
           playerCount:count
        
        })
    }

    update(){
        var playerIndex = "players/player"+this.index;
        //previsious things deleted and new things will be added (set function)
        database.ref(playerIndex).set({
            name:this.name,
            distance:this.distance
        })
    }
   
    //static function is the function which is common to all objects creted using that particular class
    static getPlayerInfo (){
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value",(data)=>{
            allPlayers = data.val();
        })
    }
     
    getCarsAtEnd(){
        database.ref('CarsAtEnd').on("value", (data) =>{
            this.rank = data.val();
        })

    }

     static updateCarsAtEnd(rank){
        database.ref('/').update({
            CarsAtEnd:rank
        })
    }
}

