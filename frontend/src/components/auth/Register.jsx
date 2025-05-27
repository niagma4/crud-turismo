import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [formData, setFormData] = useState({
    password: '',
    correo: '',
    telefono: '',
    direccion: '',
    nombre: '',
    apellido: '',
    edad: '',
    fecha_nacimiento: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = 'http://localhost:5000/auth/register';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      setSuccess('Registro exitoso. Puedes iniciar sesión ahora.');
      setError('');
      setFormData({
        password: '',
        correo: '',
        telefono: '',
        direccion: '',
        nombre: '',
        apellido: '',
        edad: '',
        fecha_nacimiento: ''
      });
    } catch (err) {
      setError('Error al registrar el usuario. Asegúrate de que el correo no esté en uso y que todos los campos estén completos.');
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: 500, width: "100%", borderRadius: "1rem", background: "#fff" }}>
        <h2 className="text-center mb-4 text-dark">Registro</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input type="email" className="form-control mb-2" name="correo" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} required />
          <input type="password" className="form-control mb-2" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
          <input type="tel" className="form-control mb-2" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
          <input type="text" className="form-control mb-2" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} required />
          <input type="text" className="form-control mb-2" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
          <input type="text" className="form-control mb-2" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
          <input type="number" className="form-control mb-2" name="edad" placeholder="Edad" value={formData.edad} onChange={handleChange} required min="0" />
          <input type="date" className="form-control mb-3" name="fecha_nacimiento" placeholder="Fecha de nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;