import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/inicio.css';

function Inicio() {
    return (
        <div className="hero position-relative d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <div className="hero-texto text-center col-10 col-md-8 mx-auto">
                <h1 className="display-2 fw-bolder mb-3 text-white text-shadow">Bienvenido! Aquí puede hacer sus reservas para participar en el parque Tayrona.</h1>
                <p className="lead mb-4 text-white text-shadow">El Parque Tayrona es un parque nacional natural ubicado en la costa caribeña de Colombia, cerca de la ciudad de Santa Marta. Es conocido por su biodiversidad, hermosas playas y paisajes montañosos.</p>
            </div>
        </div>
    );
}

export default Inicio;