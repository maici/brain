import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
import * as Games from '../Games'
const cx = classnames.bind(styles)

class Step extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      typing: true
    }
  }

  componentDidMount() {
    const { startMessage } = this.props.step
    this.type(startMessage, () => {
        setTimeout(() => {
            this.setState({ typing: false })
            this.props.setActive()
        }, 1000)
    })
  }

  componentDidUpdate(prev) {
    console.log("BLAAAAAAAAAA",prev)
    const { startMessage, timeoutMessage } = this.props.step
    if(prev.index !== this.props.index) {
        this.setState({ typing: true })
        this.type(startMessage, () => {
            setTimeout(() => {
                this.setState({ typing: false })
                this.props.setActive()
            }, 1000)
        })
    }
    if(prev.timeout !== this.props.timeout && this.props.timeout) {
        this.setState({ typing: true })
        this.type(timeoutMessage, null)
    }
  }

  type = (message, cb) => {
    this.setState({typing: true})
    requestAnimationFrame(() => Typed.new('#type', {...message, ...!!cb && {callback: cb}}), 0)
  }

  onResolve = () => {
    const { endMessage } = this.props.step
    this.props.onResolve()
    this.type(endMessage, null)
  }

  render = () => {
    const { typing } = this.state
    const { step, index } = this.props
    const Game = Games[step.game]
    return (
      <div>
        { typing && <div className={styles.type}><div id="type" /></div> }
        { !typing && <Game step={step} index={index} onResolve={this.onResolve} /> }
      </div>
    )
  }
}

export default Step
