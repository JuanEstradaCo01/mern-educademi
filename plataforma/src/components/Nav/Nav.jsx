import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Logo from "../../imgs/logo.png"
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import "./Nav.css"
import { Link } from "react-router-dom"

function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>
                    <Link to={"/"}>
                        <div className='contenedorLogo'>
                            <img className='imgLogo' src={Logo} alt="logo" />
                            <div className='contenedorNombreEslogan'>
                                <h2>Educademi</h2>
                                <p>¡Tú mejor elección!</p>
                            </div>
                        </div>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to={"/"}>
                                <FontAwesomeIcon className='homeSvg' icon={faHouse} />
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={"/nosotros"}>
                                Sobre nosotros
                            </Link>
                        </Nav.Link>

                        <NavDropdown title="Areas" id="collapsible-nav-dropdown">
                            <NavDropdown.Item>
                                <Link to={"/idiomas"}>
                                    Idiomas
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={"/programacion"}>
                                    Programación
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={"/gastronomia"}>
                                    Gastronomia
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <Link to={"/artes"}>
                                    Artes
                                </Link>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className='contendorSigns'>
                        <Nav.Link>
                            <Link to={"/ingresar"}>
                                <Button variant="outline-dark">Ingresar</Button>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to={"/registrar"}>
                                <Button variant="dark">Regístrate</Button>
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;