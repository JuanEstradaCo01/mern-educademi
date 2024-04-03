import React, { createContext, useState } from "react";
import Swal from "sweetalert2"
import withReactComponent from "sweetalert2-react-content"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const userContext = createContext("");
const Proveedor = userContext.Provider;

function Userprovider(props) {
    const [userId, setUserId] = useState("")

    const MySwal = withReactComponent(Swal)

    const notify = () =>
        toast.success('¡Curso agregado!', {
            position: "bottom-right",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
    });

    function agregarId(id) {
        setUserId(id)
    }

    async function inscribirse(courseArea, courseId) {
        await fetch(`/${courseArea}/inscribirse/${courseId}`, {
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
                if (data.code === 200) {
                    notify()
                } else if (data.code === 404) {
                    MySwal.fire({
                        show: true,
                        title: `<strong>${data.message}</strong>`,
                        icon: "info",
                        showConfirmButton: false,
                        footer: '<a href="/ingresar"><button id="btnRedirectIngresarSinAuth">Ir</button></a>'
                    })
                } else if (data.code === 401) {
                    MySwal.fire({
                        show: true,
                        title: `<strong>${data.message}</strong>`,
                        icon: "warning",
                        showConfirmButton: false,
                        footer: '<a href="/ingresar"><button id="btnRedirectIngresarSinAuth">Ir</button></a>'
                    })
                } else if (data.code === 500) {
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

    async function cerrarSesion() {
        await fetch("/logout", {
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