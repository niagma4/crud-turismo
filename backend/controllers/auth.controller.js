import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from '../config/db.config.js';

const prueba = (req, res) => {
  res.send('Funciona');
};


const register = (req, res) => {
  const { correo, password, telefono, direccion, nombre, apellido, edad, fecha_nacimiento } = req.body;
  if (!correo || !password || !telefono || !direccion || !nombre || !apellido || !edad || !fecha_nacimiento) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, usuarios) => {
    if (err) {
      console.error('Error en registro:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (usuarios.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      'INSERT INTO usuarios (correo, password, telefono, direccion, nombre, apellido, edad, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [correo, hashedPassword, telefono, direccion, nombre, apellido, edad, fecha_nacimiento],
      (err2) => {
        if (err2) {
          console.error('Error en registro:', err2);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      }
    );
  });
};

const login = (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Credenciales requeridas' });
  }

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, usuarios) => {
    if (err) {
      console.error('Error en login:', err);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    if (usuarios.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const usuario = usuarios[0];
    const isValidPassword = await bcrypt.compare(password, usuario.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, nombre: usuario.nombre, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      user: { 
        id: usuario.id, 
        correo: usuario.correo, 
        nombre: usuario.nombre,
        rol: usuario.rol 
      },
      token
    });
  });
};

export default {
  prueba,
  register,
  login,
};
