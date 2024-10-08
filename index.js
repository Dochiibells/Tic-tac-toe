const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#gameStatus");
const scoreText = document.querySelector("#scoreTotal");
const restartBtn = document.querySelector("#restartBtn");
const winX = document.querySelector("#scoreX");
const winO = document.querySelector("#scoreO");
let xWins = 0;
let oWins = 0;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;  //turns true when game intiializes.

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

}
    

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (currentPlayer === "O") {
        cell.style.color = "red";
    } else {
        cell.style.color = "black";
    }
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `${currentPlayer}` + "'s turn.";
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `🎉${currentPlayer} wins!🎉`;
        
        if(currentPlayer == "X") {
            xWins++
            winX.textContent = `X Wins: ${xWins}`;
        }else {
            oWins++ 
            winO.textContent = `O Wins: ${oWins}`;
        }

        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "black"; 
    });
    running = true;
}
