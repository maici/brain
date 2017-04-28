import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
import { colorMap } from '../ColorPad'
const cx = classnames.bind(styles)

const inputs = [1,2,3,4,5,6,7,8,9]

const PadButton = ({ value, onSelect, className, onMouseDown, displayMode }) => {
  const select = () => onSelect(value)
  const classes = cx(styles.container, className)
  switch(displayMode){
    case 'color': {
      const style = { backgroundColor: colorMap[value - 1] }
      return (
        <div className={classes} style={style} onDragStart={e => e.preventDefault()} onMouseDown={onMouseDown} onClick={select} />
      )
    }
    default: {
      return (
        <div className={classes} onDragStart={e => e.preventDefault()} onMouseDown={onMouseDown} onClick={select}>
          { value }
        </div>
      )
    }
  }
}

export default PadButton
