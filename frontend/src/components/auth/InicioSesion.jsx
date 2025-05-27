import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from './UserContext';

const Login = () => {
  const [formData, setFormData] = useState({ correo: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      const userData = response.data;
      login(userData.user); 
      alert('Inicio de sesión exitoso');
      navigate('/');
    } catch {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div
        className="card shadow p-4"
        style={{
          maxWidth: 400,
          width: "100%",
          borderRadius: "1rem",
          background: "#fff" 
        }}
      >
        <h2 className="text-center mb-4 text-dark">Iniciar Sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            name="correo"
            type="email"
            className="form-control mb-3"
            placeholder="Correo"
            value={formData.correo}
            onChange={handleChange}
            required
            style={{ borderRadius: "0.5rem" }}
          />
          <input
            name="password"
            type="password"
            className="form-control mb-4"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ borderRadius: "0.5rem" }}
          />
          <button className="btn btn-primary w-100 mb-2" style={{ borderRadius: "0.5rem" }}>
            Iniciar Sesión
          </button>
          <button
            type="button"
            className="btn btn-dark w-100"
            style={{ borderRadius: "0.5rem" }}
            onClick={() => navigate('/register')}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;