import "./Artes.css"
import React, { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Loader from "../../Loader/Loader"
import Fotografia from "../../../imgs/artes-fotografia.jpg"
import Musica from "../../../imgs/artes-musica.jpg"
import Dibujo from "../../../imgs/artes-dibujo.jpg"
import { userContext } from "../../context/context";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function Artes() {
    const [courses, setCourses] = useState("")
    const { userInContext, inscribirse } = useContext(userContext)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL_BACK}/artes`)
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
        <main id="bodyArtes">
            <h1>Artes</h1>

            {courses.map((item => {
                function contenedorStyle() {
                    if (item.curso === "Fotografía") {
                        return "contenedorArtesFotografia"
                    } else if (item.curso === "Música") {
                        return "contenedorArtesMusica"
                    } else if (item.curso === "Dibujo") {
                        return "contenedorArtesDibujo"
                    }else{
                        return "contenedorArtesMusica"
                    }
                }

                function img() {
                    if (item.curso === "Fotografía") {
                        return Fotografia
                    } else if (item.curso === "Música") {
                        return Musica
                    } else if (item.curso === "Dibujo") {
                        return Dibujo
                    }else{
                        return Dibujo
                    }
                }

                return (
                    <div className={contenedorStyle()}>
                        <img className="imgArtes" src={img()} alt="img" />

                        <div className="contenedorDescripcionArtes">
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

export default Artes;