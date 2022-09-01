// gameboard
const gameBoard = (() => {
    // const board = ["X", "O", "X", "X", "X", "X", "X", "O", "O"]
    const board = new Array(9)
    const boardDisplay = () => {
        const gameBtn = document.getElementsByClassName("boardSquare")

        for (let i = 0; i < gameBoard.board.length; i++) {
            gameBtn[i].textContent = gameBoard.board[i]
        }
    }
    return {
        board,
        boardDisplay,
    }
})();

// handles the display
const displayController = (() => {
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
                gameBoard.boardDisplay()
            })

            // div.addEventListener("click", () => {
            //     if (div.textContent === "") {
            //         gameBoard.board.splice(div.dataset.id, 1, "X")
            //     } else if (div.textContent === "X") {
            //         console.log("test")
            //         console.log(player)
            //     }
            //     gameBoard.boardDisplay()
            // })
        })
    }
    return {
        playerMove,
    }
})();

// player code
const players = (() => {
    const player = () => {

        return {
            player
        }
    }
})

// console.log(gameBoard.board)
gameBoard.boardDisplay();

displayController.playerMove("playerOne")