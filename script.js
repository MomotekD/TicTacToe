const form = document.querySelector('.nameForm');

let player1Name;
let player2Name;

form.addEventListener("submit", (e) => {
    player1Name = document.querySelector('.player1Name')?.value;
    player2Name = document.querySelector('.player2Name')?.value;
    gameBoard.setPlayers(player1Name, player2Name);
    gameBoard.displayBoard();
    document.querySelector('.player1Name').value = '';
    document.querySelector('.player2Name').value = '';            
    e.preventDefault();
})

const gameBoard = {
    currentPlayer: 'X',
    cells: ['', '', '', '', '', '', '', '', ''],
    winner: null,
    player1: null,
    player2: null,
    setPlayers: function (name1, name2){
        this.player1 = this.player(name1 || "Player 1", "X");
        this.player2 = this.player(name2 || "Player 2", "O");

        this.scoreDisplay();
    },
    player: function player(Name, Symbol){
        const name = Name;
        const symbol = Symbol;
        let score = 0;
        const getScore = () => score;
        const giveScore = () => score++;
        const resetScore = () => score = 0;
    
        return {name, symbol, getScore, giveScore, resetScore}
    },
    playGame: function(index){
        if(this.winner != null){
            console.log('the game is finished')
            return
        }
        if(this.cells[index] != ''){
            console.warn('This cell is occupied');
            
            return
        }

        this.cells[index] = this.currentPlayer

        const winner = this.checkWinner()
        if(winner){
            console.log(`${winner} wins!`);
            this.nextRound();
            this.winner = null;
            return
        }
        if(this.cells.every(cell => cell !== '')){
            console.log("It's a draw! ");
            this.nextRound();
            return
        }

        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },
    checkWinner: function(){
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // collumns
            [0, 4, 8], [2, 4, 6] // diagonal
        ];
        for(let i = 0; i < winningCombinations.length; i++){
            const currentCombo = winningCombinations[i];
            
            const a = currentCombo[0];
            const b = currentCombo[1];
            const c = currentCombo[2];

            if(this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]){
                this.winner = this.cells[a];
                return this.cells[a]
            }
            
        }
        return null
    },
    nextRound: function(){
        this.cells = ['', '', '', '', '', '', '', '', ''];
        if(this.winner === this.player1.symbol){
            this.player1.giveScore();
        }else if(this.winner === this.player2.symbol){
            this.player2.giveScore();
        }else{
            console.log('starting new game...')
        }
        this.scoreDisplay();
        this.displayBoard();
    },
    displayBoard: function(){
        const board = document.querySelector('.board');
        if(this.player1 === null){
            this.player1 = this.player("Player 1", "X");
            this.player2 = this.player("Player 2", "O");
        }
        this.scoreDisplay();
        board.innerHTML = '';
        this.cells = ['', '', '', '', '', '', '', '', ''];
        this.cells.forEach((cell, i) => {
            const Cell = document.createElement("button");
            Cell.classList.add("cell");
            Cell.addEventListener("click", () => {
                Cell.textContent = `${this.currentPlayer}`;
                this.playGame(i);

            }, { once: true });
            board.appendChild(Cell)   
        });
    },
    scoreDisplay: function(){
        const player1Label = document.querySelector('.player1Score');
        const player2Label = document.querySelector('.player2Score');

        player1Label.textContent = `${this.player1.name} score: ${this.player1.getScore()}`;
        player2Label.textContent = `${this.player2.name} score: ${this.player2.getScore()}`;
    },
    reset: function(){
        this.player1.resetScore();
        this.player2.resetScore();
        this.displayBoard();
    }
}



