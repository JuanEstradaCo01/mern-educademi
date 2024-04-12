import "./EditarCurso.css"
import { useParams } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { userContext } from "../../../../../context/context"
import Button from 'react-bootstrap/Button';
import { FiCheck } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"
import Loader from "../../../../../Loader/Loader";

function EditarCurso(){

    const { areaCurso } = useParams()
    const { cid } = useParams()
    const { userId } = useContext(userContext)
    const MySwal = withReactComponent(Swal)

    const [course, setCourse] = useState("")

    const [valorEditarCurso, setValorEditarCurso] = useState(course.curso)
    const [editCurso, setEditCurso] = useState(false)

    function authFail() {
        MySwal.fire({
            show: true,
            title: `<strong>Error de autenticacion, ¡Inicia sesion!</strong>`,
            icon: "error",
            showConfirmButton: false,
            allowOutsideClick: false,
            footer: `<a href="/ingresar"><button class="btnRedirectIngresarSinAuth">Iniciar sesion</button></a>`
        })
    }

    useEffect(() => {
        fetch(`/${areaCurso}/${cid}/${userId}`)
            .then(res => res.json())
            .then(data => {
                setCourse(data)
            })
            .catch((e) => {
                console.log(e)
            })
    },[])

    if (userId === "") {
        authFail()
        return (
            <main id="bodyAuthFailGestionCursos">
            </main>
        )
    }

    if(course === ""){
        return <Loader />
    }

    return(
        <main id="bodyEditCourseAdmin">
            <h1>Editar curso de {course.curso}</h1>

            <hr />

            <div className="contenedorEditarCursoAdmin">
                
            {(editCurso === false) ? <p><Button onClick={() => { setEditCurso(true) }} variant="dark">🖊</Button><strong>Curso: </strong>{course.curso}</p> :
                    <form id="formEditCourse">
                        <label><p><Button onClick={() => { setEditCurso(true) }} variant="dark">🖊</Button><strong>Curso: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarCurso(e.target.value) }} type="text" placeholder="Ingresa el nuevo nombre" required />
                        <button className="cancelEditUser" onClick={() => { setEditCurso(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button className="editUserSuccess" type="submit" ><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                <p><strong>Titulación: </strong>{course.titulacion}</p>
                <p><strong>Duración: </strong>{(course.duracion === 1) ? <span>{course.duracion} año</span> : <span>{course.duracion} años</span>}</p>
                <p><strong>Conocimientos previos: </strong>{course.conocimientosPrevios}</p>
                <p><strong>Descripción: </strong>{course.descripcion}</p>
            </div>
        </main>
    )
}

export default EditarCurso;