import React from 'react'
import io from 'socket.io-client'
import styles from './style.scss'
import classnames from 'classnames/bind'
import StepButton from './StepButton'
import Timer from './Timer'
import Step from './Step'
import steps from './steps.json'
const cx = classnames.bind(styles)
const socket = io("http://localhost:3000/")

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      currentStepId: 0,
      currentStep: {},
      stepTimeout: false,
      time: { minutes: 0, seconds: 0 }
    }
    socket.on('timer:tick', time => this.setState({time: time}))
    socket.on('timer:timeout', () => this.setState({stepTimeout: true}))
    socket.on('step:change', (step) => this.setState({currentStepId: step, currentStep: steps[step]}))
  }

  componentWillMount() {
      this.setState(this.setState({currentStep: steps[this.state.currentStepId]}))
  }

  stepCleared = () => {
    const { currentStepId } = this.state
    socket.emit('step:cleared', currentStepId)
  }

  setActiveStep = () => {
      const { time } = this.state.currentStep
      socket.emit("step:ready", time)
  }

  render() {
    const { currentStepId, currentStep, time, stepTimeout } = this.state
    const background = cx(styles.container, styles[`step${currentStepId}`])
    return (
      <div className={background}>
        <div className={styles.header}>
          {
            steps.map((step, index) => index + 1 < steps.length && <StepButton key={index} active={currentStepId > index}/>)
          }
        </div>
        <div className={styles.content}>
          {
            <Step timeout={stepTimeout}
                  step={currentStep}
                  index={currentStepId}
                  onResolve={this.stepCleared}
                  setActive={this.setActiveStep}
            />
          }
        </div>
        <div className= {styles.footer}>
          <Timer time={time}/>
        </div>
      </div>
    )
  }
}

export default App
