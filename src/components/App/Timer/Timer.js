import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
import { timer } from '../config'
const cx = classnames.bind(styles)

export class Timer extends React.Component {

  constructor() {
    super()
    this.state = {
      minutes: timer,
      seconds: 0,
    }
  }


  tic = () => {
    const { minutes, seconds } = this.state
    if (!seconds) {
      this.setState({ minutes: minutes - 1, seconds: 59 })
    } else {
      this.setState({ seconds: seconds - 1 })
    }
    if ( timer || seconds ) setTimeout(this.tic, 1000)
  }

  start = () => {
    setTimeout(this.tic, 1000)
  }

  componentDidMount() {
    this.start()
  }


  render = () => {
    const { minutes, seconds } = this.state
    return (
      <div className={styles.container}>
          {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
      </div>
    )
  }
}

export default Timer
