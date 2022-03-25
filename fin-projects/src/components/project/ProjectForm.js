import style from './ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import Submit from '../form/Submit'

function ProjectForm({btnText}) {
    return(
        <form className={style.form}>
            <Input
            type="text"
            text="Nome do projeto"
            name="name"
            placeholder="Nome do projeto"
            />
            <Input
            type="number"
            text="Orçamento Total"
            name="budget"
            placeholder="Orçamento"
            />
            <div>
            <Select
            name="category_id"
            text="Selecione a categoria"
            />
            </div>
            <div>
                <Submit text={btnText}/>
            </div>
        </form>
    )
}

export default ProjectForm