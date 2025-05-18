// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// app.get('/', (req, res) => {
//   res.json({ message: '¡Hola desde el backend!' });
// });

// app.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

const express = require('express'); // Importar express
const cors = require('cors'); // Importar cors
const mysql = require('mysql'); // Importar mysql
const bodyParser = require('body-parser'); // Importar body-parser
const dotenv = require('dotenv'); // Importar dotenv

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta principal
app.get('/', (req, res) => {
  res.send('API RESTful del Parque Tayrona');
});

// Obtener todas las actividades
app.get('/api/actividades', (req, res) => {
  const query = 'SELECT * FROM actividades';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener actividades', details: err });
    res.json(results);
  });
});


app.get('/api/reservas', (req, res) => {
  const query = 'SELECT * FROM reservas';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener reservas:', err);
      return res.status(500).json({ error: 'Error al obtener reservas' });
    }
    res.json(results);
  });
});

app.post('/api/reservas', (req, res) => {
  const { nombre, tipo, fecha } = req.body;
  const query = 'INSERT INTO reservas (nombre, tipo, fecha) VALUES (?, ?, ?)';
  db.query(query, [nombre, tipo, fecha], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la reserva', details: err });
    }
    res.status(201).json({ id: result.insertId, nombre, tipo, fecha });
  });
});

app.put('/api/reservas/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, fecha } = req.body;
  const query = 'UPDATE reservas SET nombre = ?, tipo = ?, fecha = ? WHERE id = ?';
  db.query(query, [nombre, tipo, fecha, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar la reserva', details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva actualizada con éxito' });
  });
});

app.delete('/api/reservas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM reservas WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar la reserva', details: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada con éxito' });
  });
});

// Crear una nueva actividad
app.post('/api/actividades', (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Se requieren los campos nombre y descripcion' });
  }
  const query = 'INSERT INTO actividades (nombre, descripcion) VALUES (?, ?)';
  db.query(query, [nombre, descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear la actividad', details: err });
    res.status(201).json({ id: result.insertId, nombre, descripcion });
  });
});

// Actualizar una actividad por su ID
app.put('/api/actividades/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Se requieren los campos nombre y descripcion' });
  }

  const query = 'UPDATE actividades SET nombre = ?, descripcion = ? WHERE id = ?';

  db.query(query, [nombre, descripcion, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar la actividad:', err);
      return res.status(500).json({ error: 'Error al actualizar la actividad' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    res.json({ message: 'Actividad actualizada con éxito' });
  });
});

// Eliminar una actividad por su ID
app.delete('/api/actividades/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM actividades WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar la actividad:', err);
      return res.status(500).json({ error: 'Error al eliminar la actividad' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    res.json({ message: 'Actividad eliminada con éxito' });
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});