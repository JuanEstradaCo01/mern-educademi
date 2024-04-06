import { Link } from "react-router-dom";
import "./GestionCursos.css"
import Button from 'react-bootstrap/Button';
import React, { useContext } from 'react';
import { userContext } from "../../../context/context";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"

function GestionCursos() {

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

    if (userId === "") {
        authFail()
        return (
            <main id="bodyAuthFailGestionCursos">
            </main>
        )
    }

    return (
        <main id="bodyGestionCursos">
            <h1>Gestion de cursos</h1>
            <hr />
            <div className="contenedorAreasGestionCursos">
                <h3>Idiomas:</h3>
                <div className="contenedorBtnAreasGestionCursos">
                    <Link to={"/idiomas/addcurso"}><Button variant="success">Agregar un curso</Button>{' '}</Link>
                    <Link to={"/idiomas"}><Button variant="dark">Ver cursos</Button></Link>
                </div>
            </div>
            <div className="contenedorAreasGestionCursos">
                <h3>Programación:</h3>
                <div className="contenedorBtnAreasGestionCursos">
                    <Link to={"/programacion/addcurso"}><Button variant="success">Agregar un curso</Button>{' '}</Link>
                    <Link to={"/programacion"}><Button variant="dark">Ver cursos</Button></Link>
                </div>
            </div>
            <div className="contenedorAreasGestionCursos">
                <h3>Artes:</h3>
                <div className="contenedorBtnAreasGestionCursos">
                    <Link to={"/artes/addcurso"}><Button variant="success">Agregar un curso</Button>{' '}</Link>
                    <Link to={"/artes"}><Button variant="dark">Ver cursos</Button></Link>
                </div>
            </div>
            <div className="contenedorAreasGestionCursos">
                <h3>Gastronomia:</h3>
                <div className="contenedorBtnAreasGestionCursos">
                    <Link to={"/gastronomia/addcurso"}><Button variant="success">Agregar un curso</Button>{' '}</Link>
                    <Link to={"/gastronomia"}><Button variant="dark">Ver cursos</Button></Link>
                </div>
            </div>
        </main>
    )
}

export default GestionCursos;