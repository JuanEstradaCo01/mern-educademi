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
import Programacion from './components/Areas/Programacion/Programacion';
import Registrar from './components/Registrar/Registrar';
import Ingresar from './components/Ingresar/Ingresar';
import Profile from './components/Profile/Profile';
import NotFound from './components/Notfound/NotFound';
import { Userprovider } from './components/context/context';

function App() {
  return (
    <div className="App">
      <Userprovider>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/nosotros' element={<Nosotros />} />
            <Route exact path='/idiomas' element={<Idiomas />} />
            <Route exact path='/programacion' element={<Programacion />} />
            <Route exact path='/gastronomia' element={<Gastronomia />} />
            <Route exact path='/artes' element={<Artes />} />
            <Route exact path='/ingresar' element={<Ingresar />} />
            <Route exact path='/registrar' element={<Registrar />} />
            <Route exact path="/user/:uid/:token" element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Userprovider>
    </div>
  );
}

export default App;