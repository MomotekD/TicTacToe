const form = document.querySelector('.nameForm');

let player1Name;
let player2Name;

const gameBoard = (function(){
    let currentPlayer = 'X';
    let cells = ['', '', '', '', '', '', '', '', ''];
    let winner = null;
    let player1 = null;
    let player2 = null;
    function setPlayers(name1, name2){
        player1 = player(name1 || "Player 1", "X");
        player2 = player(name2 || "Player 2", "O");

        scoreDisplay();
    }
    function player(Name, Symbol){
        const name = Name;
        const symbol = Symbol;
        let score = 0;
        const getScore = () => score;
        const giveScore = () => score++;
        const resetScore = () => score = 0;
    
        return {name, symbol, getScore, giveScore, resetScore}
    }
    function playGame(index){
        if(winner != null){
            console.log('the game is finished')
            return
        }
        if(cells[index] != ''){
            console.warn('This cell is occupied');
            
            return
        }

        cells[index] = currentPlayer;

        winner = checkWinner();
        if(winner){
            console.log(`${winner} wins!`);
            nextRound();
            winner = null;
            return
        }
        if(cells.every(cell => cell !== '')){
            console.log("It's a draw! ");
            nextRound();
            return
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    function checkWinner(){
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

            if(cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
                winner = cells[a];
                return cells[a]
            }
            
        }
        return null
    }
    function nextRound(){
        cells = ['', '', '', '', '', '', '', '', ''];
        if(winner === player1.symbol){
            player1.giveScore();
        }else if(winner === player2.symbol){
            player2.giveScore();
        }else{
            console.log('starting new game...')
        }
        scoreDisplay();
        displayBoard();
    }
    function displayBoard(){
        const board = document.querySelector('.board');
        if(player1 === null){
            player1 = player("Player 1", "X");
            player2 = player("Player 2", "O");
        }
        scoreDisplay();
        board.innerHTML = '';
        cells = ['', '', '', '', '', '', '', '', ''];
        cells.forEach((cell, i) => {
            const Cell = document.createElement("button");
            Cell.classList.add("cell");
            Cell.addEventListener("click", () => {
                Cell.textContent = `${currentPlayer}`;
                playGame(i);

            }, { once: true });
            board.appendChild(Cell)   
        });
    }
    function scoreDisplay(){
        const player1Label = document.querySelector('.player1Score');
        const player2Label = document.querySelector('.player2Score');

        player1Label.textContent = `${player1.name} score: ${player1.getScore()}`;
        player2Label.textContent = `${player2.name} score: ${player2.getScore()}`;
    }
    function reset(){
        player1.resetScore();
        player2.resetScore();
        displayBoard();
    }
    return {
        setPlayers,
        playGame,
        displayBoard,
        reset
    };
})();

form.addEventListener("submit", (e) => {
    player1Name = document.querySelector('.player1Name')?.value;
    player2Name = document.querySelector('.player2Name')?.value;
    gameBoard.setPlayers(player1Name, player2Name);
    gameBoard.displayBoard();
    document.querySelector('.player1Name').value = '';
    document.querySelector('.player2Name').value = '';            
    e.preventDefault();
});



