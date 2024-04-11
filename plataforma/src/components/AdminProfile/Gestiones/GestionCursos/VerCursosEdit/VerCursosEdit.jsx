import "./VerCursosEdit.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import Loader from "../../../../Loader/Loader"

function VerCursosEdit() {

    const { areaCurso } = useParams()
    const [cursos, setCursos] = useState("")

    useEffect(() => {
        fetch(`/${areaCurso}`)
          .then(res => res.json())
          .then(data => {
            setCursos(data)
          })
          .catch((e) => {
            console.log(e)
        })
    },[])

    if(cursos === ""){
        return(<Loader />)
    }

    return(
        <main id="bodyVerCursos">
            <h1>Editar cursos de {areaCurso}</h1>

            <div className="contenedorEditCurso">
                {cursos.map((item => {
                    return(
                        <div className="editCurso">
                            <h2>{item.curso}</h2>
                            <div>
                                <button>Editar</button>
                                <button>Eliminar</button>
                            </div>
                        </div>
                    )
                }))}
            </div>
        </main>
    )
}

export default VerCursosEdit;