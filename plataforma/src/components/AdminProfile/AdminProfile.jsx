import "./AdminProfile.css"
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { userContext } from "../context/context"
import React, { useContext } from "react";

function AdminProfile(props) {

    const { cerrarSesion } = useContext(userContext)
    const dataAdmin = props.admin

    return (
        <main id="bodyAdminProfile">
            <h1>Admin profile</h1>
            <hr />
            <h3>¡Hola, {dataAdmin.names}!</h3>
            <div className="contenedorInfoPersonalPerfil">
                <p><strong>Nombre:</strong> {dataAdmin.names}</p>
                <p><strong>Apellidos:</strong> {dataAdmin.lastNames} </p>
                <p><strong>Edad: </strong> {dataAdmin.age} años</p>
                <p><strong>Email: </strong> {dataAdmin.email}</p>
                <Link to={"/ingresar"}><Button className="btnLogout" onClick={cerrarSesion} variant="outline-danger">Cerrar sesión</Button>{' '}</Link>
            </div>

            <hr />

            <h2 className="h2Gestiones">Gestiones</h2>
            <div className="contenedorGestiones">
                <div className="contenedorGestiones">
                    <div className="gestionCursos">
                        <h4>Cursos</h4>
                        <Link to={"/gestioncursos"}><Button variant="primary">Gestionar</Button>{' '}</Link>
                    </div>
                    <hr />
                    <div className="gestionUsuarios">
                    <h4>Usuarios</h4>
                        <Link to={"/gestionusuarios"}><Button variant="primary">Gestionar</Button>{' '}</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminProfile;