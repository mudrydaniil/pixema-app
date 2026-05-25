import styles from './UserPick.module.scss'
import ArrowIcon from '../../assets/icons/arrow-down.svg?react'

export const UserPick = () => {
  return (
    <div className={styles.userPick}>
      <div className={styles.info}>
        <div className={styles.avatar}>
          <span>АЛ</span>
        </div>
        <span className={styles.name}>Daniil Mudry</span>
      </div>

      <ArrowIcon className={styles.arrow} />
    </div>
  )
}