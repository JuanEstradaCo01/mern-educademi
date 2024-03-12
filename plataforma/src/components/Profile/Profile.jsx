import { useParams, useNavigate, Link } from "react-router-dom"
import { userContext } from "../context/context"
import "./Profile.css"
import React, { useEffect, useState, useContext } from "react"
import Loader from "../Loader/Loader"

function Profile() {

    const { agregarToken, agregarId, borrarTokenID } = useContext(userContext)

    const { token } = useParams()
    const { uid } = useParams()

    agregarToken(token)
    agregarId(uid)

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
            <Link to={"/ingresar"}><button onClick={borrarTokenID}>Cerrar sesión</button></Link>
        </>
    )
}

export default Profile