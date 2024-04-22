import React, { useState, useEffect, useContext } from "react"
import Loader from "../../Loader/Loader"
import "./Gastronomia.css"
import GastronomiaImg from "../../../imgs/gastronomia.jpg"
import Button from 'react-bootstrap/Button';
import { userContext } from "../../context/context";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function Gastronomia() {
    const [courses, setCourses] = useState("")
    const { userInContext, inscribirse } = useContext(userContext)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_BACK}/gastronomia`)
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
        <main id="bodyGastronomia">
            <h1>Gastronomía</h1>

            {courses.map((item => {
                function contenedorStyle() {
                    if (item.curso === "Gastronomía") {
                        return "contenedorGastronomia"
                    }else{
                        return "contenedorGastronomia"
                    }
                }

                function img() {
                    if (item.curso === "Gastronomía") {
                        return GastronomiaImg
                    }else{
                        return GastronomiaImg
                    }
                }

                return (
                    <div className={contenedorStyle()}>
                        <img className="imgGastronomia" src={img()} alt="img" />

                        <div className="contenedorDescripcionGastronomia">
                            <h4>{item.curso}</h4>
                            <p><strong>Titulación: </strong>{item.titulacion}</p>
                            <p><strong>Duración: </strong>{(item.duracion > 1) ? <span>{item.duracion} años</span> : <span>{item.duracion} año</span>}</p>
                            <p><strong>Conocimientos previos: </strong>{item.conocimientosPrevios}</p>
                            <p><strong>Descripción: </strong>{item.descripcion}</p>
                            
                            {(userInContext.role === "Admin") ?
                                <div>
                                    <Link to={"/gestioncursos"}><Button className="btnInscribirse" variant="outline-secondary">Gestionar</Button>{' '}</Link>
                                </div> :
                                <div>
                                    <Button onClick={() => { inscribirse(item.area, item._id) }} className="btnInscribirse" variant="outline-secondary">Inscribirse</Button>{' '}
                                </div>
                            }
                        </div>
                    </div>
                )
            }))
            }
            <ToastContainer />
        </main>
    )
}

export default Gastronomia;