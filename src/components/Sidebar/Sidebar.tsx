import { Logo } from '../Logo/Logo'
import { NavItem } from '../NavItem/NavItem'
import styles from './Sidebar.module.scss'

import HomeIcon from '../../assets/icons/home.svg?react'
import TrendsIcon from '../../assets/icons/trends.svg?react'
import FavoritesIcon from '../../assets/icons/favorites.svg?react'
import SettingsIcon from '../../assets/icons/settings.svg?react'

export const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <Logo />

            <nav className={styles.nav}>
                <NavItem to='/' icon={<HomeIcon />} label='Главная' />
                <NavItem to='/trends' icon={<TrendsIcon />} label='Тренды' />
                <NavItem to='/favorites' icon={<FavoritesIcon />} label='Избранное' />
                <NavItem to='/settings' icon={<SettingsIcon />} label='Настройки' />
            </nav>

            <footer className={styles.footer}>
                <p>© Все права защищены</p>
            </footer>
        </aside>
    )
}