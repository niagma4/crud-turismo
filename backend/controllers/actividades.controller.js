
import db from '../config/db.config.js';

const getActividades = (req, res) => {
  db.query('SELECT * FROM actividades', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener actividades', details: err });
    res.json(results);
  });
};


const createActividad = (req, res) => {
  const { nombre, descripcion, fecha } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Se requieren los campos nombre y descripción' });
  }

  const query = 'INSERT INTO actividades (nombre, descripcion, fecha) VALUES (?, ?, ?)';
  db.query(query, [nombre, descripcion, fecha || null], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear la actividad', details: err });

    res.status(201).json({ id: result.insertId, nombre, descripcion, fecha });
  });
};


const updateActividad = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: 'Se requieren los campos nombre y descripción' });
  }

  const query = 'UPDATE actividades SET nombre = ?, descripcion = ?, fecha = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, fecha || null, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la actividad', details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    res.json({ message: 'Actividad actualizada con éxito' });
  });
};


const deleteActividad = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM actividades WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar la actividad', details: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    res.json({ message: 'Actividad eliminada con éxito' });
  });
};

export default {
  getActividades,
  createActividad,
  updateActividad,
  deleteActividad,
};