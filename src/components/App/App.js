import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
import StepButton from './StepButton'
import Step from './Step'
import steps from './steps'
const cx = classnames.bind(styles)

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      currentStep: 0,
      steps: steps,
    }
  }

  componentDidMount() {
    // Typed.new('#bla', )
  }

  previousStep = () => {
    const { currentStep, steps } = this.state
    const previousStep = currentStep - 1 < 0 ? 0 : currentStep - 1
    this.setState({currentStep: previousStep})
  }

  nextStep = () => {
    const { currentStep, steps } = this.state
    const nextStep = currentStep + 1 > steps.length - 1 ? steps.length - 1 : currentStep + 1
    this.setState({currentStep: nextStep})
  }

  render() {
    const { currentStep, steps } = this.state
    console.log(currentStep)
    const background = cx(styles.container, styles[`step${currentStep}`])
    return (
      <div className={background}>
        <div className={styles.header}>
          {
            steps.map((step, index) => index + 1 < steps.length && <StepButton key={index} active={currentStep > index}/>)
          }
        </div>
        <div className={styles.content}>
          {
            steps[currentStep] && <Step step={steps[currentStep]} index={currentStep} onResolve={this.nextStep} />
          }
        </div>
        <div className= {styles.footer}>
          14:50
        </div>
      </div>
    )
  }
}

export default App
