import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/estilos.css';

const ListaReservas = ({ rolUsuario }) => {
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    fecha: ''
  });
  const [editandoReserva, setEditandoReserva] = useState(null);

  const API_URL = `http://localhost:5000/api/reservas`;

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
      setFormData({ nombre: '', tipo: '', fecha: '' });
    } catch (err) {
      console.error('Error al crear alojamiento:', err);
    }
  };

  const editarReserva = (id) => {
    const reserva = reservas.find((e) => e.id === id);
    if (reserva) {
      setEditandoReserva(reserva);
      setFormData({
        nombre: reserva.nombre,
        tipo: reserva.tipo,
        fecha: reserva.fecha
      });
    }
  };

  const actualizarReserva = async (e) => {
    e.preventDefault();
    try {
      const id = editandoReserva.id;
      const res = await axios.put(`${API_URL}/${id}`, formData);
      setReservas(reservas.map((e) => (e.id === id ? res.data : e)));
      setEditandoReserva(null);
      setFormData({ nombre: '', tipo: '', fecha: '' });
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

  // Simulación de roles de usuario
  // Cambia estos valores según el usuario autenticado
  // const rolUsuario = "usuario"; // Simula un usuario normal

  // Solo admin y guia pueden ver el CRUD
  const puedeEditar = rolUsuario === "admin" || rolUsuario === "guia";

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Alojamientos</h1>

      {puedeEditar && (
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
            <select
              className="form-control"
              value={formData.tipo}
              onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="Campamento">Campamento</option>
              <option value="Cabañas">Cabañas</option>
              <option value="Hoteles Cercanos">Hoteles Cercanos</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control"
              value={formData.fecha ? formData.fecha.slice(0, 10) : ''}
              onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editandoReserva ? 'Actualizar Reserva' : 'Crear Reserva'}
          </button>
        </form>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Fecha</th>
              {puedeEditar && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, idx) => (
              <tr key={reserva.id || idx}>
                <td>{reserva.nombre}</td>
                <td>{reserva.tipo}</td>
                <td>
                  {reserva.fecha ? new Date(reserva.fecha).toLocaleDateString('es-ES') : ''}
                </td>
                {puedeEditar && (
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaReservas;