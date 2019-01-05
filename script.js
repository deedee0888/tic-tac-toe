var orgBoard;
const firstPlayer = 'O';
const secondPlayer = 'X';
const winSet = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
]

var currentMove = 1;
var movesMade = 0;


const cell = document.querySelectorAll('.cell');


startGame();

function startGame() {
    document.querySelector(".finish").style.display = "none";
    orgBoard = Array.from(Array(9).keys());

    for(var i = 0; i < cell.length; i++) {
        cell[i].innerText = '';
        cell[i].style.removeProperty('background-color');
        cell[i].addEventListener('click', afterClick, false );

    }

    

    function afterClick(squer) {
        if (typeof orgBoard[squer.target.id] == 'number') {  
        after(squer.target.id, firstPlayer);
        if(!checkTie()) after(bestSpot(), secondPlayer);
        } 
        
    }

    function after(squerId, player) {
        orgBoard[squerId] = player;
        document.getElementById(squerId).innerText = player;
        let gameWon = checkWin(orgBoard, player);
        if(gameWon) gameOver(gameWon)
    }

    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	    let gameWon = null;
	    for (let [index, win] of winSet.entries()) {
		    if (win.every(elem => plays.indexOf(elem) > -1)) {
			    gameWon = {index: index, player: player};
			    break;
		    }
	    }
	    return gameWon;
    }

    function gameOver(gameWon) {
        for(let index of winSet[gameWon.index]) {
            document.getElementById(index).style.backgroundColor =
            gameWon.player == firstPlayer ? "green" : "blue";
        }
        for( var i = 0; i < cell.length; i++ ) {
            cell[i].removeEventListener('click', afterClick, false );
        }
        declareWinner(gameWon.player == firstPlayer ? "Wygrana!" : "Przegrana! Spróbuj jeszcze raz.")
    }

    function declareWinner(who) {
        document.querySelector(".finish").style.display = "block";
        document.querySelector(".finish .messege").innerText = who;
    }

    function emptySquer() {
        return orgBoard.filter(s => typeof s == 'number');
    }
    function bestSpot() {
        return emptySquer()[0];
    }
    
    function checkTie() {
        if (emptySquer().length == 0) {
            for (var i = 0; i < cell.length; i++) {
                cell[i].style.backgroundColor = "green";
                cell[i].removeEventListener('click', afterClick, false);
            }
            declareWinner("Remis!")
            return true;
        }
        return false;
    }

}

