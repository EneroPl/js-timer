import moment from "moment";

/**
 * Service for displaying a timer on pages with a set of methods.
 * To get started, you need to initialize the TimerService options:
 *
 * — format - output format of the remaining time
 *
 * Working methods:
 *
 * — start - method, starting timer. It takes parameter:
 * 
 * — from* - the right time, which will be more people
 *
 * — pause - pause the timer;
 * — continue - continue the timer;
 * — clear - completely clear the timer.
 *
 * Getters:
 * — output - the output value of the timer in the %format% format, passed to you.
 * 
 * If you want the original value as a timestamp instead of
 * formatted date to pass as parameter %format% value "timestamp"
 *
 * */

const CUSTOM_FORMATS = Object.freeze({
  TIMESTAMP: "timestamp",
});

export default class Timer {
  constructor({ format = "HH:mm:ss" }) {
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

        if (this.timer < moment().unix()) {
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
