import { Logo } from '../Logo/Logo'
import { NavItem } from '../NavItem/NavItem'
import s from './Sidebar.module.scss'

import HomeIcon from '../../assets/icons/home.svg?react'
import TrendsIcon from '../../assets/icons/trends.svg?react'
import FavoritesIcon from '../../assets/icons/favorites.svg?react'
import SettingsIcon from '../../assets/icons/settings.svg?react'

export const Sidebar = () => {
    return (
        <aside className={s.sidebar}>
            <Logo />

            <nav className={s.nav}>
                <NavItem to="/" icon={<HomeIcon />} label="Home" />
                <NavItem to="/trends" icon={<TrendsIcon />} label="Trends" />
                <NavItem to="/favorites" icon={<FavoritesIcon />} label="Favorites" />
                <NavItem to="/settings" icon={<SettingsIcon />} label="Settings" />
            </nav>

            <footer className={s.footer}>
                <p>© All rights reserved</p>
            </footer>
        </aside>
    );
};