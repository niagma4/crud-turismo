import express from 'express';
import actividadesRoutes from './routes/actividades.routes.js';
import reservasRoutes from './routes/reservas.routes.js';
import authRoutes from './routes/auth.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());


app.use(express.json());

// Rutas
app.use('/api/actividades', actividadesRoutes);
app.use('/api/reservas', reservasRoutes); 
app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.send('¡Hola mundo!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});