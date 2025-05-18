import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Reservas() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center g-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-lg h-100 reservation-card">
                        <img src="./src/assets/actividades-del-parque-tayrona.jpg" className="card-img-top reservation-img" alt="Actividades en Parque Tayrona" style={{ height: "300px", objectFit: "cover" }} />
                        <div className="card-body p-4">
                            <h2 className="card-title fw-bold mb-3">Actividades</h2>
                            <p className="card-text">Explore la belleza natural del Parque Tayrona a través de nuestras diversas actividades guiadas: senderismo por rutas ecológicas, avistamiento de aves, buceo en arrecifes de coral, tours culturales a zonas arqueológicas y mucho más.</p>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item bg-transparent px-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Tours guiados por guías locales certificados
                                </li>
                                <li className="list-group-item bg-transparent px-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Diversas dificultades según su condición física
                                </li>
                                <li className="list-group-item bg-transparent px-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Equipo especializado incluido para actividades acuáticas
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer bg-transparent border-0 p-4">
                            <a href="/actividades" className="btn btn-primary btn-lg w-100">Reservar Actividades</a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-lg h-100 reservation-card">
                        <img src="./src/assets/alojamiento-del-parque-tayrona.jpg" className="card-img-top reservation-img" alt="Alojamientos en Parque Tayrona" style={{ height: "300px", objectFit: "cover" }} />
                        <div className="card-body p-4">
                            <h2 className="card-title fw-bold mb-3">Alojamientos</h2>
                            <p className="card-text">Disfrute de una experiencia única durmiendo en el corazón del parque. Ofrecemos diversas opciones de hospedaje que se adaptan a todos los presupuestos y necesidades, desde camping hasta lujosos ecohabs con vista al mar.</p>
                            <ul className="list-group list-group-flush mb-4">
                                <li className="list-group-item bg-transparent px-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Ecohabs: Cabañas ecológicas con todas las comodidades
                                </li>
                                <li className="list-group-item bg-transparent px-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Zonas de camping con servicios sanitarios y duchas
                                </li>
                                <li className="list-group-item bg-transparent px-0">
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    Hamacas y chinchorros bajo techo para una experiencia auténtica
                                </li>
                            </ul>
                        </div>
                        <div className="card-footer bg-transparent border-0 p-4">
                            <a href="/alojamientos" className="btn btn-success btn-lg w-100">Reservar Alojamiento</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reservas;