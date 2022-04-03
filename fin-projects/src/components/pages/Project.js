import styles from './Project.module.css'

import Loading from '../layout/Loading'
import Container from '../layout/Container'

import {v4 as uuidv4} from 'uuid'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {
    const {id} = useParams()

    const [project, setProject] = useState({})
    const [services, setServices] = useState({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)

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
                setServices(data.services)
              }),
          300,
        )
      }, [id])

      function editPost(project) {
        if (project.budget < project.cost) {
          alert('O Orçamento não pode ser menor que o custo do projeto!')
          return false
        }
    
        fetch(`http://localhost:5000/projects/${project.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(project),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProject(data)
            setShowProjectForm(!showProjectForm)
          })
      }

      function createService(project) {
        const lastService = project.services[project.services.length - 1]
    
        lastService.id = uuidv4()
    
        const lastServiceCost = lastService.cost
    
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
    
        // validação de custo 
        if (newCost > parseFloat(project.budget)) {
          alert('O custo do serviço é maior que o orçamento total!')
          project.services.pop()
          return false
        }

        // adicionar custo de serviço ao total
        project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setShowServiceForm(!showServiceForm)
      })
      }

    function toggleProjectForm(){
      setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
      setShowServiceForm(!showServiceForm)
    }

    function removeService(id, cost) {
      const servicesUpdated = project.services.filter(
        (service) => service.id !== id,
      )
  
      const projectUpdated = project
  
      projectUpdated.services = servicesUpdated
      projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)
  
      fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectUpdated),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProject(projectUpdated)
          setServices(servicesUpdated)
        })
    }

    return <> {project.name ? (
      <div className={styles.project_details}>
        <Container customClass="column">
          <div className={styles.details_container}>
            <h1> Projeto: {project.name} </h1>
            <button className={styles.btn} onClick={toggleProjectForm}>
              {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento: </span>R${project.budget}
                  </p>
                  <p>
                    <span>Total Utilizado: </span>R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                </div>
              )}
          </div>
          <div className={styles.service_form_container}>
            <h2>Adicione um serviço</h2>
            <button className={styles.btn} onClick={toggleServiceForm}>
              {!showServiceForm ? 'Adicionar' : 'Fechar'}
            </button>
            <div className={styles.project_info}>
                {showServiceForm && <ServiceForm
                  handleSubmit={createService}
                  btnText="Adicionar serviço"
                  projectData={project}
                />}
            </div>
          </div>
          <h2>Serviços</h2>
          <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.key}
                    handleRemove={removeService}
                  />
                ))
              }
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
          </Container>
        </Container>
      </div>
    ) : <Loading/> } </>
}

export default Project