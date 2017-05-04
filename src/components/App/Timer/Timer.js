import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      minutes: 0,
      seconds: 0,
    }
  }

  componentDidMount() {
    const { time } = this.props;
    this.setState({minutes: time.minutes, seconds: time.seconds})
  }

  componentDidUpdate(prevProps) {
    const { time } = this.props
    if(prevProps.time !== time) {
      this.setState(time)
    }
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
