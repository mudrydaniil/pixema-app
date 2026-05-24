import s from './UserPick.module.scss'
import ArrowIcon from '../../assets/icons/arrow-down.svg?react'

export const UserPick = () => {
  return (
    <div className={s.userPick}>
      <div className={s.info}>
        <div className={s.avatar}>
          <span>AL</span>
        </div>
        <span className={s.name}>Artem Lapitsky</span>
      </div>

      <ArrowIcon className={s.arrow} />
    </div>
  )
}