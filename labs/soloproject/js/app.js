//followed a tutorial online on how to make a minsweeper game i think it turned out ok?

function getAroundIdx(rowCount, i, j) {
    let indices = [];

    // top-left
    if (i > 0 && j > 0) {
      indices.push([i - 1, j - 1]);
    }

    // top
    if (i > 0) {
      indices.push([i - 1, j]);
    }

    // top-right
    if (i > 0 && j < rowCount - 1) {
      indices.push([i - 1, j + 1]);
    }
    // left
    if (j > 0) {
      indices.push([i, j - 1]);
    }
    // right
 if (j < rowCount - 1) {
  indices.push([i, j + 1]);

    }
    // bottom-left
    if (i < rowCount - 1 && j > 0) {
      indices.push([i + 1, j - 1]);
    }
    // bottom
    if (i < rowCount - 1) {
      indices.push([i + 1, j]);
    }
    // bottom-right
    if (i < rowCount - 1 && j < rowCount - 1) {
      indices.push([i + 1, j + 1]);
    }
    return indices;

  }
  function newBoard(rowCount, bombCount) {
    let board = [];
    for (let i = 0; i < rowCount; i++) {
      board[i] = [];
      for (let j = 0; j < rowCount; j++) {
        board[i][j] = { around: 0, isMark: false, isClear: false };
      }
    }



   

    while (bombCount > 0) {

      let randRow = Math.floor(Math.random() * rowCount);//adds the bombs to the board

      let randCol = Math.floor(Math.random() * rowCount);



      if (board[randRow][randCol].around !== -1) {

        board[randRow][randCol].around = -1;

        bombCount--;

      }

    }



    //create it 

    for (let i = 0; i < rowCount; i++) {

      for (var j = 0; j < rowCount; j++) {

        if (board[i][j].around === -1) {

          getAroundIdx(rowCount, i, j).forEach(pos => {

            if (board[pos[0]][pos[1]].around !== -1) {

              board[pos[0]][pos[1]].around ++;

            }

          })

        }

      }

    }



    return board;

  }



  function recurClear(row, col, cells, visitedPoses) {

    visitedPoses = visitedPoses || [];



    getAroundIdx(cells.length, row, col).forEach(pos => {

      if (!visitedPoses.some(p => p[0] === pos[0] && p[1] === pos[1])) {

        visitedPoses.push(pos);



        let [x, y] = pos;

        if (cells[x][y].around === 0) {

          cells[x][y].isClear = true;

          recurClear(x, y, cells, visitedPoses);

        } else if (cells[x][y].around > 0) {

          cells[x][y].isClear = true;

        }

      }

    });

  }



  new Vue({

    el: '#app',

    data() {

      const rowCount = 4;

      const bombCount = 2;



      return { 

        bombCount,

        rowCount,

        result: '',

        cells: newBoard(rowCount, bombCount) 

      }

    },

    methods: {

      showCell(cell) {

        if (cell.isMark) {

          return '√';

        } else if (cell.isClear) {

          if (cell.around === -1) {

            return 'X';

          } else if (cell.around > 0) {

            return cell.around;

          } else {

            return '';

          }

        } else {

          return '';

        }

      },

      checkWin() {

        let { cells } = this.$data;

        let length = cells.length;

        let unclearBombCount = 0;



        for (let i = 0; i < length; i++) {

          for (let j = 0; j < length; j++) {

            let cell = cells[i][j];



            // remember to use if statements below idiot christian

            if (cell.around !== -1 && !cell.isClear) {

              return false;

            }



            if (!cell.isClear && cell.around === -1) {

              unclearBombCount++;

            }

          }

        }



        return unclearBombCount == this.bombCount;

      },

      filp(i, j, cell) {

        if (cell.isMark) {

          cell.isMark = false;

          return;

        }



        cell.isClear = true;



        if (cell.around === -1) {

          this.clearAll();

          this.result = 'Game Over';

          return;

        } else {

          // spread around

          if (cell.around === 0) {

            recurClear(i, j, this.cells);

          }



          if (this.checkWin()) {

            this.clearAll();

            this.result = 'You Win';

          }

        } 

      },

      clearAll() {

        let { cells } = this.$data;

        let length = cells.length;



        for (let i = 0; i < length; i++) {

          for (let j = 0; j < length; j++) {

            cells[i][j].isClear = true;

          }

        }

      },

      mark(cell, event) {

        cell.isMark = !cell.isMark;



        event.preventDefault();

      },

      restart() {

        if (this.bombCount >= this.rowCount * this.rowCount) {

          alert('Too many bombs');

          return;

        }

        

        this.cells = newBoard(this.rowCount, this.bombCount);

        this.result = '';

      }

    }

  })