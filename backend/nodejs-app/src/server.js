// filepath: nodejs-app/nodejs-app/src/server.js
const app = require('./app');
const actividadesRoutes = require('./routes/actividadesRoutes');
const reservasRoutes = require('./routes/reservasRoutes');

const PORT = process.env.PORT || 5000;

// Middleware for routes
app.use('/api/actividades', actividadesRoutes);
app.use('/api/reservas', reservasRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});