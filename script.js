// gameboard
const gameBoard = (() => {
    // creates a blank array with 9 empty elements
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

    // reset button
    const resetBtn = () => {
        const reset = document.querySelector("#resetBtn")
        reset.addEventListener("click", () => {
            gameBoard.board = new Array(9)
            let resultText = document.querySelector("#result")
            resultText.textContent = ""
            displayController.boardDisplay()
            gameLogic.playerTurn = "playerOne"
            displayController.gameState = false;
            const start = document.querySelector("#startBtn")
            start.disabled = false;
            gameLogic.round = 0;
            const playerOneAvatar = document.querySelector("#playerOneAvatar")
            const playerTwoAvatar = document.querySelector("#playerTwoAvatar")
            playerOneAvatar.classList = "playerAvatars"
            playerTwoAvatar.classList = "playerAvatars"
        })
    }

    const gameState = false;

    // start button
    const startBtn = () => {
        if (displayController.gameState === false) {
            displayController.resetBtn()
            const start = document.querySelector("#startBtn")
            start.addEventListener("click", () => {
                displayController.gameState = true;
                displayController.boardDisplay();
                gameLogic.playerMove()
            })
        } else if (displayController.gameState === true) {
            console("test")
        }
    }

    return {
        boardDisplay,
        resetBtn,
        gameState,
        startBtn
    }
})();

// player code
const gameLogic = (() => {
    // function to let players mark the board
    const playerTurn = "playerOne"

    const round = 0;

    const playerMove = () => {
        const boardSquare = document.querySelectorAll("[data-id]")
        const playerOneAvatar = document.querySelector("#playerOneAvatar")
        const playerTwoAvatar = document.querySelector("#playerTwoAvatar")

        if (gameLogic.round === 0) {
            playerOneAvatar.classList += " currentTurn"
        }

        boardSquare.forEach(div => {
            div.addEventListener("click", () => {
                if (div.textContent === "" && gameLogic.playerTurn === "playerOne" && displayController.gameState === true) {
                    gameBoard.board.splice(div.dataset.id, 1, "X")
                    gameLogic.playerTurn = "playerTwo"
                    gameLogic.round += 1
                    playerTwoAvatar.classList += " currentTurn"
                    playerOneAvatar.classList = "playerAvatars"
                } else if (div.textContent === "" && gameLogic.playerTurn === "playerTwo" && displayController.gameState === true) {
                    gameBoard.board.splice(div.dataset.id, 1, "O")
                    gameLogic.playerTurn = "playerOne"
                    gameLogic.round += 1
                    playerOneAvatar.classList += " currentTurn"
                    playerTwoAvatar.classList = "playerAvatars"
                }

                displayController.boardDisplay()
                gameLogic.victoryCheck()
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

        // loop to go through the victory conditions array
        for (let i = 0; i < 8; i++) {
            const victoryCombo = _victoryConditions[i]
            let a = gameBoard.board[victoryCombo[0]];
            let b = gameBoard.board[victoryCombo[1]];
            let c = gameBoard.board[victoryCombo[2]];

            if (a === undefined || b === undefined || c === undefined) {
                continue;
            }

            // if winner displays player name
            if (a === b && b === c) {
                let resultText = document.querySelector("#result")
                if (a === "X") {
                    let playerOneName = document.getElementById("playerOneName")
                    if (playerOneName.value === "") {
                        resultText.textContent = "Player One wins!"
                    } else {
                        resultText.textContent = `${playerOneName.value} wins!`
                    }
                } else if (a === "O") {
                    let playerTwoName = document.getElementById("playerTwoName")
                    if (playerTwoName.value === "") {
                        resultText.textContent = "Player Two wins!"
                    } else {
                        resultText.textContent = `${playerTwoName.value} wins!`
                    }
                }
                gameLogic.disableStartBtn()
                break
            }

            // displays draw game
            if (!(a === b && b === c) && gameLogic.round === 9) {
                let resultText = document.querySelector("#result")
                resultText.textContent = "Draw Game"
                gameLogic.disableStartBtn()
            }
        }
    })

    const disableStartBtn = () => {
        const start = document.querySelector("#startBtn")
        start.disabled = true;
        displayController.gameState = false;
    }

    return {
        playerMove,
        victoryCheck,
        playerTurn,
        round,
        disableStartBtn
    }
})()

// activates the start button
displayController.startBtn()