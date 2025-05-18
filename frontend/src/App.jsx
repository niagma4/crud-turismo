import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from './components/inicio';
import SobreParque from './components/SobreParque';
import Reservas from './components/reservas';
import Actividades from './components/actividades';
import Alojamientos from './components/alojamientos';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100"> {/* Añadimos w-100 para que la barra ocupe todo el ancho */}
          <div className="container d-flex justify-content-between"> {/* Usamos justify-content-between para espaciar el título y el menú */}
            <Link className="navbar-brand" to="/">
              Parque Tayrona
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/inicio">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sobre-el-parque">
                    Sobre el parque
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/reservas">
                    Reservas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/sobre-el-parque" element={<SobreParque />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/alojamientos" element={<Alojamientos />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3">
          <div className="container">
            <p className="m-0">Aplicacion web hecha por Nicolas Agudelo Martinez y Giovanny Sebastian Ruiz Vargas</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;