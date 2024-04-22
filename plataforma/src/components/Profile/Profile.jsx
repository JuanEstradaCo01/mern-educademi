import { useParams, useNavigate, Link } from "react-router-dom"
import { userContext } from "../context/context"
import "./Profile.css"
import React, { useEffect, useState, useContext } from "react"
import Loader from "../Loader/Loader"
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"
import AdminProfile from "../AdminProfile/AdminProfile"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

function Profile() {

    const { agregarUser, agregarId, cerrarSesion } = useContext(userContext)

    const { uid } = useParams()

    agregarId(uid)

    const [user, setUser] = useState("")

    agregarUser(user)

    const navigate = useNavigate()

    const MySwal = withReactComponent(Swal)

    const [cookie, setCookie, removeCookie] = useCookies(['authToken']);
    console.log({cookie})

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
        fetch(`${process.env.REACT_APP_URL_BACK}/user/${uid}`)
            .then(res => res.json())
            .then(data => {
                if (data.code !== 200) {
                    agregarId("")
                    MySwal.fire({
                        show: true,
                        title: `<strong>${data.message}</strong>`,
                        icon: "error",
                        showConfirmButton: true
                    })
                    navigate("/ingresar")
                } else if (data.code === 200) {
                    setUser(data)
                    setCookie("authToken", `${data.token}`)
                }
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

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
                eliminarCurso(itemId)
              }
          });
    }

    async function eliminarCurso(cid) {
        await fetch(`${process.env.REACT_APP_URL_BACK}/desinscribir/${uid}/${cid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.json())
            .then(data => {
                notify(data.message)
                fetch(`${process.env.REACT_APP_URL_BACK}/user/${uid}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data.code !== 200) {
                            agregarId("")
                            MySwal.fire({
                                show: true,
                                title: `<strong>${data.message}</strong>`,
                                icon: "error",
                                showConfirmButton: true
                            })
                            navigate("/ingresar")
                        } else if (data.code === 200) {
                            setUser(data)
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    if (user === "") {
        return <Loader />
    }

    if (user.role === "Admin") {
        return (<AdminProfile admin={user} />)
    }

    return (
        <main id="bodyProfile">
            <h1>Perfil del usuario</h1>
            <hr />
            <h3>¡Hola, {user.names}!</h3>
            <div className="contenedorInfoPersonalPerfil">
                <p><strong>Nombre:</strong> {user.names}</p>
                <p><strong>Apellidos:</strong> {user.lastNames} </p>
                <p><strong>Edad: </strong> {user.age} años</p>
                <p><strong>Email: </strong> {user.email}</p>
                <Link to={"/ingresar"}><Button className="btnLogout" onClick={cerrarSesion} variant="outline-danger">Cerrar sesión</Button>{' '}</Link>
            </div>
            <div className="contenedorCursosInscritosPerfil">
                <h2>Tus cursos:</h2>
                {(user.courses.length !== 0) ? user.courses.map((item => {
                    return (
                        <div className="contenedorCursosInscritosDetalles">
                            <thead>
                                <tr>
                                    <th>{item.curso}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Link to={`/${item.curso}`}><Button variant="success">Ir al curso</Button>{' '}</Link></td>
                                    <td><Button onClick={() => { validarDelete(item._id) }} variant="danger">Eliminar</Button>{' '}</td>
                                </tr>

                            </tbody>
                        </div>
                    )
                })) :
                    <h5>¡No te has inscrito a ningun curso!</h5>}
            </div>
            <ToastContainer />
        </main>
    )
}

export default Profile