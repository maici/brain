import React from 'react'
import styles from './style.scss'
import PadButton from '../PadButton'
import classnames from 'classnames/bind'
// const cx = classnames.bind(styles)

const inputs = [1,2,3,4,5,6,7,8,9]

export class ColorPad extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentCode: [],
    }
  }

  addEntry = (entry) => {
    const { currentCode } = this.state
    const { step } = this.props
    const { code } = step
    if(currentCode.length < code.length) {
      this.setState({ currentCode: [...currentCode, entry] })
    }
  }

  validate = () => {
    const { currentCode } = this.state
    const { step, onResolve } = this.props
    const { code } = step
    console.log(currentCode, code)
    const isOk = currentCode.reduce((bool, next, index) =>  bool && next === code[index] ,true)
    if(isOk) {
      onResolve()
      this.reset()
    }
  }

  reset = () => {
    this.setState({ currentCode: [] })
  }

  render() {
    const { step } = this.props
    const { code } = step
    const { currentCode } = this.state
    console.log(step.code)
    if(!code) return null
    return (
      <div className={styles.container}>
        {
          inputs.map((value, index) => <PadButton onSelect={this.addEntry} displayMode="color" value={value} key={index} />)
        }
        <div className={styles.code}>
        <div className={styles.codePreview}>
        { currentCode.map((c, i) => <PadButton displayMode="color" value={c} key={i} />) }
        </div>
          <div>
            <button onClick={this.validate} disabled={currentCode.length !== code.length} className={styles.validateButton}>valider</button>
            <button onClick={this.reset} className={styles.deleteButton}>x</button>
          </div>
        </div>
      </div>
    )
  }
}
