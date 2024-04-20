import { useParams } from "react-router-dom";
import "./AddCurso.css"
import Button from 'react-bootstrap/Button';
import React, { useContext, useState } from 'react';
import { userContext } from "../../../../context/context";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"


function AddCurso() {

    const { userId } = useContext(userContext)
    const { area } = useParams()
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

    const notifySuccess = (message) => {
        MySwal.fire({
            show: true,
            title: `${message}`,
            icon: "success",
            showConfirmButton: true
        })
    }

    const [curso, setCurso] = useState("")
    const [titulacion, setTitulacion] = useState("")
    const [duracion, setDuracion] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [conocimientosPrevios, setConocimientosPrevios] = useState("")

    const addCurso = async (evt) => {
        evt.preventDefault()

        document.getElementById("formAddCurso").reset()

        const course = ({
            curso: curso,
            titulacion: titulacion,
            duracion: duracion,
            descripcion: descripcion,
            conocimientosPrevios: conocimientosPrevios,
            area: area
        })

        await fetch(`/${area}/addcurso`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(course),
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 201) {
                    notifySuccess(data.message)
                } else if (data.code === 401 || 500) {
                    MySwal.fire({
                        show: true,
                        title: `<strong>${data.message}</strong>`,
                        icon: "error",
                        showConfirmButton: true
                    })
                }
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

    return (
        <main id="bodyAddCurso">
            <h2>Agregar curso de {area}</h2>
            <form id="formAddCurso">
                <label>
                    <p>Curso:</p>
                    <input onChange={(e) => { setCurso(e.target.value) }} id="curso" type="text" placeholder="Ingresa el nombre del curso" required />
                </label>
                <label>
                    <p>Titulación:</p>
                    <input onChange={(e) => { setTitulacion(e.target.value) }} id="titulacion" type="text" placeholder="Ingresa la titulacion obtenida" required />
                </label>
                <label>
                    <p>Duración:</p>
                    <input onChange={(e) => { setDuracion(e.target.value) }} id="duracion" type="number" placeholder="Ingresa la duracion (años)" required />
                </label>
                <label>
                    <p>Conocimientos previos:</p>
                    <input onChange={(e) => { setConocimientosPrevios(e.target.value) }} id="conocimientosPrevios" type="text" placeholder="Conocimientos previos" required />
                </label>
                <label>
                    <p>Descripción:</p>
                    <textarea onChange={(e) => { setDescripcion(e.target.value) }} id="descripcion" cols={"35"} rows={"6"} maxLength={"250"} placeholder="Descripción del curso" required />
                </label>

                <Button onClick={addCurso} className="btnAddCurso" type="submit" variant="primary">Agregar curso</Button>{' '}
            </form>
        </main>
    )
}

export default AddCurso;