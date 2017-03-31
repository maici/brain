import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

class Step extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typing: true
    }
  }

  componentDidMount() {
    this.type()
  }

  componentDidUpdate(prev) {
    console.log("BLAAAAAAAAAA",prev)
    if(prev.index !== this.props.index) {
      this.setState({ typing: true })
      requestAnimationFrame(() => this.type(),0)
    }
  }

  type = () => {
    Typed.new('#type', {
      ...this.props.step.message,
      callback: () => {
        setTimeout(() => this.setState({ typing: false }), 1000)
      }
    })
  }
  render = () => {
    const { typing } = this.state
    const { active, step, onResolve, index } = this.props
    return (
      <div>
        { typing && <div className={styles.type}><div id="type" /></div> }
        { !typing && <step.game step={step} index={index} onResolve={onResolve} /> }
      </div>
    )
  }
}

export default Step
