import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
// import './StyleCarnaval.css'; // Importa el nuevo archivo CSS

function SobreParque() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center mb-5">
                <div className="col-lg-8 text-center">
                    <h2 className="display-4 fw-bold mb-4">Descubre el Parque Tayrona</h2>
                    <p className="lead mb-0">Un paraíso natural entre la Sierra Nevada de Santa Marta y el Mar Caribe</p>
                </div>
            </div>
            
            <div className="row g-4">
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-tree-fill fs-2 text-success me-3"></i>
                                <h3 className="h4 mb-0">Flora y Fauna</h3>
                            </div>
                            <p>El parque alberga más de 300 especies de aves, 100 tipos de mamíferos y una gran variedad de flora tropical. Es hogar de monos aulladores, iguanas, caimanes y diversas especies en peligro de extinción.</p>
                            <img src="./src/assets/fauna-y-flora-del-parque-tayrona.jpg" className="card-img-top" alt="Fauna y flora en Parque Tayrona" />
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-water fs-2 text-primary me-3"></i>
                                <h3 className="h4 mb-0">Playas</h3>
                            </div>
                            <p>Disfruta de algunas de las playas más hermosas de Colombia, como Cabo San Juan, La Piscina, y Arrecifes. Cada playa ofrece diferentes experiencias, desde aguas tranquilas para nadar hasta olas perfectas para surfear.</p>
                            <img src="./src/assets/playas-del-parque-tayrona.jpg" className="card-img-top" alt="Playas en Parque Tayrona" />
                        </div>
                    </div>
                </div>
                
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                                <i className="bi bi-signpost-split-fill fs-2 text-warning me-3"></i>
                                <h3 className="h4 mb-0">Senderos</h3>
                            </div>
                            <p>Explora los diversos senderos ecológicos que atraviesan selvas, manglares y zonas arqueológicas. El parque cuenta con rutas señalizadas de diferentes niveles de dificultad y duración para todo tipo de publico.</p>
                            <img src="./src/assets/senderos-del-parque-tayrona.jpg" className="card-img-top" alt="Senderos en Parque Tayrona" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SobreParque;