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

export default App;
