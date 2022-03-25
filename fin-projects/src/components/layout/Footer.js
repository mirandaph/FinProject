import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import styles from './Footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li>
                    <a href='/'> <h3> Facebook <FaFacebook/> </h3> </a>
                </li>
                <li>
                    <a href='/'> <h3> Instagram <FaInstagram/> </h3> </a>
                </li>
                <li>
                    <a href='/'> <h3> LinkedIn <FaLinkedin/> </h3> </a>
                </li>
            </ul>
            <p className={styles.copy_right}>FinProjects &copy; 2022 </p>
        </footer>
    )
}

export default Footer