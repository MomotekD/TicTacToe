const gameBoard = {
    currentPlayer: 'X',
    cells: ['', '', '', '', '', '', '', '', ''],
    winner: null,
    player: function player(Name, Symbol){
        const name = Name;
        const symbol = Symbol;
        let score = 0;
        const getScore = () => score;
        const giveScore = () => score++;
    
        return {name, symbol, getScore, giveScore}
    },
    playGame: function(index){
        if(this.winner != null){
            console.log('the game is finished')
            return
        }
        if(this.cells.every(cell => cell !== '')){
            console.log("It's a draw! ");
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
        if(this.winner === player1.symbol){
            player1.giveScore();
        }else{
            player2.giveScore();
        }
    }
}



const player1 = gameBoard.player(`Momotek`, "X");
const player2 = gameBoard.player(`Momotek2`, "O");


