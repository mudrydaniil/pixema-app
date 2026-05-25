import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'
import styles from './NavItem.module.scss'

interface NavItemProps {
    to: string
    icon: ReactNode
    label: string
}

export const NavItem = ({ to, icon, label }: NavItemProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => cn(styles.link, isActive && styles.active)}
        >
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{label}</span>
        </NavLink>
    )
}