import db from '../config/db.config.js';


export const getAllUsers = (req, res) => {
  db.query('SELECT * FROM usuarios', (err, usuarios) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener usuarios' });
    }
    res.json(usuarios);
  });
};


export const deleteUser = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar usuario' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
};


export const changeUserRole = (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;
  db.query('UPDATE usuarios SET rol = ? WHERE id = ?', [rol, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el rol' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Rol actualizado correctamente' });
  });
};


export const getRoles = (req, res) => {
  db.query(
    "SHOW COLUMNS FROM usuarios LIKE 'rol'",
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener roles' });
      }
    
      const enumStr = result[0].Type; 
      const roles = enumStr
        .replace(/enum\(|\)|'/g, '')
        .split(',');
      res.json(roles);
    }
  );
};