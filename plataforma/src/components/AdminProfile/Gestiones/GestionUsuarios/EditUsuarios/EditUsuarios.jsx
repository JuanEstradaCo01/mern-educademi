import "./EditUsuarios.css"
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Loader from "../../../../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FiCheck } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"
import { userContext } from "../../../../context/context";

function EditUsuarios() {

    const { uid } = useParams()
    const { adminId } = useParams()
    const [user, setUser] = useState("")
    const { userId } = useContext(userContext)
    const MySwal = withReactComponent(Swal)

    const [valorEditarNombre, setValorEditarNombre] = useState(user.names)
    const [editName, setEditName] = useState(false)

    const [valorEditarApellido, setValorEditarApellido] = useState(user.lastNames)
    const [editApellido, setEditApellido] = useState(false)

    const [valorEditarEdad, setValorEditarEdad] = useState(user.age)
    const [editEdad, setEditEdad] = useState(false)

    const [valorEditarEmail, setValorEditarEmail] = useState(user.email)
    const [editEmail, setEditEmail] = useState(false)

    const [valorEditarPhone, setValorEditarPhone] = useState(user.phone)
    const [editPhone, setEditPhone] = useState(false)

    function resetEstados(){
        setEditName(false)
        setEditApellido(false)
        setEditEdad(false)
        setEditEmail(false)
        setEditPhone(false)
    }

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
        fetch(`/edituser/${uid}/${adminId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    if(userId === "") {
        authFail()
        return (
            <main id="bodyAuthFailGestionCursos">
            </main>
        )
    }

    if (user === "") {
        return <Loader />
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

    const actualizar = async (evt) => {
        evt.preventDefault()

        resetEstados()

        const body = {
            names: valorEditarNombre,
            lastNames: valorEditarApellido,
            age: valorEditarEdad,
            email: valorEditarEmail,
            phone: valorEditarPhone
        }

        await fetch(`/edituser/${uid}/${adminId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(data => {
                notify(data.message)
                fetch(`/edituser/${uid}/${adminId}`)
                    .then(res => res.json())
                    .then(data => {
                        setUser(data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function validarDesinscribir(Id){
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
                desinscribir(Id)
              }
          });
    }

    async function desinscribir(cid) {
        await fetch(`/desinscribir/${uid}/${cid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                notify(data.message)
                fetch(`/edituser/${uid}/${adminId}`)
                    .then(res => res.json())
                    .then(data => {
                        setUser(data)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <main id="bodyEditUser">
            <h1>Editar usuario {user.names}</h1>
            <div className="contenedorUserInfoEditUser">
                {(editName === false) ? <p><Button onClick={() => { setEditName(true) }} variant="dark">🖊</Button><strong>Nombre: </strong>{user.names}</p> :
                    <form id="formEditUser">
                        <label><p><Button onClick={() => { setEditName(true) }} variant="dark">🖊</Button><strong>Nombre: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarNombre(e.target.value) }} type="text" placeholder="Ingresa el nuevo nombre" required />
                        <button className="cancelEditUser" onClick={() => { setEditName(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button className="editUserSuccess" type="submit" onClick={actualizar}><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                {(editApellido === false) ? <p><Button onClick={() => { setEditApellido(true) }} variant="dark">🖊</Button><strong>Apellidos: </strong>{user.lastNames}</p> :
                    <form id="formEditUser">
                        <label><p><Button onClick={() => { setEditApellido(true) }} variant="dark">🖊</Button><strong>Apellidos: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarApellido(e.target.value) }} type="text" placeholder="Ingresa el nuevo Apellido" required />
                        <button className="cancelEditUser" onClick={() => { setEditApellido(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button className="editUserSuccess" type="submit" onClick={actualizar}><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                {(editEdad === false) ? <p><Button onClick={() => { setEditEdad(true) }} variant="dark">🖊</Button>{(user.age === 1) ? <span><strong>Edad: </strong>{user.age} año</span> : <span><strong>Edad: </strong>{user.age} años</span>}</p> :
                    <form id="formEditUser">
                        <label><p><Button onClick={() => { setEditEdad(true) }} variant="dark">🖊</Button><strong>Edad: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarEdad(e.target.value) }} type="number" placeholder="Ingresa la nueva edad" required />
                        <button className="cancelEditUser" onClick={() => { setEditEdad(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button className="editUserSuccess" type="submit" onClick={actualizar}><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                {(editEmail === false) ? <p><Button onClick={() => { setEditEmail(true) }} variant="dark">🖊</Button><strong>Email: </strong>{user.email}</p> :
                    <form id="formEditUser">
                        <label><p><Button onClick={() => { setEditEmail(true) }} variant="dark">🖊</Button><strong>Email: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarEmail(e.target.value) }} type="text" placeholder="Ingresa el nuevo Email" required />
                        <button className="cancelEditUser" onClick={() => { setEditEmail(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button className="editUserSuccess" type="submit" onClick={actualizar}><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

                {(editPhone === false) ? <p><Button onClick={() => { setEditPhone(true) }} variant="dark">🖊</Button><strong>Telefono: </strong>{user.phone}</p> :
                    <form id="formEditUser">
                        <label><p><Button onClick={() => { setEditPhone(true) }} variant="dark">🖊</Button><strong>Telefono: </strong></p></label>
                        <input className="inputEditar" onChange={(e) => { setValorEditarPhone(e.target.value) }} type="tel" placeholder="Ingresa el nuevo Telefono" required />
                        <button className="cancelEditUser" onClick={() => { setEditPhone(false) }}><FiXCircle className="cancelEditUserIcon" /></button>
                        <button className="editUserSuccess" type="submit" onClick={actualizar}><FiCheck className="editUserSuccessIcon" /></button>
                    </form>
                }

            </div>

            <div className="contenedorCursosUsuarioEdit">
                <h2>Cursos inscritos:</h2>
                {(user.courses.length === 0) ? <h4>¡El usuario no se ha inscrito a ningun curso!</h4> :
                    user.courses.map((curso => {
                        return (
                            <div className="contenedorCursoEdit">
                                <h5><strong>Curso: </strong>{curso.curso}</h5>
                                <Button onClick={() => {validarDesinscribir(curso._id)}} variant="danger">Desinscribir</Button>
                            </div>
                        )
                    }))
                }
            </div>
            <ToastContainer />
        </main>
    )
}

export default EditUsuarios;