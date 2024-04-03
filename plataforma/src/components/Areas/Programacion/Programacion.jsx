import "./Programacion.css"
import React, { useState, useEffect, useContext } from "react"
import Front from "../../../imgs/programacion-front.jpg"
import Back from "../../../imgs/programacion-back.jpg"
import FS from "../../../imgs/programacion-FS.jpg"
import Button from 'react-bootstrap/Button';
import Loader from "../../Loader/Loader"
import { userContext } from "../../context/context";
import { ToastContainer } from "react-toastify";

function Programacion() {

    const [courses, setCourses] = useState("")
    const { inscribirse } = useContext(userContext)

    useEffect(() => {
        fetch(`/programacion`)
            .then(res => res.json())
            .then(data => {
                setCourses(data)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    if (courses === "") {
        return <Loader />
    }

    return (
        <main id="bodyProgramacion">
            <h1>Programación</h1>

            {courses.map((item => {
                function contenedorStyle(){
                    if (item.curso === "frontend") {
                        return "contenedorProgramacionFront"
                    } else if (item.curso === "backend") {
                        return "contenedorProgramacionBack"
                    } else if (item.curso === "full-stack") {
                        return "contenedorProgramacionFullStack"
                    }
                }

                function img() {
                    if (item.curso === "frontend") {
                        return Front
                    } else if (item.curso === "backend") {
                        return Back
                    } else if (item.curso === "full-stack") {
                        return FS
                    }
                }

                return (
                    <div className={contenedorStyle()}>
                        <img className="imgProgramacion" src={img()} alt="img" />

                        <div className="contenedorDescripcionProgramacion">
                            <h4>{item.curso}</h4>
                            <p><strong>Titulación: </strong>{item.titulacion}</p>
                            <p><strong>Duración: </strong>{(item.duracion > 1) ? <span>{item.duracion} años</span> : <span>{item.duracion} año</span>}</p>
                            <p><strong>Conocimientos previos: </strong>{item.conocimientosPrevios}</p>
                            <p><strong>Descripción: </strong>{item.descripcion}</p>
                            <Button onClick={() => { inscribirse(item.area, item._id) }} className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                        </div>
                    </div>
                )
            }))
            }
            <ToastContainer />
        </main>
    )
}

export default Programacion;