import "./Footer.css"
import logo from "../../imgs/logo.png"

function Footer() {
    return (
        <>
            <footer>
                <div className="contenedorFooter">
                    <img className='imgLogo' src={logo} alt="logo" />
                    <div className="contenedorNosotrosRedesFooter">
                        <div className="contenedorNosotrosFooter">
                            <h4>Nosotros</h4>
                          
                        </div>
                        <div className="contenedorRedesFooter">
                            <h4>Redes sociales</h4>
            
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer