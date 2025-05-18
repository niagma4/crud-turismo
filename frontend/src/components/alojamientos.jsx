import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './estilos.css';

const ListaReservas = () => {
  const tabla = 'reservas';
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    fecha: ''
  });
  const [editandoReserva, setEditandoReserva] = useState(null);

  const API_URL = `http://localhost:5000/api/${tabla}`;

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setReservas(res.data))
      .catch((err) => console.error('Error al obtener alojamientos:', err));
  }, []);

  const crearReserva = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, formData);
      setReservas([...reservas, res.data]);
      setFormData({ nombre: '', tipo: '', fecha: ''});
    } catch (err) {
      console.error('Error al crear alojamiento:', err);
    }
  };

  const editarReserva = (id) => {
    const reserva = reservas.find((e) => e.id === id);
    setEditandoReserva(reserva);
    setFormData(reserva);
  };

  const actualizarReserva = async (e) => {
    e.preventDefault();
    try {
      const id = editandoReserva.id;
      const res = await axios.put(`${API_URL}/${id}`, formData);
      setReservas(reservas.map((e) => (e.id === id ? res.data : e)));
      setEditandoReserva(null);
      setFormData({ nombre: '', tipo: '', fecha: ''});
    } catch (err) {
      console.error('Error al actualizar alojamiento:', err);
    }
  };

  const eliminarReserva = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setReservas(reservas.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Error al eliminar alojamiento:', err);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Alojamientos</h1>

      <form
        className="border p-4 rounded shadow-sm mb-5 bg-light"
        onSubmit={editandoReserva ? actualizarReserva : crearReserva}
      >
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tipo"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editandoReserva ? 'Actualizar Reserva' : 'Crear Reserva'}
        </button>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td>{reserva.nombre}</td>
                <td>{reserva.tipo}</td>
                <td>{reserva.fecha}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editarReserva(reserva.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarReserva(reserva.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaReservas;