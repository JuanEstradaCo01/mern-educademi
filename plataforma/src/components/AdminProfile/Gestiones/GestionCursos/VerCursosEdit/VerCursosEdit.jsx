import "./VerCursosEdit.css"
import { Link, useParams } from "react-router-dom"
import React, { useEffect, useState, useContext } from "react"
import Loader from "../../../../Loader/Loader"
import Button from 'react-bootstrap/Button';
import { userContext } from "../../../../context/context";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"

function VerCursosEdit() {

    const { areaCurso } = useParams()
    const [cursos, setCursos] = useState("")

    const { userId } = useContext(userContext)
    const MySwal = withReactComponent(Swal)

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
        fetch(`${process.env.REACT_APP_URL_BACK}/${areaCurso}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setCursos(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    async function validarDelete(item){
        return Swal.fire({
            title: "¿Estas seguro?",
            text: "Esta accion es irreversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
                deleteCourse(item)
              }
          });
    }

    async function deleteCourse(item) {
        await fetch(`${process.env.REACT_APP_URL_BACK}/eliminar/${item.area}/${item._id}/${userId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    fetch(`${process.env.REACT_APP_URL_BACK}/${areaCurso}`, {
                        credentials: 'include',
                    })
                        .then(res => res.json())
                        .then(data => {
                            setCursos(data)
                        })
                        .catch((e) => {
                            console.log(e)
                        })

                    return MySwal.fire({
                        show: true,
                        title: `<strong>¡${data.message}!</strong>`,
                        icon: "success",
                        showConfirmButton: true
                    })
                }

                MySwal.fire({
                    show: true,
                    title: `<strong>¡${data.message}!</strong>`,
                    icon: "error",
                    showConfirmButton: true
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

    if (cursos === "") {
        return (<Loader />)
    }

    return (
        <main id="bodyVerCursos">
            <h1>Editar cursos de {areaCurso}</h1>

            <div className="contenedorEditCurso">
                {cursos.map((item => {
                    return (
                        <div className="editCurso">
                            <h2>{item.curso}</h2>
                            <div>
                                <Link to={`/editarcurso/${item.area}/${item._id}`} ><Button variant="success">Editar</Button>{' '}</Link>
                                <Button onClick={() => { validarDelete(item) }} variant="danger">Eliminar</Button>{' '}
                            </div>
                        </div>
                    )
                }))}
            </div>
        </main>
    )
}

export default VerCursosEdit;