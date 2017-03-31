import React from 'react'
import styles from './style.scss'
import classnames from 'classnames/bind'
// const cx = classnames.bind(styles)

const inputs = [1,2,3,4,5,6,7,8,9]

const PadButton = ({ value, onSelect }) => {
  const select = () => onSelect(value)
  return (
    <div className={styles.container} onClick={select}>
      { value }
    </div>
  )
}

export default PadButton
