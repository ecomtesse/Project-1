//=================
//Elements
//=================
//Defined all the global variables for the game here
const cells = document.querySelectorAll(".cell")
const endGameArea = document.querySelector("#endgame-area")
const endGameText = document.querySelector("#endgame-text")
const restartButton = document.querySelector("#restart")
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
// Had to create a function that plays the audio as setTimout did not like having a method (winAudio.play() within it)
const fnWinAudio = () => {
    winAudio.play()
} 
// Set Timeout to delay the start of the win audio so that it doesn't play over the player audio
const playWinAudio = () => {
    setTimeout(fnWinAudio, 1200)
}

// Same for tie audio as win audio above
const tieAudio = new Audio('./audio/tie.mp3')
const fnTieAudio = () => { 
    tieAudio.play()
}
const playTieAudio = () => {
    setTimeout(fnTieAudio, 1200)
}

// Created an array of restart audio options to play and a function to randomise which one it plays.
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
            event.target.firstChild.classList.add('autobot') //adds the player icon to the cell
            event.target.firstChild.innerText = player1 //innerText is transparent in css so that it did not ipacts the winCondition function defined below
            currentPlayer = player2
            numOfMoves++
            player1audio.play()
        } else if (currentPlayer === player2) {
            event.target.firstChild.classList.add('decepticon')
            event.target.firstChild.innerText = player2
            currentPlayer = player1
            numOfMoves++
            player2audio.play()
    }   
    checkWinner() 
    }
}    

for (let element of cells) {
    element.addEventListener('click', playCell);
}

//=====================
// Function to Check for a Winner
//=====================
// Created an array of arrays for the possible win conditions for the the game.
const winConditions = [
    //rows
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    //columns 
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    //diagnals 
    [0, 4, 8], [2, 4, 6]
]

// Function that loops over the win condition in each array and checks if the cells played by each player matches any of them. If so, it executes one of the game over functions.
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
        startFireworks()
        playWinAudio()
    } else if (outcome === "The Decepticons win!") {
        player2Score++
        player2Total.innerText = player2Score
        startFireworks()
        playWinAudio()
    } else if (outcome === "It's a tie. The battle continues...") {
        playTieAudio()
    }   
}

const restartGame = () => {
    playRestartAudio()
    endFireworks()
    endGameArea.className = "hidden"
    endGameText.innerText = null
    currentPlayer = player1
    stopGame = false
    numOfMoves = 0
    for (let element of cells) {
        element.firstChild.innerText = null
    }
    for (let element of cells) {
        element.firstChild.classList.remove('autobot')
        element.firstChild.classList.remove('decepticon')
    }       
}
restartButton.addEventListener('click', restartGame)
