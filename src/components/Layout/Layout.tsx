import { Outlet } from 'react-router-dom'
import { Sidebar } from '../Sidebar/Sidebar'
import { Search } from '../Search/Search'
import { UserPick } from '../UserPick/UserPick'
import styles from './Layout.module.scss'

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <main className={styles.main}>
                <header className={styles.header}>
                    <Search />
                    <UserPick />
                </header>
                <section className={styles.content}>
                    <Outlet />
                </section>
            </main>
        </div>
    )
}