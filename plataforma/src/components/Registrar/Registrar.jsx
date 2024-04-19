import "./Registrar.css"
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"
import { useNavigate } from "react-router-dom"

function Registrar() {

    const [nombres, setNombres] = useState("")
    const [apellidos, setApellidos] = useState("")
    const [edad, setEdad] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [pass, setPass] = useState("")

    const navigate = useNavigate();

    const MySwal = withReactComponent(Swal)

    const notifySuccess = () => {
        MySwal.fire({
            show: true,
            title: "¡Registro exitoso!",
            icon: "success",
            showConfirmButton: true
        })
    }

    const registrarme = async (evt) => {
        evt.preventDefault()

        document.getElementById("formRegister").reset()

        const user = ({
            names: nombres,
            lastNames: apellidos,
            age: edad,
            email: email,
            phone: phoneNumber,
            password: pass
        })

        await fetch(`${process.env.REACT_APP_URL_BACK}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 201) {
                    notifySuccess()
                    navigate("/ingresar")
                } else if (data.code === 401 || 500) {
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
        <>
            <div className="contenedorFormRegistrar">
                <div className="subContenedorRegistrar">
                    <h2>Registro</h2>
                    <form id="formRegister">
                        <label>
                            Nombres:
                            <input onChange={(e) => { setNombres(e.target.value) }} id="names" type="text" placeholder="Ingresa tus nombres" required />
                        </label>
                        <label>
                            Apellidos:
                            <input onChange={(e) => { setApellidos(e.target.value) }} id="lastNames" type="text" placeholder="Ingresa tus apellidos" required />
                        </label>
                        <label>
                            Edad:
                            <input onChange={(e) => { setEdad(e.target.value) }} id="age" type="number" placeholder="Ingresa tu edad" required />
                        </label>
                        <label>
                            Email:
                            <input onChange={(e) => { setEmail(e.target.value) }} id="email" type="email" placeholder="Ingresa tu correo" required />
                        </label>
                        <label>
                            Numero de telefono:
                            <input onChange={(e) => { setPhoneNumber(e.target.value) }} id="numberPhone" type="tel" placeholder="Ingresa tu numero celular" required />
                        </label>
                        <label>
                            Contraseña:
                            <input onChange={(e) => { setPass(e.target.value) }} id="pass" type="password" placeholder="Ingresa tu contraseña" required />
                        </label>

                        <Button onClick={registrarme} className="btnRegistrar" type="submit" variant="primary">Registrarme</Button>{' '}
                    </form>
                </div>
            </div>
        </>
    )
}

export default Registrar;