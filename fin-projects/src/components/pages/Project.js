import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Project() {
    const {id} = useParams()

    const [project, setProject] = useState({})

    useEffect(() => {
        setTimeout(
          () =>
            fetch(`http://localhost:5000/projects/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((resp) => resp.json())
              .then((data) => {
                setProject(data)
              }),
          0,
        )
      }, [id])

    return(
        <div>
            <p> {project.name} </p>
        </div>
    )
}

export default Project