//Elements
const cells = document.querySelectorAll(".cell")
const endGameArea = document.querySelector("#endgame-area")
const endGameText = document.querySelector("#endgame-text")
const restartButton = document.querySelector("#restart")
// const autobotImg = new Image()
// autobotImg = "./images/autobot-logo-0"
const player1 = "X"
const player2 = "O"
let currentPlayer = player1
let numOfMoves = 0
let stopGame = false
const player1Total = document.querySelector("#player1-score")
const player2Total = document.querySelector("#player2-score")
let player1Score = 0
let player2Score = 0

//=====================
// Gameplay functions
//=====================

const playCell = (event) => {
    if (stopGame === true) {
        return
    } else {   
         if (event.target.innerText !== "") {
        return   
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
}    

for (let element of cells) {
    element.addEventListener('click', playCell);
}

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
        let square0 = winCondition[0]
        let square1 = winCondition[1]
        let square2 = winCondition[2]
        const cell0 = cells[square0].innerText
        const cell1 = cells[square1].innerText
        const cell2 = cells[square2].innerText
        if (cell0 === player1 && cell1 === player1 && cell2 === player1){
            return gameOverScreen("The Autobots win!")      
        } else if (cell0 === player2 && cell1 === player2 && cell2 === player2){
            return gameOverScreen("The Decepticons win!")
        }
    }
    if (numOfMoves === 9) {
        return gameOverScreen("It's a tie. The battle continues...")
    } 
}

//================
//Game Over & Restart Sequence
//================
const gameOverScreen = (outcome) => {
    endGameText.innerText = outcome
    endGameArea.className = "visible"
    stopGame = true
    if (outcome === "The Autobots win!") {
        player1Score++
        player1Total.innerText = player1Score
        console.log("add one auto");
    } else if (outcome === "The Decepticons win!") {
        player2Score++
        player2Total.innerText = player2Score
        console.log("add one decep");
    }    
}

const restartGame = () => {
    endGameArea.className = "hidden"
    endGameText.innerText = null
    currentPlayer = player1
    stopGame = false
    numOfMoves = 0
    for (let element of cells) {
        element.innerText = null
    }
}
restartButton.addEventListener('click', restartGame)
