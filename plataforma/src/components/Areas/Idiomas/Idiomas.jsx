import "./Idiomas.css"
import Ingles from "../../../imgs/idiomas-ingles.png"
import Button from 'react-bootstrap/Button';
import Frances from "../../../imgs/idiomas-frances.png"
import Aleman from "../../../imgs/idioma-aleman.png"

function Idiomas() {
    return (
        <main id="bodyIdiomas">
            <h1>Idiomas</h1>

            <div className="contenedorIdiomasIngles">
                <img className="imgIdiomas" src={Ingles} alt="Ingles" />
                <div className="contenedorDescripcionIdioma">
                    <h4>Ingles</h4>
                    <p><strong>Titulación: </strong>B2 (Avanzado)</p>
                    <p><strong>Duración: </strong> 2 años</p>
                    <p><strong>Conocimientos previos: </strong>Sin conocimientos previos</p>
                    <p><strong>Descripción: </strong>Curso de ingles intensivo con duración de 2 años y certificación B2</p>
                    <Button className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                </div>
            </div>

            <div className="contenedorIdiomasFrances">
                <img className="imgIdiomas" src={Frances} alt="Frances" />
                <div className="contenedorDescripcionIdioma">
                    <h4>Frances</h4>
                    <p><strong>Nivel: </strong>Avanzado</p>
                    <p><strong>Duración: </strong> 2 años</p>
                    <p><strong>Conocimientos previos: </strong>Sin conocimientos previos</p>
                    <p><strong>Descripción: </strong>Curso de Frances intensivo con duración de 2 años y certificación con "Nivel avanzado"</p>
                    <Button className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                </div>
            </div>

            <div className="contenedorIdiomasAleman">
                <img className="imgIdiomas" src={Aleman} alt="Aleman" />
                <div className="contenedorDescripcionIdioma">
                    <h4>Aleman</h4>
                    <p><strong>Nivel: </strong>Avanzado</p>
                    <p><strong>Duración: </strong> 2 años</p>
                    <p><strong>Conocimientos previos: </strong>Sin conocimientos previos</p>
                    <p><strong>Descripción: </strong>Curso de Aleman intensivo con duración de 2 años y certificación con "Nivel avanzado"</p>
                    <Button className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                </div>
            </div>
        </main>
    )
}

export default Idiomas;