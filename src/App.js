import { MissionUtils } from "@woowacourse/mission-utils";
import Computer from "./computer";
import Player from "./player";
import Manager from "./manager";

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

export default App;
