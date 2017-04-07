import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'

const cx = classnames.bind(styles)

const DigitalButton = ({ className,onMouseDown, onMouseOver, to }) => {
  const classes = cx(styles.container, className)
  return (
    <div
      className={classes}
      onDragStart={e => e.preventDefault()}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
    />
  )
}
export default DigitalButton
