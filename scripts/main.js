function filledArray (element){
  return element !== ''
}

class AreaGame {
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
   if (this.inPlay === true ) this.switchCurrentPlayer();
   this.clicks++
 }

  checkResult(){
    if (this.clicks < 4) return // Minimum amount of clicks necessary for a win condition

    // ROW check
    for(let i = 0; i <= 6; i++){
        if (this.area[i] !== '') {
          if (this.area[i] === this.area [i+1] && this.area[i] === this.area[i+2]) {
            this.inPlay = false
            this.area[i] = 'W'
            this.area[i+1] = 'W'
            this.area[i+2] = 'W'
          }
        }
        i = i+2;
     }

    // COLUMN check
    for(let i = 0; i <= 2; i++){
        if (this.area[i] !== '') {
          if (this.area[i] === this.area [i+3] && this.area[i] === this.area[i+6]) {
            this.inPlay = false;
            this.area[i] = 'W'
            this.area[i+3] = 'W'
            this.area[i+6] = 'W'
          }
        }
     }

     //DIAGONAL check
     if (this.area[4] !== ''){
         if (this.area[0] === this.area[4] && this.area[0] === this.area[8]) {
           this.inPlay = false;
           this.area[0] = 'W'
           this.area[4] = 'W'
           this.area[8] = 'W'
         }
         else if (this.area[2] === this.area[4] && this.area[2] === this.area[6]) {
           this.inPlay = false;
           this.area[2] = 'W'
           this.area[4] = 'W'
           this.area[6] = 'W'
       }
     }

    // DRAW check
     if (this.area.every(filledArray) === true && this.inPlay === true) {
       this.isDraw = true;
       return;
     }

     // Change the color of the winning squares
     gameSquare.forEach( square => {
       if (this.area[square.getAttribute('data-index')] === 'W'){
         square.style.color = 'green';
         square.style.opacity = '1';
       }
     })

   }

 }

// CREATE
const ticTacToe = new AreaGame ();
const gameSquare = document.querySelectorAll('.game-square');
const result = document.querySelector('.tic-tac-toe-result p');
const resetButton = document.querySelector('[data-reset]');

// BUTTONS
gameSquare.forEach( square => {
  square.addEventListener ('click', () => {

    let indexValue = square.getAttribute('data-index')
    if (ticTacToe.area[indexValue] !== '' || ticTacToe.inPlay === false || ticTacToe.isDraw === true) return
    square.innerText = ticTacToe.currentPlayer;
    ticTacToe.cellClick(indexValue);

    if (ticTacToe.isDraw === true) {
      result.innerText = 'Deu velha!';
      return;
    }

    ticTacToe.inPlay === true ? result.innerText = `Jogada de ${ticTacToe.currentPlayer}` :
                                result.innerText = `Vitória de ${ticTacToe.currentPlayer}!`
  })
})

resetButton.addEventListener('click', button => {

  //reset game area
  ticTacToe.area.fill('');

  gameSquare.forEach( square => {
    square.innerText = ''
    square.style.opacity = '0.6'
    square.style.color = 'black'});

  ticTacToe.inPlay = true;
  ticTacToe.isDraw = false;
  ticTacToe.currentPlayer = 'X';
  ticTacToe.clicks = 0;
  result.innerText = `Jogada de ${ticTacToe.currentPlayer}`;

})
