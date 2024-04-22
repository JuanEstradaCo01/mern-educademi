import "./RecoveryngPass.css"
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"
import { useNavigate, useParams } from "react-router-dom";

function RecoveryngPass() {

    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")

    const { uid } = useParams()

    const MySwal = withReactComponent(Swal)

    const navigate = useNavigate();

    const enviarContraseñaNueva = async (evt) => {
        evt.preventDefault()

        const data = {
            password1: input1,
            password2: input2
        }

        document.getElementById("formContraseñaNueva").reset()

        await fetch(`${process.env.REACT_APP_URL_BACK}/resetcontrasena/${uid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    navigate("/ingresar")
                    return MySwal.fire({
                        show: true,
                        title: `${data.message}`,
                        icon: "success",
                        showConfirmButton: true
                    })
                }

                MySwal.fire({
                    show: true,
                    title: `${data.message}`,
                    icon: "error",
                    showConfirmButton: true
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }


    return (
        <main id="bodyRecoveryngPass">
            <h1>Actualizar contraseña</h1>

            <div className="contenedorContraseñaNueva">
                <form id="formContraseñaNueva">
                    <label>Nueva contraseña</label>
                    <input onChange={(e) => { setInput1(e.target.value) }} type="password" placeholder="Nueva contraseña" required />
                    <label>Confirmar nueva contraseña</label>
                    <input onChange={(e) => { setInput2(e.target.value) }} type="password" placeholder="Confirmar nueva contraseña" required />
                    <Button onClick={enviarContraseñaNueva} type="submit" variant="success">Enviar</Button>{' '}
                </form>
            </div>
        </main>
    )
}

export default RecoveryngPass;