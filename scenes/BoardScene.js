import { Button, Text } from "../utils/helpers.js";

// Game Board Scene
export default class BoardScene extends Phaser.Scene {
  constructor() {
    super("board");

    // Initial State
    this.state = {
      randomNumber: 0,
      inputNumber: 0,
      attempt: 0,
    };

    // Declare All Hints For Accessible In Anywhere
    this.hints = {
      numberIsBig: [
        "Too low! The number has big dreams than that!",
        "Aim higher! Even your GPA is higher than that 😆",
        "Think bigger, like your weekend food cravings.",
        "Bruh… even ants climb higher than that guess.",
      ],
      numberIsSmall: [
        "Whoa! Chill! That’s too high.",
        "Lower the number, not your expectations.",
        "This isn’t stock market… bring it down.",
        "Bro, numbers have limits… unlike your confidence.",
      ],
      sameInput: [
        "Déjà vu much? You already tried that.",
        "Trying the same thing and expecting different results? Einstein disagrees.",
        "Recycling is good for Earth, not for guesses 😜",
        "Again? The number didn’t suddenly change itself.",
      ],
      ansIsCorrect: [
        "Correct! 🎉 Genius detected!",
        "Bingo! Your brain is finally warmed up!",
        "YOU DID IT! Now go buy lottery tickets",
        "Winner! Winner! Brain-cell dinner!",
      ],
      gameOver: [
        "Game Over! Your guessing license has been suspended.",
        "The number won. Better luck next time 😭",
        "Game Over! Press restart to continue suffering.",
        "Your chances: 0 | Your skills: questionable.",
      ],
    };
  }

  init() {
    // Reset Attempt Every Time This Scene Starts
    this.state.attempt = 10;
  }

  preload() {
    // Load The Assets
    this.load.image("num_btn", "../assets/images/num-btn.png");
    this.load.audio("wrong", "../assets/audio/wrong.mp3");
    this.load.audio("correct", "../assets/audio/correct.mp3");
    this.load.audio("over", "../assets/audio/over.mp3");
  }

  create() {
    // Destructured The Game Width & Height
    const { width, height } = this.scale;

    // Generate Random Number Once when cene tarts
    this.state.randomNumber = Math.floor(Math.random() * 9) + 1;

    // Display The Number
    this.displayNumber = Text(this, width / 2, height / 6, "?", "96px");

    // Number Btn Values Array
    const numBtnValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let index = 0;

    // Gap Between The Btns
    const numBtnSize = 96;

    // Generate Number Btns 1–9
    numBtnValues.forEach((value, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      const x = width / 2 - numBtnSize + col * numBtnSize;
      const y = height / 2 - numBtnSize + row * numBtnSize;

      Button(this, x, y, "num_btn", value, "32px", () => {
        const input = Number(value);

        if (this.state.inputNumber === input) {
          this.sound.play("wrong");
          this.displayHintText.setText(
            this.hints.sameInput[
              Math.floor(Math.random() * this.hints.sameInput.length)
            ]
          );
          return;
        }

        this.state.inputNumber = input;
        this.state.attempt--;

        this.checkGuess();
      });
    });

    // Display the Hint Text
    this.displayHintText = Text(
      this,
      width / 2,
      height / 1.24,
      "Guess the number between 1 to 9",
      "16px"
    );
  }

  // Guessing Logic
  checkGuess() {
    // If All Attempt Are Finished
    if (this.state.attempt <= 0) {
      this.sound.play("over");
      this.displayNumber.setText("☹️");
      this.displayHintText.setText(
        this.hints.gameOver[
          Math.floor(Math.random() * this.hints.gameOver.length)
        ]
      );
      setTimeout(() => {
        this.scene.start("score", { score: 1 });
      }, 1200);
      return;
    }

    // Answer Is Correct
    if (this.state.inputNumber === this.state.randomNumber) {
      this.sound.play("correct");
      this.displayNumber.setText(this.state.inputNumber);
      this.displayHintText.setText(
        this.hints.ansIsCorrect[
          Math.floor(Math.random() * this.hints.ansIsCorrect.length)
        ]
      );
      setTimeout(() => {
        this.scene.start("score", { score: this.state.attempt + 1 });
      }, 1500);
      return;
    }

    // Answer Is Small
    if (this.state.inputNumber > this.state.randomNumber) {
      this.sound.play("wrong");
      this.displayHintText.setText(
        this.hints.numberIsSmall[
          Math.floor(Math.random() * this.hints.numberIsSmall.length)
        ]
      );
      return;
    }

    // Answer Is Big
    if (this.state.inputNumber < this.state.randomNumber) {
      this.sound.play("wrong");
      this.displayHintText.setText(
        this.hints.numberIsBig[
          Math.floor(Math.random() * this.hints.numberIsBig.length)
        ]
      );
      return;
    }
  }
}
