import "./Idiomas.css"
import React, { useState, useEffect, useContext } from "react";
import Ingles from "../../../imgs/idiomas-ingles.png"
import Button from 'react-bootstrap/Button';
import Frances from "../../../imgs/idiomas-frances.png"
import Aleman from "../../../imgs/idioma-aleman.png"
import Loader from "../../Loader/Loader";
import { userContext } from "../../context/context";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

function Idiomas() {
    const [courses, setCourses] = useState("")
    const { userInContext, inscribirse } = useContext(userContext)

    useEffect(() => {
        fetch(`/idiomas`)
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
        <main id="bodyIdiomas">
            <h1>Idiomas</h1>

            {courses.map(item => {
                function contenedorStyle() {
                    if (item.curso === "Ingles") {
                        return "contenedorIdiomasIngles"
                    } else if (item.curso === "Frances") {
                        return "contenedorIdiomasFrances"
                    } else if (item.curso === "Aleman") {
                        return "contenedorIdiomasAleman"
                    }else{
                        return "contenedorIdiomasFrances"
                    }
                }

                function img() {
                    if (item.curso === "Ingles") {
                        return Ingles
                    } else if (item.curso === "Frances") {
                        return Frances
                    } else if (item.curso === "Aleman") {
                        return Aleman
                    }else{
                        return Ingles
                    }
                }

                return (
                    <div className={contenedorStyle()}>
                        <img className="imgIdiomas" src={img()} alt="Ingles" />
                        <div className="contenedorDescripcionIdioma">
                            <h4>{item.curso}</h4>
                            <p><strong>Titulación: </strong>{item.titulacion}</p>
                            <p><strong>Duración: </strong> {(item.duracion > 1) ? <span>{item.duracion} años</span> : <span>{item.duracion} año</span>}</p>
                            <p><strong>Conocimientos previos: </strong>{item.conocimientosPrevios}</p>
                            <p><strong>Descripción: </strong>{item.descripcion}</p>

                            {(userInContext.role === "Admin") ?
                                <div>
                                    <Link to={"/gestioncursos"}><Button className="btnInscribirse" variant="outline-light">Gestionar</Button>{' '}</Link>
                                </div> :
                                <div>
                                    <Button onClick={() => { inscribirse(item.area, item._id) }} className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
            <ToastContainer />
        </main>
    )
}

export default Idiomas;