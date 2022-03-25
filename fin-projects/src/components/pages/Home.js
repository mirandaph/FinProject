import styles from './../pages/Home.module.css'
import money from './../../img/money.png'

function Home() {
    return (
        <section className={styles.home_container}>
                <h1>Gerencie as finanças do seu projeto</h1>
                <p>Com a FinProject, sua organização financeira fica sempre organizada!</p>
                <a href="/newproject">Criar novo projeto</a>
        </section>
    )
}

export default Home