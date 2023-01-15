// Write your code here
import {Component} from 'react'
import './index.css'

const initialSeconds = {isRunning: false, seconds: 0}

class Stopwatch extends Component {
  state = initialSeconds

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.timerId)

  getMinute = () => {
    const {seconds} = this.state
    const minute = Math.floor(seconds / 60)
    if (minute < 10) {
      return `0${minute}`
    }
    return minute
  }

  getSecond = () => {
    const {seconds} = this.state
    const second = Math.floor(seconds % 60)
    if (second < 10) {
      return `0${second}`
    }
    return second
  }

  getStart = () => {
    this.timerId = setInterval(this.runClock, 1000)
    this.setState({isRunning: true})
  }

  runClock = () => {
    const {seconds} = this.state
    const isOverSeconds = seconds === 60 * 60
    if (isOverSeconds) {
      this.clearTimerInterval()
    }
    this.setState({
      isRunning: !isOverSeconds,
      seconds: isOverSeconds ? 0 : seconds + 1,
    })
  }

  getStop = () => {
    this.clearTimerInterval()
    this.setState({isRunning: false})
  }

  getReset = () => {
    this.clearTimerInterval()
    this.setState({isRunning: false, seconds: 0})
  }

  render() {
    const {isRunning} = this.state
    const timeDisplay = `${this.getMinute()}:${this.getSecond()}`
    return (
      <div className="bg-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="timer-clock-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="clock-image"
            />
            <p className="timer-para">Timer</p>
          </div>
          <p className="clock-ticks">{timeDisplay}</p>
          <div className="buttons-container">
            <button
              type="button"
              className="button green"
              disabled={isRunning}
              onClick={this.getStart}
            >
              Start
            </button>
            <button type="button" className="button red" onClick={this.getStop}>
              Stop
            </button>
            <button
              type="button"
              className="button orange"
              onClick={this.getReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
