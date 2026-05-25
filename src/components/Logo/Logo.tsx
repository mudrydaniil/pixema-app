import styles from './Logo.module.scss'
import logoImg from '../../assets/icons/logo.svg'

export const Logo = () => {
    return (
        <div className={styles.logo}>
            <img src={logoImg} alt='Pixema' />
        </div>
    )
}