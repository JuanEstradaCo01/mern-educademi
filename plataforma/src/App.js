import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Nosotros from "./components/Nosotros/Nosotros";
import Artes from "./components/Areas/Artes/Artes";
import Gastronomia from "./components/Areas/Gastronomia/Gastronomia"
import Idiomas from './components/Areas/Idiomas/Idiomas';
import Ingles from './components/Areas/Idiomas/Ingles/Ingles';
import Frances from './components/Areas/Idiomas/Frances/Frances';
import Aleman from './components/Areas/Idiomas/Aleman/Aleman';
import Programacion from './components/Areas/Programacion/Programacion';
import Registrar from './components/Registrar/Registrar';
import Ingresar from './components/Ingresar/Ingresar';
import Profile from './components/Profile/Profile';
import NotFound from './components/Notfound/NotFound';
import { Userprovider } from './components/context/context';
import GestionCursos from './components/AdminProfile/Gestiones/GestionCursos/GestionCursos';
import GestionUsuarios from './components/AdminProfile/Gestiones/GestionUsuarios/GestionUsuarios';
import AddCurso from './components/AdminProfile/Gestiones/GestionCursos/AddCurso/AddCurso';
import EditUsuarios from './components/AdminProfile/Gestiones/GestionUsuarios/EditUsuarios/EditUsuarios';
import VerCursosEdit from './components/AdminProfile/Gestiones/GestionCursos/VerCursosEdit/VerCursosEdit';
import EditarCurso from './components/AdminProfile/Gestiones/GestionCursos/VerCursosEdit/EditarCurso/EditarCurso';
import RecoveryPass from './components/RecoveryPass/RecoveryPass';
import RecoveryngPass from './components/RecoveryPass/RecoveryngPass/RecoveryngPass';
import Frontend from './components/Areas/Programacion/Front/Frontend';
import Backend from './components/Areas/Programacion/Back/Backend';
import FullStack from './components/Areas/Programacion/FullStack/FullStack';
import Fotografia from './components/Areas/Artes/Fotografia/Fotografia';
import Musica from './components/Areas/Artes/Musica/Musica';
import Dibujo from './components/Areas/Artes/Dibujo/Dibujo';
import GastronomiaCurso from './components/Areas/Gastronomia/GastronomiaCurso/GastronomiaCurso';

function App() {
  return (
    <div className="App">
      <Userprovider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/nosotros' element={<Nosotros />} />
            {/*Seccion de Idiomas*/ }
            <Route exact path='/idiomas' element={<Idiomas />} />
            <Route exact path='/ingles' element={<Ingles />} />
            <Route exact path='/frances' element={<Frances />} />
            <Route exact path='/aleman' element={<Aleman />} />
            {/*Seccion de Programacion*/ }
            <Route exact path='/programacion' element={<Programacion />} />
            <Route exact path='/frontend' element={<Frontend />} />
            <Route exact path='/backend' element={<Backend />} />
            <Route exact path='/full-stack' element={<FullStack />} />
            {/*Seccion de Gastronomia*/ }
            <Route exact path='/gastronomia' element={<Gastronomia />} />
            <Route exact path='/Gastronomía' element={<GastronomiaCurso />} />
            {/*Seccion de Artes*/ }
            <Route exact path='/artes' element={<Artes />} />
            <Route exact path='/Fotografía' element={<Fotografia />} />
            <Route exact path='/Música' element={<Musica />} />
            <Route exact path='/dibujo' element={<Dibujo />} />
            <Route exact path='/ingresar' element={<Ingresar />} />
            <Route exact path='/registrar' element={<Registrar />} />
            <Route exact path="/user/:uid" element={<Profile />} />
            <Route exact path='/gestioncursos' element={<GestionCursos />} />
            <Route exact path="/:area/addcurso" element={<AddCurso />} />
            <Route exact path='/gestionusuarios' element={<GestionUsuarios />} />
            <Route exact path='/edituser/:uid/:adminId' element={<EditUsuarios />} />
            <Route exact path='/editcursos/:areaCurso' element={<VerCursosEdit />} />
            <Route exact path='/editarcurso/:areaCurso/:cid' element={<EditarCurso />} />
            <Route exact path='/recuperarcontraseña' element={<RecoveryPass />} />
            <Route exact path='/recuperandocontrasena/:uid' element={<RecoveryngPass />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Userprovider>
    </div>
  );
}

export default App;