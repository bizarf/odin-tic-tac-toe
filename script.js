// gameboard
const gameBoard = (() => {
    // const board = ["X", "O", "X", "X", "X", "X", "X", "O", "O"]
    const board = new Array(9);

    return {
        board
    }
})();

// handles the display
const displayController = (() => {
    const boardDisplay = () => {
        const gameBtn = document.getElementsByClassName("boardSquare")

        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBtn[i].textContent = gameBoard.board[i]
        }
    }
    return {
        boardDisplay
    }
})();

// player code
const players = (() => {
    // function to let players mark the board
    const playerMove = (player) => {
        const boardSquare = document.querySelectorAll("[data-id]")
        boardSquare.forEach(div => {
            div.addEventListener("click", () => {
                if (div.textContent === "" && player === "playerOne") {
                    gameBoard.board.splice(div.dataset.id, 1, "X")
                    player = "playerTwo"
                } else if (div.textContent === "" && player === "playerTwo") {
                    gameBoard.board.splice(div.dataset.id, 1, "O")
                    player = "playerOne"
                }
                displayController.boardDisplay()
                players.victoryCheck()
            })
        })
    }

    // victory checker
    const victoryCheck = (() => {
        const _victoryConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < 8; i++) {
            const victoryCombo = _victoryConditions[i]
            let a = gameBoard.board[victoryCombo[0]];
            let b = gameBoard.board[victoryCombo[1]];
            let c = gameBoard.board[victoryCombo[2]];

            if (a === undefined || b === undefined || c === undefined) {
                continue;
            }

            if (a === b && b === c) {
                let resultText = document.querySelector("#result")
                if (a === "X") {
                    resultText.textContent = "X wins"
                } else if (a === "O") {
                    resultText.textContent = "O wins"
                }
                break
            }
        }
    })
    return {
        playerMove,
        victoryCheck
    }
})()

// console.log(gameBoard.board)
displayController.boardDisplay();

players.playerMove("playerOne")