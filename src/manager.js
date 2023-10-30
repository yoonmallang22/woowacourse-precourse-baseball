class Manager {
  #strikeNum = 0;
  #ballNum = 0;

  compareNums(playerAnswer, computerAnswer) {
    let strike = 0;
    let ball = 0;

    [...playerAnswer].forEach((v, i) => {
      if (Number(v) === computerAnswer[i]) {
        strike++;
      } else if (computerAnswer.includes(Number(v))) {
        ball++;
      }
    });

    this.#strikeNum = strike;
    this.#ballNum = ball;
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

  checkPlayerWantsRestart(restartNum) {
    return restartNum === "1" ? true : false;
  }

  checkPlayerThreeNumsWrong(playerNum) {
    return playerNum.length !== 3 || !/^[0-9]{3}$/.test(playerNum);
  }

  checkPlayerRestartNum(restartNum) {
    return restartNum === "1" || restartNum === "2";
  }
}

export default Manager;
