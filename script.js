function showGame(game) {
    document.getElementById("numberGame").classList.add("hidden");
    document.getElementById("wordGame").classList.add("hidden");
    document.getElementById("tttGame").classList.add("hidden");
    document.getElementById("coinGame").classList.add("hidden");

    if (game === "number") {
        document.getElementById("numberGame").classList.remove("hidden");
    }
    if (game === "word") {
        document.getElementById("wordGame").classList.remove("hidden");
    }
    if (game === "ttt") {
        document.getElementById("tttGame").classList.remove("hidden");
    }
    if (game === "coin") 
        document.getElementById("coinGame").classList.remove("hidden");
}

let number = Math.floor(Math.random() * 100) + 1;
let tries = 0;

function guessNumber() {
    let input = document.getElementById("numberInput");
    let guess = Number(input.value);
    let message = document.getElementById("numberMessage");

    if (guess < 1 || guess > 100) {
        message.innerHTML = "Enter a number between 1 and 100";
        return;
    }

    tries++;
    document.getElementById("tries").innerHTML = tries;

    if (guess === number) {
        message.innerHTML = "You got it!";
    } else if (guess < number) {
        message.innerHTML = "Too low! Try a bigger number.";
    } else {
        message.innerHTML = "Too high! Try a smaller number.";
    }
}

function newNumberGame() {
    number = Math.floor(Math.random() * 100) + 1;
    tries = 0;
    document.getElementById("tries").innerHTML = "0";
    document.getElementById("numberMessage").innerHTML = "";
    document.getElementById("numberInput").value = "";
}

// word game part 
let wordList = [
    { word: "clock", riddle: "I have hands, but I cannot clap. What am I?" },
    { word: "piano", riddle: "I have many keys, but I cannot open a single door. What am I?" },
    { word: "candle", riddle: "I am tall when I am young, and I am short when I am old. What am I?" },
    { word: "bank", riddle: "I have a branch, but no fruit, trunk or leaves. What am I?" },
    { word: "coin", riddle: "I have a head and a tail, but no body. What am I?" }
];

let currentWordObj = {};
let wordTries = 10;

function newWordGame() {
    let randomIndex = Math.floor(Math.random() * wordList.length);
    currentWordObj = wordList[randomIndex];
    wordTries = 10;

    document.getElementById("lives").innerHTML = wordTries;
    document.getElementById("wordDisplay").innerHTML = currentWordObj.riddle;
    document.getElementById("wordMessage").innerHTML = "";
    document.getElementById("letterInput").value = "";
}

function guessLetter() {
    let input = document.getElementById("letterInput");
    let userGuess = input.value.trim().toLowerCase();
    input.value = "";

    if (userGuess === "") {
        return;
    }

    if (wordTries <= 0) {
        document.getElementById("wordMessage").innerHTML = "Game over! Click 'New Word' to play again.";
        return;
    }

    let targetWord = currentWordObj.word.toLowerCase();

    if (userGuess === targetWord) {
        document.getElementById("wordMessage").innerHTML = "Correct! You solved the riddle!";
    } else {
        wordTries--;
        document.getElementById("lives").innerHTML = wordTries;

        let matchingLetters = 0;
        let checkedLetters = [];

        for (let i = 0; i < userGuess.length; i++) {
            let letter = userGuess[i];
            if (targetWord.includes(letter) && !checkedLetters.includes(letter)) {
                matchingLetters++;
                checkedLetters.push(letter);
            }
        }

        if (wordTries === 0) {
            document.getElementById("wordMessage").innerHTML = "Game over! The answer was: " + targetWord;
        } else {
            document.getElementById("wordMessage").innerHTML = 
                "Wrong guess! " + matchingLetters + " letter(s) match the target word.";
        }
    }
}
// ord game part

let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function play(position) {
    if (board[position] !== "" || gameOver) {
        return;
    }

    board[position] = "X";
    updateBoard();

    if (winner("X")) {
        document.getElementById("tttMessage").innerHTML = "You win!";
        gameOver = true;
        return;
    }

    if (boardFull()) {
        document.getElementById("tttMessage").innerHTML = "It's a tie!";
        gameOver = true;
        return;
    }

    computerPlay();
}

function computerPlay() {
    let empty = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            empty.push(i);
        }
    }

    let random = Math.floor(Math.random() * empty.length);
    let position = empty[random];

    board[position] = "O";
    updateBoard();

    if (winner("O")) {
        document.getElementById("tttMessage").innerHTML = "Computer wins!";
        gameOver = true;
        return;
    }

    if (boardFull()) {
        document.getElementById("tttMessage").innerHTML = "It's a tie!";
        gameOver = true;
    }
}

function updateBoard() {
    document.getElementById("cell0").innerHTML = board[0];
    document.getElementById("cell1").innerHTML = board[1];
    document.getElementById("cell2").innerHTML = board[2];
    document.getElementById("cell3").innerHTML = board[3];
    document.getElementById("cell4").innerHTML = board[4];
    document.getElementById("cell5").innerHTML = board[5];
    document.getElementById("cell6").innerHTML = board[6];
    document.getElementById("cell7").innerHTML = board[7];
    document.getElementById("cell8").innerHTML = board[8];
}

function winner(player) {
    if (board[0] === player && board[1] === player && board[2] === player) return true;
    if (board[3] === player && board[4] === player && board[5] === player) return true;
    if (board[6] === player && board[7] === player && board[8] === player) return true;
    if (board[0] === player && board[3] === player && board[6] === player) return true;
    if (board[1] === player && board[4] === player && board[7] === player) return true;
    if (board[2] === player && board[5] === player && board[8] === player) return true;
    if (board[0] === player && board[4] === player && board[8] === player) return true;
    if (board[2] === player && board[4] === player && board[6] === player) return true;
    return false;
}

function boardFull() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            return false;
        }
    }
    return true;
}

function newTTTGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    document.getElementById("tttMessage").innerHTML = "";
    updateBoard();
}


let heads = 0;
let tails = 0;

function flipCoin() {
    let result = Math.random() < 0.5 ? "Heads" : "Tails";
    let coinImg = document.getElementById("coin");

    if (result === "Heads") {
        heads++;
        document.getElementById("heads").textContent = heads;
        coinImg.classList.remove("flipped");
    } else {
        tails++;
        document.getElementById("tails").textContent = tails;
        coinImg.classList.add("flipped");
    }

    document.getElementById("result").textContent = result + "!";
}

showGame("number");
newNumberGame();
newWordGame();
newTTTGame();