import "./Ingresar.css"
import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"

function Ingresar() {

    const [user, setUser] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate();

    const MySwal = withReactComponent(Swal)

    const ingresar = async (evt) => {
        evt.preventDefault()

        const data = ({
            user: user,
            pass: pass
        })

        document.getElementById("formIngresar").reset()

        await fetch(`${process.env.REACT_APP_URL_BACK}/login`, {
            method: "POST",
            credentials: 'include', 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 301) {
                    navigate(`/user/${data.uid}/${data.token}`)
                }else if (data.code === 404 || 401) {
                    MySwal.fire({
                        show: true,
                        title: `<strong>${data.message}</strong>`,
                        icon: "error",
                        showConfirmButton: true
                    })
                }             
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
                            <input id="usuarioIngresar" onChange={(e) => { setUser(e.target.value) }} type="text" name="usuario" placeholder=" eje: mail@mail.com" required />
                        </label>
                        <label className="labelIngresar">
                            Contraseña:
                            <input id="usuarioContra" onChange={(e) => { setPass(e.target.value) }} type="password" name="password" placeholder=" Contraseña" required />
                        </label>

                        <Button onClick={ingresar} id="btnIngresar" variant="success" type="submit" className="btnIngresar">Ingresar</Button>
                    </form>

                    <Link to={"/recuperarcontraseña"}><p>¿Olvidaste tu contraseña?</p></Link>
                    <Link to={"/registrar"}><p>¿No tienes una cuenta?</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Ingresar;