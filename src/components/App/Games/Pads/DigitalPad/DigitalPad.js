import React from 'react'
import styles from './style.scss'
import DigitalButton from './DigitalButton'
// const cx = classnames.bind(styles)

const inputs = [1,2,3,4,5,6,7,8,9]
const nbCols = 3
const getLineFromKeys = (pointFrom, pointTo) => {
  const col = pointFrom%nbCols
  const row = Math.floor(pointFrom/3)
  const x = 65 + 130 * col
  const y = 65 + 130 * row
  const dcol = pointTo%nbCols
  const drow = Math.floor(pointTo/3)
  const dx = 65 + 130 * dcol
  const dy = 65 + 130 * drow
  return {
    x,
    y,
    dx,
    dy,
  }
}

export class DigitalPad extends React.Component {

  constructor(props) {
    super(props)
    this.currentCode = []
    this.state = {
      links: {},
    }
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.onMouseUp)
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.onMouseUp)
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
    const { step, onResolve } = this.props
    const { code } = step
    console.log(this.currentCode, code)
    const isOk = this.currentCode.reduce((bool, next, index) =>  bool && next + 1 === code[index] ,true)
    if(this.currentCode.length === code.length && isOk) {
      onResolve()
    } else {
      this.setState({ pressed: false })
      this.reset()
    }
  }

  reset = () => {
    this.setState({ links: {} })
    this.currentCode = []
  }

  onMouseDown = (on) => {
    this.setState({ pressed: true, on })
    this.currentCode.push(on)
  }

  onMouseUp = () => {
    this.validate()
  }

  onMouseOver = (over) => {
    const { pressed, links, on } = this.state
    if (pressed && on !== over && !links[over]) {
      const newLinks = {...links, [on]: over }
      this.currentCode.push(over)
      this.setState({
        links: newLinks,
        on: over,
      })
    }
  }

  render() {
    const { step } = this.props
    const { code } = step
    const { links, elements } = this.state
    if(!code) return null
    return (
      <div className={styles.container} onMouseUp={this.onMouseUp}>
        <svg className={styles.svg}>
          {
            Object.keys(links).map((key, index) => {
              const line = getLineFromKeys(key, links[key])
              return <path key={index} strokeLinecap='round' d={`M${line.x} ${line.y} L ${line.dx} ${line.dy}`} />
            })
          }
        </svg>
        {
          inputs.map((value, index) => <DigitalButton
                                          className={styles.digitalButton}
                                          onMouseDown={() => this.onMouseDown(index)}
                                          onMouseOver={() => this.onMouseOver(index)}
                                          key={index}
                                        />)
        }
      </div>
    )
  }
}
