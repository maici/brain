import React from 'react'
import io from 'socket.io-client'
import styles from './style.scss'
import { server } from './config'
import StepButton from './StepButton'
import Timer from './Timer'
import Step from './Step'
import steps from './steps.json'
const socket = io(server)

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      currentStepId: 0,
      currentStep: {},
      stepTimeout: false,
      disconnected: false,
      time: { minutes: 0, seconds: 0 }
    }

    socket.on('connect', () => {
        if(!this.state.stepTimeout) {
            socket.emit('client:ready', this.state)
        }
        if(this.state.disconnected) {
            this.setState({disconnected: !this.state.disconnected})
        }
    })
    socket.on('timer:tick', time => this.setState({time: time}))
    socket.on('timer:timeout', () => this.setState({stepTimeout: true}))
    socket.on('step:change', (step) => this.setState({currentStepId: step, currentStep: steps[step]}))
    socket.on('disconnect', () => this.setState({disconnected: true}))
  }

  componentWillMount() {
      const { currentStepId } = this.state
      this.setState(this.setState({currentStep: steps[currentStepId], time: steps[currentStepId].time}))
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
    const background = {
        background: `-webkit-radial-gradient(center, circle, white 0%, hsl(0,0%,${50-currentStepId*(50/steps.length)}%) 100%`
    }

    return (
      <div style={background} className={styles.container}>
        <div className={styles.header}>
          {
            steps.map((step, index) => index < steps.length && <StepButton key={index} active={currentStepId >= index}/>)
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
