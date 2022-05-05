import moment from "moment";

const CUSTOM_FORMATS = Object.freeze({
  TIMESTAMP: "timestamp",
});

const initialState = {
  format: 'HH:mm:ss'
};

export default class Timer {
  constructor({ format } = initialState) {
    this.timer = null;
    this.format = format;
    this.initTime = null;
    this._timerInterval = null;
    this._paused = false;
  }

  get output() {
    if (this.timer > 0) {
      switch (true) {
        case this.format === CUSTOM_FORMATS.TIMESTAMP:
          return this.initTime + (this.timer - this.initTime);
        default:
          break;
      }

      return moment()
        .startOf("day")
        .seconds(this.timer - this.initTime)
        .format(this.format);
    }

    return false;
  }

  _initTimer() {
    if (this._timerInterval) {
      return false;
    }

    this._paused = false;

    if (this.timer && this.timer > 0) {
      this._timerInterval = setInterval(() => {
        this.timer--;

        if (this.timer < this.initTime) {
          this.clear();
        }
      }, 1000);
    }
  }

  start(duration) {
    if (duration > moment().unix()) {
      this.timer = duration;
    } else {
      this.timer = moment().unix() + duration;
    }

    this.initTime = moment().unix();
    this._initTimer();
  }

  pause() {
    clearInterval(this._timerInterval);
    this._timerInterval = null;
    this._paused = true;
  }

  continue() {
    if (this.timer > 0 && this._paused === true) {
      this._initTimer();
    }
  }

  clear() {
    this._paused = false;
    this.timer = null;
    this._timerInterval = null;
    clearInterval(this._timerInterval);
  }
}
