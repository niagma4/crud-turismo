import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; 
import { useNavigate } from 'react-router-dom';

const rolesDisponibles = ['usuario', 'admin', 'guia'];

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Solo permite acceso a admin
  if (!user || user.rol !== 'admin') {
    navigate('/');
    return null;
  }

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:5000/usuarios'); 
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/usuarios/${id}`); 
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const cambiarRol = async (id, nuevoRol) => {
    try {
      await axios.put(`http://localhost:5000/usuarios/${id}/rol`, { rol: nuevoRol }); 
      fetchUsuarios();
    } catch (error) {
      console.error('Error al cambiar rol:', error);
    }
  };

  

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Gestión de Usuarios</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.correo}</td>
              <td>
                <select
                  value={usuario.rol}
                  onChange={e => cambiarRol(usuario.id, e.target.value)}
                  className="form-select form-select-sm"
                >
                  {rolesDisponibles.map(rol => (
                    <option key={rol} value={rol}>{rol}</option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => eliminarUsuario(usuario.id)}
                >
                  Eliminar
                </button>
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;