import "./GestionUsuarios.css"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import React, { useContext, useEffect, useState } from 'react';
import { userContext } from "../../../context/context";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"
import Loader from "../../../Loader/Loader";

function GestionUsuarios() {

    const { userId } = useContext(userContext)
    const MySwal = withReactComponent(Swal)
    const [users, setUsers] = useState("")

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
        fetch(`/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, []);

    async function validarDelete(itemId){
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
                deleteUser(itemId)
              }
          });
    }

    async function deleteUser(itemId) {
        await fetch(`/delete/${itemId}/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    fetch(`/users/${userId}`)
                        .then(res => res.json())
                        .then(data => {
                            setUsers(data)
                        })
                        .catch((e) => {
                            console.log(e)
                        })

                    MySwal.fire({
                        show: true,
                        title: `<strong>${data.message}</strong>`,
                        icon: "success",
                        showConfirmButton: true
                    })
                } else if (data.code === 401 || 404 || 500) {
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

    if (users === "") {
        return <Loader />
    }

    if (users.length === 0) {
        return (
            <main id="bodyGestionUsuarios">
                <h1>No hay usuarios registrados</h1>
            </main>
        )
    }

    return (
        <main id="bodyGestionUsuarios">
            <h1>Gestion de usuarios</h1>
            <hr />
            {users.map(item => {
                return (
                    <div className="contenedorAreasGestionUsuarios">
                        <h5><strong>Nombre: </strong>{item.names}</h5>
                        <h5><strong>Email: </strong>{item.email}</h5>
                        <div className="contenedorBtnAreasGestionUsuarios">
                            <Link to={`/edituser/${item._id}/${userId}`}><Button variant="success">Editar usuario</Button>{' '}</Link>
                            <Button onClick={() => { validarDelete(item._id) }} variant="danger">Eliminar cuenta</Button>
                        </div>
                    </div>
                )
            })}
        </main>
    )
}

export default GestionUsuarios;