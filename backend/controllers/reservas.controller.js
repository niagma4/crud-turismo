

import db from '../config/db.config.js';

// Obtener todas las reservas
const getReservas = (req, res) => {
  db.query('SELECT * FROM reservas', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener reservas', details: err });
    res.json(results);
  });
};

// Crear una reserva
const createReserva = (req, res) => {
  const { nombre, tipo, fecha } = req.body;

  if (!nombre || !tipo || !fecha) {
    return res.status(400).json({ error: 'Se requieren los campos nombre, tipo y fecha' });
  }

  const query = 'INSERT INTO reservas (nombre, tipo, fecha) VALUES (?, ?, ?)';
  db.query(query, [nombre, tipo, fecha], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear la reserva', details: err });

    res.status(201).json({ id: result.insertId, nombre, tipo, fecha });
  });
};


const createReservaActividad = (req, res) => {
  const { usuario_id, actividad_id, fecha } = req.body;

  if (!usuario_id || !actividad_id || !fecha) {
    return res.status(400).json({ error: 'Se requieren usuario_id, actividad_id y fecha' });
  }

  const query = 'INSERT INTO reservas_actividades (usuario_id, actividad_id, fecha) VALUES (?, ?, ?)';
  db.query(query, [usuario_id, actividad_id, fecha], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear la reserva de actividad', details: err });

    res.status(201).json({ id: result.insertId, usuario_id, actividad_id, fecha });
  });
};


const updateReserva = (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, fecha } = req.body;

  const query = 'UPDATE reservas SET nombre = ?, tipo = ?, fecha = ? WHERE id = ?';
  db.query(query, [nombre, tipo, fecha, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la reserva', details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ message: 'Reserva actualizada con éxito' });
  });
};


const deleteReserva = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM reservas WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar la reserva', details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    res.json({ message: 'Reserva eliminada con éxito' });
  });
};

export default {
  getReservas,
  createReserva,
  updateReserva,
  deleteReserva,
  createReservaActividad, 
};