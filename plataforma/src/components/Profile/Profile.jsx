import { useParams, useNavigate, Link } from "react-router-dom"
import { userContext } from "../context/context"
import "./Profile.css"
import React, { useEffect, useState, useContext } from "react"
import Loader from "../Loader/Loader"
import Button from 'react-bootstrap/Button';
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"

function Profile() {

    const { agregarId, cerrarSesion } = useContext(userContext)

    const { uid } = useParams()

    agregarId(uid)

    const [user, setUser] = useState("")

    const navigate = useNavigate()

    const MySwal = withReactComponent(Swal)

    useEffect(() => {
        fetch(`/user/${uid}`)
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
    }, [])

    if (user === "") {
        return <Loader />
    }

    if (user.role === "Admin") {
        return (
            <>
                <h1>Admin hello</h1>
                <Link to={"/ingresar"}><Button onClick={cerrarSesion} variant="outline-danger">Cerrar sesión</Button>{' '}</Link>
            </>
        )
    }

    const userCourses = user.courses

    return (
        <main id="bodyProfile">
            <h1>User Profile</h1>
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
                {(userCourses.length !== 0) ? userCourses.map((item => {
                    return (
                        <div className="contenedorCursosInscritosDetalles">
                            <thead>
                                <tr>
                                    <th>{item.curso}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><Button variant="success">Ir al curso</Button>{' '}</td>
                                    <td><Button variant="danger">Eliminar</Button>{' '}</td>
                                </tr>
                    
                            </tbody>
                        </div>
                    )
                })) :
                    <h5>No te has inscrito a ningun curso.</h5>}
            </div>
        </main>
    )
}

export default Profile