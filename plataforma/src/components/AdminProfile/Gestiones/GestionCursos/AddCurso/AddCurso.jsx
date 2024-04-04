import { useParams } from "react-router-dom";
import "./AddCurso.css"
import Button from 'react-bootstrap/Button';

function AddCurso(){

    const { area } = useParams()
    console.log({area})

    return(
        <main id="bodyAddCurso">
            <form id="formRegister">
                        <label>
                            Nombres:
                            <input id="names" type="text" placeholder="Ingresa tus nombres" required />
                        </label>
                        <label>
                            Apellidos:
                            <input id="lastNames" type="text" placeholder="Ingresa tus apellidos" required />
                        </label>
                        <label>
                            Edad:
                            <input id="age" type="number" placeholder="Ingresa tu edad" required />
                        </label>
                        <label>
                            Email:
                            <input id="email" type="email" placeholder="Ingresa tu correo" required />
                        </label>
                        <label>
                            Numero de telefono:
                            <input id="numberPhone" type="tel" placeholder="Ingresa tu numero celular" required />
                        </label>
                        <label>
                            Contraseña:
                            <input id="pass" type="password" placeholder="Ingresa tu contraseña" required />
                        </label>

                        <Button className="btnRegistrar" type="submit" variant="primary">Registrarme</Button>{' '}
                    </form>
        </main>
    )
}

export default AddCurso;