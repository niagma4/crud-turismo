import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { UserProvider, useUser } from './components/auth/UserContext'; // <-- Importa el provider y hook
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from './components/inicio';
import SobreParque from './components/SobreParque';
import Reservas from './components/reservas';
import Actividades from './components/actividades';
import ListaReservas from './components/ListaReservas.jsx';
import InicioSeccion from './components/auth/InicioSesion.jsx';
import Register from './components/auth/Register.jsx';
import Dashboard from './components/auth/Dashboard.jsx';
import RutaProtegida from './components/auth/RutaProtegida.jsx';

function AppContent() {
  const { user, logout } = useUser();

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
          <div className="container d-flex justify-content-between">
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
                  <Link className="nav-link" to="/">
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
                {!user && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/inicio-sesion">
                        Iniciar Sesión
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Registrar
                      </Link>
                    </li>
                  </>
                )}
                {user && (
                  <>
                    <li className="nav-item d-flex align-items-center">
                      <span className="nav-link text-info" style={{ fontWeight: 'bold' }}>
                        Rol: {user.rol}
                      </span>
                      <button
                        className="nav-link btn btn-link"
                        onClick={logout}
                        style={{ color: 'white', textDecoration: 'none' }}
                      >
                        Cerrar Sesión
                      </button>
                    </li>
                    {user.rol === 'admin' && (
                      <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/sobre-el-parque" element={<SobreParque />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/listaReservas" element={<ListaReservas rolUsuario={user?.rol} />} />
            <Route path="/inicio-sesion" element={<InicioSeccion />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <RutaProtegida>
                  <Dashboard />
                </RutaProtegida>
              }
            />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3">
          <div className="container">
            <p className="m-0">
              Aplicacion web hecha por Nicolas Agudelo Martinez y Giovanny Sebastian
              Ruiz Vargas
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}