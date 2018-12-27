var orgBord;
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

const cell = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".finish").style.display = "none";
    orgBord = Array.from(Array(9).keys());

    for(var i = 0; i < cell.length; i++) {
        cell[i].innerText = '';
        cell[i].style.removeProperty('background-color');
        cell[i].addEventListener('click', whenClick, false );

    }

    function whenClick(squer) {
        when(squer.target.id, firstPlayer);
    }

    function when(squerId, player) {
        orgBord[squerId] = player;
        document.getElementById(squerId).innerText = player;
        let gameWon = checkWin(orgBord, player);
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
            gameWon.player == firstPlayer ? "green" : "red";
        }
        for( var i = 0; i < cell.length; i++ ) {
            cell[i].removeEventListener('click', whenClick, false );
        }
    }

}

