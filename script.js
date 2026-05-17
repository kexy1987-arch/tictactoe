const boardEl = document.getElementById("board");

function Player(name, marker, color){
    return{
        name,
        marker,
        color,
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
        const form = document.getElementById("get-player");
        form.classList.add("fade");
        void form.offsetWidth;
        console.log(e.target.parentElement)
        setTimeout(() => {
            form.hidden = true;
        }, 2000);
        Gameboard.player1.name = capitalize(player1Input.value);
        Gameboard.player2.name = capitalize(player2Input.value);
        player1Name.textContent = Gameboard.player1.name;
        player2Name.textContent = Gameboard.player2.name;
    })
})();

const Gameboard = (function() {
    const board = new Array(9).fill(null);
    const player1 = new Player("Player1", "x", "orange");
    const player2 = new Player("Player2", "o", "orangered");

    let actualPlayer = player1;
    let gameOver = false;
    let winner;



    function createBoard() {
        board.forEach((element, index) => {
            const square = document.createElement("div");
            square.classList.add("square");
            square.id = index
            boardEl.appendChild(square);
            square._handler = (e) => handleClick(e, index);
            square.addEventListener("click", square._handler);
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
    if (!Gameboard.board.includes(null)) {
        console.log("HI")
        document.getElementById("winner").textContent = "It's a draw";
        document.getElementById("winner-container").hidden = false;
        Gameboard.gameOver = true;
    }

    for (const [a, b, c] of winningCombos) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.getElementById("winner").textContent = Gameboard.actualPlayer.name + " win the game!";
            document.getElementById("winner-container").hidden = false;
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
        e.target.style.backgroundColor = Gameboard.actualPlayer.color;
        if (Gameboard.actualPlayer.marker === "o"){
            const marker = document.createElement("div");
            marker.classList.add(`${Gameboard.actualPlayer.marker}`);
            e.target.appendChild(marker);
            setTimeout(() => marker.classList.add("grow"), 100);
        }else{
            const firstPart = document.createElement("div");
            firstPart.classList.add("first-part");
            const secondPart = document.createElement("div");
            secondPart.classList.add("second-part");
            const marker = document.createElement("div");
            marker.classList.add(`${Gameboard.actualPlayer.marker}`);
            e.target.appendChild(marker);
            marker.appendChild(firstPart);
            marker.appendChild(secondPart);            
            setTimeout(() => {
                firstPart.classList.add("grow1");
                secondPart.classList.add("grow2");
                
            }, 100);
        }
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

function handleClick(e, index){
    round(e, index);
}

function resetBoard() {
    document.querySelectorAll(".square").forEach(square => {
        square.removeEventListener("click", square._handler);
    });

    Gameboard.board.fill(null);
    Gameboard.actualPlayer = Gameboard.player1;
    boardEl.innerHTML = "";
    Gameboard.gameOver = false;
    Gameboard.createBoard();
    document.getElementById("winner-container").hidden = true;
    console.log(Gameboard.board)
};

function capitalize(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
};