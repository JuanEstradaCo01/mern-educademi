import React, { createContext, useState } from "react";

const userContext = createContext("");
const Proveedor = userContext.Provider;

function Userprovider(props) {
    const [ userToken, setUserToken ] = useState("")
    const [ userId, setUserId ] = useState("")

    function agregarToken(token) {
        setUserToken(token)
    }

    function agregarId(id){
        setUserId(id)
    }

    function borrarTokenID() {
        setUserToken("")
        setUserId("")
    }

    return (
        <Proveedor value={ { userToken, userId, agregarToken, agregarId, borrarTokenID} }>
            {props.children}
        </Proveedor>
    )
}

export { userContext, Userprovider }