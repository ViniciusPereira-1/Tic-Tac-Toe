function filledArray (element){
  return element !== ''
}

class GameArea {
  constructor(){
    this.inPlay = true;
    this.area = ['', '', '',
                 '', '', '',
                 '', '', ''];
    this.clicks = 0;
    this.currentPlayer = 'X';
    this.isDraw = false;
  }

  switchCurrentPlayer(){
    this.currentPlayer === 'X' ? this.currentPlayer = 'O' :
                                 this.currentPlayer = 'X'
  }

  cellClick(index){
   this.area[index] = this.currentPlayer;
   this.checkResult();
   if (this.inPlay === true) this.switchCurrentPlayer();
   this.clicks++
 }

  checkResult(){
    if (this.clicks < 4) return // Minimum amount of clicks necessary for a win condition

    // ROW check
    for(let i = 0 ; i <= 6 ; i++){
        if (this.area[i] !== '') {
          if (this.area[i] === this.area [i+1] && this.area[i] === this.area[i+2]) {
            this.inPlay = false
            this.area[i] = this.area[i+1] = this.area[i+2] = 'W'
            }
          }
        i = i + 2;
     }

    // COLUMN check
    for(let i = 0 ; i <= 2 ; i++){
        if (this.area[i] !== '') {
          if (this.area[i] === this.area [i+3] && this.area[i] === this.area[i+6]) {
            this.inPlay = false;
            this.area[i] = this.area[i+3] = this.area[i+6] = 'W'
            }
        }
     }

     //DIAGONAL check
     if (this.area[4] !== ''){
         if (this.area[0] === this.area[4] && this.area[0] === this.area[8]) {
           this.inPlay = false;
           this.area[0] = this.area[4] = this.area[8] = 'W'
           }
         else if (this.area[2] === this.area[4] && this.area[2] === this.area[6]) {
           this.inPlay = false;
           this.area[2] = this.area[4] = this.area[6] = 'W'
           }
     }

    // DRAW check
     if (this.area.every(filledArray) === true && this.inPlay === true) {
       this.isDraw = true;
     }

     // Change the color of the winning squares
     gameSquare.forEach( square => {
       if (this.inPlay === false || this.isDraw === true){
         if (this.area[square.getAttribute('data-index')] === 'W'){
           square.style.color = 'green';
           square.style.opacity = '1';
         } else {
           square.style.color = 'grey';
           square.style.opacity = '0.3';
        }
       }
    })

   }

   gameReset(){
     ticTacToe.area.fill('');

     gameSquare.forEach (square => {
       square.textContent = ''
       square.style.opacity = ''
       square.style.color = ''
     });

     this.inPlay = true;
     this.isDraw = false;
     this.currentPlayer = 'X';
     this.clicks = 0;
     result.textContent = `Jogada de ${this.currentPlayer}`;
   }

 }

// CREATE
const ticTacToe = new GameArea();
const gameSquare = document.querySelectorAll('.game-square');
const result = document.querySelector('.tic-tac-toe-result p');
const resetButton = document.querySelector('[data-reset]');

// BUTTONS
gameSquare.forEach( square => {
  square.addEventListener ('click', () => {

    let indexValue = square.getAttribute('data-index')
    if (ticTacToe.area[indexValue] !== '' || ticTacToe.inPlay === false || ticTacToe.isDraw === true) return
    square.textContent = ticTacToe.currentPlayer;
    ticTacToe.cellClick(indexValue);

    if (ticTacToe.isDraw === true) {
      result.textContent = 'Deu velha!';
      return;
    }

    ticTacToe.inPlay === true ? result.textContent = `Jogada de ${ticTacToe.currentPlayer}` :
                                result.textContent = `Vitória de ${ticTacToe.currentPlayer}!`
  })
})

resetButton.addEventListener('click', button => {
  ticTacToe.gameReset();
})
