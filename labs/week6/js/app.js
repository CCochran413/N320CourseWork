var app = new Vue({
    el: "#app",
    data: {
        gameOver: false,
        playerTurn: 1,
        grid: [
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0],
        ],
    },
        methods: {
            selectCell: function(row, col) {

                var moveRow = this.lowestMove(col);

                if(moveRow >= 0 && !this.gameOver){

                    var tempGrid = this.grid.slice(0);
                    tempGrid[moveRow][col] = this.playerTurn;
                    this.grid = tempGrid;
    
                    this.playerTurn = (this.playerTurn == 1) ? 2 : 1;
    
                    this.checkWin();
                }
            },
            checkWin: function() {//loop through the rows and cols to check if 4 match displaying the game over
                
                for(let r = 0; r <= 5; r++){
                    
                    for(let c = 0; c <= 3; c++){
                        
                        let cells = [this.grid[r][c],this.grid[r][c+1],this.grid[r][c+2],this.grid[r][c+3]];
                        let sum = 0;
                        
                        if(!cells.includes(0)){
                            
                            for(let s = 0; s < 4; s++){
                                sum += cells[s];
                            }
                           
                            if(sum / 4 == cells[0]){
                                this.gameOver = true;
                            }
                            if (sum == [1,1,1,1]){
                                this.gameOver = true;
                            }
                        }
                    }
                }

            },
            lowestMove: function(col) {
                for(var row = 5; row >= 0; row--){
                    if(this.grid[row][col] == 0){
                        return(row);
                    }
                }
            }
        },
});