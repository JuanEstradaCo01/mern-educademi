import { useParams, useNavigate } from "react-router-dom"
import "./Profile.css"
import React, { useEffect, useState } from "react"
import Loader from "../Loader/Loader"

function Profile() {

    const { token } = useParams()
    const { uid } = useParams()

    const [user, setUser] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/user/${uid}/${token}`)
          .then(res => res.json())
          .then(data => {
            if(data.code !== 200){
                navigate("*")
            }
            setUser(data)
          })
          .catch((e) => {
            console.log(e)})
    },[])

    if(user === ""){
        return <Loader />
    }

    return (
        <>
            <h1>User Profile</h1>
            <h3>¡Hola, {user.names}!</h3>
            <p><strong>Nombre:</strong> {user.names}</p>
            <p><strong>Apellidos:</strong> {user.lastNames} </p>
            <p><strong>Edad: </strong> {user.age}</p>
            <p><strong>Email: </strong> {user.email}</p>
        </>
    )
}

export default Profile