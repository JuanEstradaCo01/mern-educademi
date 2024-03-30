import React, { createContext, useState } from "react";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"

const userContext = createContext("");
const Proveedor = userContext.Provider;

function Userprovider(props) {
    const [userId, setUserId] = useState("")
    const [cursoId, setCursoId] = useState("")

    const MySwal = withReactComponent(Swal)

    function agregarId(id) {
        setUserId(id)
    }

    async function inscribirse(cursoId) {
        await fetch(`/idiomas/inscribirse/${cursoId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: userId
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log({ data })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    async function cerrarSesion() {
        await fetch("/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: userId }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.code === 200) {
                    return setUserId("")
                }
                MySwal.fire({
                    show: true,
                    title: `<strong>${data.message}</strong>`,
                    icon: "error",
                    showConfirmButton: true
                })
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <Proveedor value={{ userId, agregarId, inscribirse, cerrarSesion }}>
            {props.children}
        </Proveedor>
    )
}

export { userContext, Userprovider }