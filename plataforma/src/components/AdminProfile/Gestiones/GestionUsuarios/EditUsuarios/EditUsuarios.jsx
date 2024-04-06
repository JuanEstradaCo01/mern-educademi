import "./EditUsuarios.css"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Loader from "../../../../Loader/Loader";

function EditUsuarios() {

    const { uid } = useParams()
    const { adminId } = useParams()
    const [user, setUser] = useState("")

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

    if (user === "") {
        return <Loader />
    }

    return (
        <main id="bodyEditUser">
            <h1>Editar usuario {user.names}</h1>
            <div className="contenedorUserInfoEditUser">
                <p><Button variant="dark">🖊</Button><strong>Nombre: </strong>{user.names}</p>
                <p><Button variant="dark">🖊</Button><strong>Apellidos: </strong>{user.lastNames}</p>
                <p><Button variant="dark">🖊</Button><strong>Edad: </strong>{user.age}</p>
                <p><Button variant="dark">🖊</Button><strong>Email: </strong>{user.email}</p>
                <p><Button variant="dark">🖊</Button><strong>Telefono: </strong>{user.phone}</p>
            </div>

            <div className="contenedorCursosUsuarioEdit">
                <h2>Cursos inscritos:</h2>
                {(user.courses.length === 0) ? <h4>¡El usuario no se ha inscrito a ningun curso!</h4> :
                    user.courses.map((curso => {
                        return (
                            <div className="contenedorCursoEdit">
                                <h5><strong>Curso: </strong>{curso.curso}</h5>
                                <Button variant="danger">Desinscribir</Button>
                            </div>
                        )
                    }))
                }
            </div>
        </main>
    )
}

export default EditUsuarios;