import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ListaActividades = () => {
  const tabla = 'actividades';
  const [actividades, setActividades] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha: ''
  });
  const [editandoActividad, setEditandoActividad] = useState(null);

  const API_URL = `http://localhost:5000/api/${tabla}`;

  useEffect(() => {
    axios.get(API_URL)
      .then((res) => setActividades(res.data))
      .catch((err) => console.error('Error al obtener actividades:', err));
  }, []);

  const crearActividad = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, formData);
      setActividades([...actividades, res.data]);
      setFormData({ nombre: '', descripcion: '', fecha: ''});
    } catch (err) {
      console.error('Error al crear actividad:', err);
    }
  };

  const editarActividad = (id) => {
    const actividad = actividades.find((e) => e.id === id);
    setEditandoActividad(actividad);
    setFormData(actividad);
  };

  const actualizarActividad = async (e) => {
    e.preventDefault();
    try {
      const id = editandoActividad.id;
      const res = await axios.put(`${API_URL}/${id}`, formData);
      setActividades(actividades.map((e) => (e.id === id ? res.data : e)));
      setEditandoActividad(null);
      setFormData({ nombre: '', descripcion: '', fecha: ''});
    } catch (err) {
      console.error('Error al actualizar actividad:', err);
    }
  };

  const eliminarActividad = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setActividades(actividades.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Error al eliminar actividad:', err);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Actividades</h1>
      
      <form
        className="border p-4 rounded shadow-sm mb-5 bg-light"
        onSubmit={editandoActividad ? actualizarActividad : crearActividad}
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
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            placeholder="Descripción"
            rows="3"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            required
          ></textarea>
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
          {editandoActividad ? 'Actualizar Actividad' : 'Crear Actividad'}
        </button>
      </form>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((actividad) => (
              <tr key={actividad.id}>
                <td>{actividad.nombre}</td>
                <td>{actividad.descripcion}</td>
                <td>{actividad.fecha}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => editarActividad(actividad.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => eliminarActividad(actividad.id)}
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

export default ListaActividades;