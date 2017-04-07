import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

const inputs = [1,2,3,4,5,6,7,8,9]

const PadButton = ({ value, onSelect, className,onMouseDown }) => {
  const select = () => onSelect(value)
  const classes = cx(styles.container, className)
  return (
    <div className={classes} onDragStart={e => e.preventDefault()}onMouseDown={onMouseDown} onClick={select}>
      { value }
    </div>
  )
}

export default PadButton
