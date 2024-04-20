import "./RecoveryPass.css"
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"

function RecoveryPass() {

    const [email, setEmail] = useState("")

    const MySwal = withReactComponent(Swal)

    const enviarEmail = async (evt) => {
        evt.preventDefault()

        const data = {
            email: email
        }

        document.getElementById("formRecuperar").reset()

        await fetch(`/recuperarcontrasena`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                if(data.code === 200){
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
        <main id="bodyRecuperarContraseña">
            <h1>Recuperar contraseña</h1>

            <div className="contenedroFormRecuperar">
                <h3>Correo electronico</h3>
                <form id="formRecuperar">
                        <input onChange={(e) => { setEmail(e.target.value) }}  type="email" placeholder="Ingresa tu correo" required />
                        <Button onClick={enviarEmail} type="submit" variant="outline-success">Enviar</Button>{' '}
                </form>
            </div>
        </main>
    )
}

export default RecoveryPass;