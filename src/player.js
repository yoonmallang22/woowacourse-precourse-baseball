class Player {
  #numbers;

  guessThreeNums(playerNumbers) {
    this.#numbers = playerNumbers;
  }

  getThreeNums() {
    return this.#numbers;
  }
}

export default Player;
