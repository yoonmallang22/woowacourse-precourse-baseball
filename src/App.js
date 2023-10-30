import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  computer = new Computer();
  player = new Player();
  manager = new Manager();

  async play() {
    let keepPlaying = true;

    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    this.computer.makeThreeNums();

    try {
      while (keepPlaying) {
        const playerInput = await MissionUtils.Console.readLineAsync("숫자를 입력해주세요 : ");

        if (this.manager.checkPlayerThreeNumsWrong(playerInput)) {
          throw new Error("[ERROR] 잘못된 값을 입력하였습니다.");
        }
        this.player.guessThreeNums(playerInput);

        this.manager.compareNums(this.player.getThreeNums(), this.computer.getThreeNums());
        MissionUtils.Console.print(this.manager.printResult());

        if (this.manager.printResult().split("\n")[0] === "3스트라이크") {
          const restartInput = await MissionUtils.Console.readLineAsync("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");

          if (!this.manager.checkPlayerRestartNum(restartInput)) {
            throw new Error("[ERROR] 1 또는 2 이외의 값을 입력하였습니다.");
          }

          if (this.manager.checkPlayerWantsRestart(restartInput)) {
            this.computer.makeThreeNums();
            continue;
          }

          keepPlaying = false;
          MissionUtils.Console.print("게임종료");
        }
      }
    } catch (error) {
      MissionUtils.Console.print("잘못된 값을 입력하였습니다. 게임을 종료합니다.");
      throw error;
    }
  }
}

class Computer {
  #numbers;

  makeThreeNums() {
    const shuffle = [];

    while (shuffle.length < 3) {
      const random = MissionUtils.Random.pickNumberInRange(1, 9);
      if (!shuffle.includes(random)) shuffle.push(random);
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

export default App;
