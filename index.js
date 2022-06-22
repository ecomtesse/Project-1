//====================
//Player Icons
//====================
const player1Img = new Image (80, 80)
player1Img.src = "./images/autobot-logo-1.png"
player1Img.alt = "Player 1 icon"
// cells[0].appendChild(player1Img)

const player2Img = new Image (90, 90)
player2Img.src = "./images/decepticon-logo-1.png"
player2Img.alt = "Player 2 icon"
// cells[1].appendChild(player2Img)

//=================
//Elements
//=================
const cells = document.querySelectorAll(".cell")
const endGameArea = document.querySelector("#endgame-area")
const endGameText = document.querySelector("#endgame-text")
const restartButton = document.querySelector("#restart")
// const fireworksOn = document.querySelector("#fireworks")
const player1Total = document.querySelector("#player1-score")
const player2Total = document.querySelector("#player2-score")
const player1 = "X"
const player2 = "O"
let currentPlayer = player1
let numOfMoves = 0
let stopGame = false
let player1Score = 0
let player2Score = 0


//====================
//Audio
//====================
const player1audio = new Audio('./audio/player1.mp3')
const player2audio = new Audio('./audio/player2.mp3')
const winAudio = new Audio("./audio/wingame.mp3")
const fnWinAudio = () => {
    winAudio.play()
} // Had to create a function that plays the audio as setTimout did not like having a method (winAudio.play() within it)
const playWinAudio = () => {
    setTimeout(fnWinAudio, 1300)
}

const tieAudio = new Audio('./audio/tie.mp3')
const fnTieAudio = () => { 
    tieAudio.play()
}
const playTieAudio = () => {
    setTimeout(fnTieAudio, 1200)
}

const restartAudioMeg = new Audio('./audio/restart1.mp3')
const restartAudioOpt = new Audio('./audio/restart2.mp3')
const restartOptions = [restartAudioMeg, restartAudioOpt]
const playRestartAudio = () => {
    let randomNum = Math.floor(Math.random() * restartOptions.length)
    restartOptions[randomNum].play()
}

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
            event.target.classList.add('autobot')
            event.target.innerText = player1
            currentPlayer = player2
            numOfMoves++
            player1audio.play()
        } else if (currentPlayer === player2) {
            event.target.classList.add('decepticon')
            event.target.innerText = player2
            currentPlayer = player1
            numOfMoves++
            player2audio.play()
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
    startFireworks()
    if (outcome === "The Autobots win!") {
        player1Score++
        player1Total.innerText = player1Score
        // playWinAudio()
    } else if (outcome === "The Decepticons win!") {
        player2Score++
        player2Total.innerText = player2Score
        // playWinAudio()
    } else if (outcome === "It's a tie. The battle continues...") {
        // playTieAudio()
    }   
}

const restartGame = () => {
    // playRestartAudio()
    endFireworks()
    endGameArea.className = "hidden"
    endGameText.innerText = null
    currentPlayer = player1
    stopGame = false
    numOfMoves = 0
    for (let element of cells) {
        element.innerText = null
    }
    for (let element of cells) {
        element.classList.remove('autobot')
        element.classList.remove('decepticon')
    }       
}
restartButton.addEventListener('click', restartGame)
