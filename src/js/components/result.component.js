import { Component } from './component.js';
import DomUtil from '../utils/dom.util.js';

export default class ResultComponent extends Component {
  #winnerState;
  #resetState;
  $resultWrap = '.result-wrap';
  $btnReset = '.btn-reset';

  constructor(services) {
    super(services);

    this.#winnerState = this.services.stateManager.winnerState;
    this.#resetState = this.services.stateManager.resetState;
    this.#winnerState.observers = [...this.#winnerState.observers, this.init];
    this.#resetState.observers = [...this.#resetState.observers, this.reset];
    this.setEventListener();
  }

  init = () => {
    DomUtil.show(this.$resultWrap);
    this.#setTemplate();
    DomUtil.render(`${this.$resultWrap} h2`, this.template);
    this.#notifyMessage();
  };

  reset = () => {
    DomUtil.hide(this.$resultWrap);
  };

  #setTemplate() {
    const winner = this.#winnerState.value;

    if (!winner.length) {
      this.template = '무승부';

      return;
    }

    this.template = `🏆 최종 우승자: ${winner.join(', ')} 🏆`;
  }

  setEventListener() {
    const events = [
      {
        target: this.$btnReset,
        event: 'click',
        handler: this.resetGame,
      },
    ];

    super.setEventListener(events);
  }

  #notifyMessage() {
    const message = this.#winnerState.value.length ? '우승을 축하드립니다' : '다음 기회를 노리세요';

    setTimeout(() => window.alert(message), 2000);
  }

  resetGame = () => {
    this.#resetState.value = true;
  };
}
