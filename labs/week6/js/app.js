var app = new Vue({
    el: "#app",
    data: {
        gameOver: false,
        playerTurn: 1,
        grid: [
            [0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,],
            [0,0,0,0,0,0,0,],
        ]
    },
    methods:{
        selectCell: function(row, col){
            var moveRow= this.lowestMove(col);
        if(moveRow > 0){
            //copy grid to a temp var
            var tempGrid = this.grid.slice(0);

            //modify the clone verison
            tempGrid[row][col]=this.playerTurn;

            //replace
            this.grid = tempGrid;
            this.playerTurn = (this.playerTurn == 1) ? 2 : 1 ;}

            this.checkWin();
            //check for win
        },
        checkWin: function(){
            //loop through all colums to check 
            // if win found, set over to true
        },
        lowestMove: function(col){
            for(var row = 5; row>= 0; row--){
                if (this.grid[row][col]==0){
                    return(row);
                }
            }
        }
    }
})