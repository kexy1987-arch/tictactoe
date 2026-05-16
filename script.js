const boardEl = document.getElementById("board");
//let board = new Array(9).fill(null);

function Player(name, marker){
    return{
        name,
        marker,
        score: 0
    }
}; 

const GetPlayersName = (function() {
    const player1Name = document.getElementById("player1-name");
    const player2Name = document.getElementById("player2-name");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const playBtn = document.querySelector("button[type=submit]")
    playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        Gameboard.player1.name = player1Input.value;
        Gameboard.player2.name = player2Input.value;
        player1Name.textContent = Gameboard.player1.name;
        player2Name.textContent = Gameboard.player2.name;
    })
})();

const Gameboard = (function() {
    const board = new Array(9).fill(null);
    const player1 = new Player("Player1", "x");
    const player2 = new Player("Player2", "o");

    let actualPlayer = player1;
    let gameOver = false;
    let winner;



    function createBoard() {
        board.forEach((element, index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.id = index
            boardEl.appendChild(square);
            square.addEventListener("click", (e) => {
                round(e, index);
            })
        });
    };

    createBoard();

    return {
        board,
        player1,
        player2,
        createBoard,
        get actualPlayer() {return actualPlayer},
        set actualPlayer(p) {actualPlayer = p},
        get gameOver() {return gameOver},
        set gameOver(v) {gameOver = v},
        get winner() {return winner},
        set winner(w) {winner = w}
    };
})();

function win(board) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("winner").textContent = Gameboard.actualPlayer.name;
            Gameboard.gameOver = true;
            return;
        }
    }
};

function round(e, index) {
    if (Gameboard.gameOver) {
        return;
    }
    if (Gameboard.board[index] !== null) {
        return;
    } else {
        Gameboard.board[index] = Gameboard.actualPlayer.marker;
        e.target.textContent = Gameboard.actualPlayer.marker;

        if (win(Gameboard.board) !== undefined) {
            return;
        };
        Gameboard.actualPlayer = Gameboard.actualPlayer === Gameboard.player1 
                                    ? Gameboard.player2 
                                    : Gameboard.player1;
    };
};

const clearBoardBtn = document.getElementById("clear-board-btn");
clearBoardBtn.addEventListener("click", () => resetBoard());

function resetBoard() {
    Gameboard.board.fill(null);
    Gameboard.actualPlayer = Gameboard.player1;
    boardEl.innerHTML = "";
    gameOver = false;
    Gameboard.createBoard();
};

function capitalize(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
};





/*
function getPlayersName(){
    const player1Name = document.getElementById("player1-name");
    const player2Name = document.getElementById("player2-name");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const playBtn = document.querySelector("button[type=submit]")
    playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const player1 = new Player(capitalize(player1Input.value), "x", "red");
        const player2 = new Player(capitalize(player2Input.value), "o", "green");
        player1Name.textContent = player1.name;
        player2Name.textContent = player2.name;
        game(player1, player2)
        console.log(player1Input.value)
        console.log(player2)
    })
}

let gameOver = false;

function win(board){
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6] 
    ];

    for (const [a, b, c] of winningCombos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            return board[a] + " wins!";
        }
    }
};

let actualPlayer;

function game(player1, player2){

    actualPlayer = player1;
    
    function round(e, index) {
        if(gameOver){
            return;
        }
        if (board[index] !== null){
            console.log(actualPlayer)
            return;
        }else{ 
            board[index] = actualPlayer.marker;
            e.target.style.backgroundColor = actualPlayer.color;
            e.target.textContent = actualPlayer.marker;
            
            if (win(board) !== undefined) {
                document.getElementById("winner").textContent = actualPlayer.name;
                return
            };
            actualPlayer = actualPlayer === player1 ? player2 : player1;
        };
    }
    
    function createBoard() {
        
        board.forEach((element, index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.id = index
            boardEl.appendChild(square);
            square.addEventListener("click", (e) => {
                round(e, index);
            })
        });
    };

    const clearBoardBtn = document.getElementById("clear-board-btn");
    clearBoardBtn.addEventListener("click", () => resetBoard(player1));

    function resetBoard(player1) {
        board = new Array(9).fill(null);
        actualPlayer = player1;
        boardEl.innerHTML = "";
        createBoard();
        gameOver = false;
        console.log(board);
    }

    createBoard();
}

*/
