import {Link} from 'react-router-dom'
import Container from './Container'
import styles from './Navbar.module.css'

function Navbar(){
    return(
    <nav className={styles.navbar}>
        <Container>
            <h1 className={styles.title}><span className={styles.span}>Fin</span>Project</h1>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link to="/">Início</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/projects">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Empresa</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contact">Contato</Link>
                    </li>
                </ul>
        </Container>
    </nav>
    )
}

export default Navbar