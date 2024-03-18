import "./Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer>
                <div className="contenedorFooter">
                    <div className="contenedorNosotrosRedesFooter">
                        <div className="contenedorNosotrosFooter">
                            <h4>Nosotros</h4>
                            <div>
                                <p><MdEmail /> educademi@mail.com</p>
                                <Link to={"/nosotros"}><p className="nosotrosFooter">Nosotros</p></Link>
                            </div>
                        </div>
                        <div className="contenedorRedesFooter">
                            <h4>Redes sociales</h4>
                            <div className="conetendorRedes">
                                <FaFacebook className="iconFacebook" />
                                <FaInstagram className="iconInstagram" />
                                <FaYoutube className="iconYoutube" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer