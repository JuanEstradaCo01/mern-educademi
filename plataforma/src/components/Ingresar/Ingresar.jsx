import "./Ingresar.css"
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom"

function Ingresar() {

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const [data, setData] = useState({})
    const navigate = useNavigate();


    const ingresar = async (evt) => {
        evt.preventDefault()

        const data = ({
            user: user,
            pass: pass
        })

        document.getElementById("formIngresar").reset()

        await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
          .then(res => res.json())
          .then(data => {
            setData(data)
            if(data.code === 301){
                return navigate("/user")
            }

            navigate("/ingresar")
          })
          .catch((e) => {
            console.log(e)
          })
    }


    return (
        <div className="main">
            <div className="contenedorFormularioIngresar">
                <div className="contenedorIngresar">
                    <h2>Iniciar sesión</h2>
                    <form id="formIngresar">
                        <label className="labelIngresar">
                            Usuario:
                            <input id="usuarioIngresar" onChange={(e) => {setUser(e.target.value)}} type="text" name="usuario" placeholder=" eje: mail@mail.com" required />
                        </label>
                        <label className="labelIngresar">
                            Contraseña:
                            <input id="usuarioContra" onChange={(e) => {setPass(e.target.value)}} type="password" name="password" placeholder=" Contraseña" required />
                        </label>
                
                        <Button onClick={ingresar} id="btnIngresar" variant="success" type="submit" className="btnIngresar">Ingresar</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Ingresar;