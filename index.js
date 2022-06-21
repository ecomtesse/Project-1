//Elements
const cells = document.querySelectorAll(".cell")
const endGameArea = document.querySelector("#endgame-area")
const endGameText = document.querySelector("#endgame-text")
const restartGame = document.querySelector("#restart")
// const autobotImg = new Image()
// autobotImg = "./images/autobot-logo-0"
const player1 = "X"
const player2 = "O"
let currentPlayer = player1
let numOfMoves = 0
// const row1 = document.querySelector("#cell1", "#cell2", "#cell3")

//=====================
// user clicks on cell X or O. add event listener on each cell (loop)
//=====================

const playCell = (event) => {
    if (event.target.innerText !== "") {
        return
    // } else if (endGameArea.classList.contains('visibile')) {
    //     return    ***** For later -  to stop cells being played when the game is over *****
    } else if (currentPlayer === player1) {
        event.target.innerText = player1
        currentPlayer = player2
        numOfMoves++
    } else if (currentPlayer === player2) {
        event.target.innerText = player2
        currentPlayer = player1
        numOfMoves++
    }   
    //insert audio here if i do it
    checkWinner() 
}

for (let element of cells) {
    element.addEventListener('click', playCell);
}





// const boardState = array(cells.length)
// boardState.fill(null)


//=====================
// Function to Check for a Winner
//=====================
const winConditions = [
    //rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //columns 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //diagnals 
    [0, 4, 8], [2, 4, 6]
]

const checkWinner = () => {
    for (let winCondition of winConditions) {
        let square0 = winCondition[0] // 0
        let square1 = winCondition[1]// 1
        let square2 = winCondition[2]// 2
        const cell0 = cells[square0].innerText
        const cell1 = cells[square1].innerText
        const cell2 = cells[square2].innerText
        console.log(cell0)
        console.log(cell1)
        console.log(cell2)
        if (cell0 === player1 && cell1 === player1 && cell2 === player1){
            return "Player 1 wins!"
        } else if (cell0 === player2 && cell1 === player2 && cell2 === player2){
            return "Player 2 wins!"
        }
    }
    if (numOfMoves === 9) {
        return "Its a tie"
    } 

}

