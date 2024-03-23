import "./Programacion.css"
import Front from "../../../imgs/programacion-front.jpg"
import Back from "../../../imgs/programacion-back.jpg"
import FS from "../../../imgs/programacion-FS.jpg"
import Button from 'react-bootstrap/Button';

function Programacion() {
    return (
        <main id="bodyProgramacion">
            <h1>Programación</h1>

            <div className="contenedorProgramacionFront">
                <img className="imgProgramacion" src={Front} alt="front" />
                <div className="contenedorDescripcionProgramacion">
                    <h4>Frontend</h4>
                    <p><strong>Titulación: </strong>Frontend developer</p>
                    <p><strong>Duración: </strong> 2 años</p>
                    <p><strong>Conocimientos previos: </strong>Sin conocimientos previos</p>
                    <p><strong>Descripción: </strong>Curso de programacion Frontend en el cual aprenderas todas las tecnologias más demandadas por el mercado en el Frontend.</p>
                    <Button className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                </div>
            </div>        

            <div className="contenedorProgramacionBack">
                <img className="imgProgramacion" src={Back} alt="front" />
                <div className="contenedorDescripcionProgramacion">
                    <h4>Backend</h4>
                    <p><strong>Titulación: </strong>Backend developer</p>
                    <p><strong>Duración: </strong> 3 años</p>
                    <p><strong>Conocimientos previos: </strong>Sin conocimientos previos</p>
                    <p><strong>Descripción: </strong>Curso de programacion Backend en el cual aprenderas todas las tecnologias más demandadas por el mercado en el Backend.</p>
                    <Button className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                </div>
            </div>

            <div className="contenedorProgramacionFullStack">
                <img className="imgProgramacion" src={FS} alt="front" />
                <div className="contenedorDescripcionProgramacion">
                    <h4>Full Stack</h4>
                    <p><strong>Titulación: </strong>Full Stack developer</p>
                    <p><strong>Duración: </strong> 5 años</p>
                    <p><strong>Conocimientos previos: </strong>Sin conocimientos previos</p>
                    <p><strong>Descripción: </strong>Curso de programacion Full Stack donde aprenderas a combinar todas las tecnologias del Frontend y Backend para crear aplicaciones completas (Full Stack).</p>
                    <Button className="btnInscribirse" variant="outline-light">Inscribirse</Button>{' '}
                </div>
            </div>
        </main>
    )
}

export default Programacion;