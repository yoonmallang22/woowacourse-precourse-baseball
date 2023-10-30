import { MissionUtils } from "@woowacourse/mission-utils";

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

export default Computer;
