import { useLocation } from "react-router-dom"
import styles from "./Projects.module.css"
import Container from "../layout/Container"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"


function Projects() {

    const [projects, setProjects] = useState([]) 

    useEffect(() => {
            setTimeout(
              () =>
                fetch('http://localhost:5000/projects', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                  .then((resp) => resp.json())
                  .then((data) => {
                    setProjects(data)
                  }),
              100,
            )
          }, [])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <a href="/newproject">Criar novo projeto</a>
            </div>
            <Container customClass="start"></Container>
        </div>
    )
}

export default Projects