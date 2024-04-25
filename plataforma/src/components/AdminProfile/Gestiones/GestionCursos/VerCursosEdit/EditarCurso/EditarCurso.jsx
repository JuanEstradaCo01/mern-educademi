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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function EditarCurso() {

    const { areaCurso } = useParams()
    const { cid } = useParams()
    const { userId } = useContext(userContext)
    const MySwal = withReactComponent(Swal)

    const [course, setCourse] = useState("")

    const [valorEditarCurso, setValorEditarCurso] = useState(course.curso)
    const [editCurso, setEditCurso] = useState(false)

    const [valorEditarTitulacion, setValorEditarTitulacion] = useState(course.titulacion)
    const [editTitulacion, setEditTitulacion] = useState(false)

    const [valorEditarDuracion, setValorEditarDuracion] = useState(course.duracion)
    const [editDuracion, setEditDuracion] = useState(false)

    const [valorEditarDescripcion, setValorEditarDescripcion] = useState(course.descripcion)
    const [editDescripcion, setEditDescripcion] = useState(false)

    const [valorEditarConocimientosPrevios, setValorEditarConocimientosPrevios] = useState(course.conocimientosPrevios)
    const [editConocimientosPrevios, setEditConocimientosPrevios] = useState(false)

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

    function resetEstados(){
        setEditCurso(false)
        setEditTitulacion(false)
        setEditDuracion(false)
        setEditDescripcion(false)
        setEditConocimientosPrevios(false)
    }

    const notify = (message) =>
        toast.success(`¡${message}!`, {
            position: "bottom-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_BACK}/${areaCurso}/${cid}/${userId}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setCourse(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    const actualizar = async (evt) => {
        evt.preventDefault()

        resetEstados()

        const body = {
            curso: valorEditarCurso,
            titulacion: valorEditarTitulacion,
            duracion: valorEditarDuracion,
            descripcion: valorEditarDescripcion,
            conocimientosPrevios:valorEditarConocimientosPrevios
        }

        await fetch(`${process.env.REACT_APP_URL_BACK}/editarcurso/${areaCurso}/${course._id}/${userId}`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(data => {
                notify(data.message)
                fetch(`${process.env.REACT_APP_URL_BACK}/${areaCurso}/${cid}/${userId}`, {
                    credentials: 'include',
                })
                    .then(res => res.json())
                    .then(data => {
                        setCourse(data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    if (userId === "") {
        authFail()
        return (
            <main id="bodyAuthFailGestionCursos">
            </main>
        )
    }

    if (course === "") {
        return <Loader />
    }

    return (
        <main id="bodyEditCourseAdmin">
            <h1>Editar curso de {course.curso}</h1>

            <hr />

            <div className="contenedorEditarCursoAdmin">

                {(editCurso === false) ? <p><Button onClick={() => { setEditCurso(true) }} variant="dark">🖊</Button><strong>Curso: </strong>{course.curso}</p> :
                    <form id="formEditCourse">
                        <label><p><Button onClick={() => { setEditCurso(true) }} variant="dark">🖊</Button><strong>Curso: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarCurso(e.target.value) }} type="text" placeholder="Ingresa el nuevo nombre" />
                        <button className="cancelEditUser" onClick={() => { setEditCurso(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button onClick={actualizar} className="editUserSuccess" type="submit" ><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                {(editTitulacion === false) ? <p><Button onClick={() => { setEditTitulacion(true) }} variant="dark">🖊</Button><strong>Titulación: </strong>{course.titulacion}</p> :
                    <form id="formEditCourse">
                        <label><p><Button onClick={() => { setEditTitulacion(true) }} variant="dark">🖊</Button><strong>Titulación: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarTitulacion(e.target.value) }} type="text" placeholder="Ingresa la nueva titulacion" />
                        <button className="cancelEditUser" onClick={() => { setEditTitulacion(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button onClick={actualizar} className="editUserSuccess" type="submit" ><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                {(editDuracion === false) ? <p><Button onClick={() => { setEditDuracion(true) }} variant="dark">🖊</Button><strong>Duración: </strong>{(course.duracion === 1) ? <span>{course.duracion} año</span> : <span>{course.duracion} años</span>}</p> :
                    <form id="formEditCourse">
                        <label><p><Button onClick={() => { setEditDuracion(true) }} variant="dark">🖊</Button><strong>Duración: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarDuracion(e.target.value) }} type="number" placeholder="Ingresa la nueva duracion" />
                        <button className="cancelEditUser" onClick={() => { setEditDuracion(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button onClick={actualizar} className="editUserSuccess" type="submit" ><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                {(editConocimientosPrevios === false) ? <p><Button onClick={() => { setEditConocimientosPrevios(true) }} variant="dark">🖊</Button><strong>Conocimientos Previos: </strong>{course.conocimientosPrevios}</p>  :
                    <form id="formEditCourse">
                        <label><p><Button onClick={() => { setEditConocimientosPrevios(true) }} variant="dark">🖊</Button><strong>Conocimientos Previos: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarConocimientosPrevios(e.target.value) }} type="text" placeholder="Ingresa los conocimientos" />
                        <button className="cancelEditUser" onClick={() => { setEditConocimientosPrevios(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button onClick={actualizar} className="editUserSuccess" type="submit" ><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }
                
                {(editDescripcion === false) ? <p><Button onClick={() => { setEditDescripcion(true) }} variant="dark">🖊</Button><strong>Descripción: </strong>{course.descripcion}</p>  :
                    <form id="formEditCourse">
                        <label><p><Button onClick={() => { setEditDescripcion(true) }} variant="dark">🖊</Button><strong>Conocimientos Previos: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarDescripcion(e.target.value) }} type="text" placeholder="Ingresa la nueva descripcion" />
                        <button className="cancelEditUser" onClick={() => { setEditDescripcion(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button onClick={actualizar} className="editUserSuccess" type="submit" ><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }
            </div>
            <ToastContainer />
        </main>
    )
}

export default EditarCurso;