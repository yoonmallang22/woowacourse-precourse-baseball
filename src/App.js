class App {
  async play() {}
}

class Computer {
  #numbers;

  makeThreeNums() {
    const candidate = Array(9)
      .fill()
      .map((v, i) => i + 1);

    const shuffle = [];

    while (shuffle.length < 3) {
      const random = Math.floor(Math.random() * candidate.length);
      const spliceArray = candidate.splice(random, 1);
      const value = spliceArray[0];
      shuffle.push(value);
    }

    this.#numbers = shuffle;
  }

  getThreeNums() {
    return this.#numbers;
  }
}

class Player {
  #numbers;

  guessThreeNums(playerNumbers) {
    this.#numbers = playerNumbers;
  }

  getThreeNums() {
    return this.#numbers;
  }
}

class Manager {
  #strikeNum = 0;
  #ballNum = 0;

  compareNums(computerAnswer, playerAnswer) {
    [...playerAnswer.toString()].forEach((v, i) => {
      if (v == computerAnswer[i]) {
        this.#strikeNum++;
      } else if (computerAnswer.includes(v)) {
        this.#ballNum++;
      }
    });
  }

  printResult() {
    if (this.#strikeNum === 0 && this.#ballNum === 0) {
      return "낫싱";
    } else if (this.#strikeNum === 3) {
      return `3스트라이크
3개의 숫자를 모두 맞히셨습니다! 게임 종료`;
    } else {
      return `${this.#ballNum ? this.#ballNum + "볼" : ""} ${this.#strikeNum ? this.#strikeNum + "스트라이크" : ""}`.trim();
    }
  }
}

export default App;
