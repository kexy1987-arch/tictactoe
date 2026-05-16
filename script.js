const boardEl = document.getElementById("board");
let board = new Array(9).fill(null);

function Player(name, marker, color){
    return{
        name,
        marker,
        color
    }
}; 

function capitalize(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
}

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

getPlayersName()


