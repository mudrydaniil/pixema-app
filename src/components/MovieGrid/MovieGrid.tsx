import React from 'react'
import styles from './MovieGrid.module.scss'

interface MovieGridProps {
  children: React.ReactNode
}

export const MovieGrid = ({ children }: MovieGridProps): React.ReactElement => {
  return (
    <div className={styles.gridContainer}>
      {children}
    </div>
  )
}