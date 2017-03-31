import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const StepButton = ({ children, active }) => {
  const classes = cx(styles.hexagon, {
    active
  })
  return (
    <div className={styles.container}>
      <div className={classes}>
      </div>
    </div>
  )
}

export default StepButton
