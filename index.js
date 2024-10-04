const express = require('express');
const app = express();
const PORT = 3000;

const loginRoutes = require('./routes/login');
const weatherRoutes = require('./routes/weather');

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/weather', weatherRoutes);

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada.');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto 3000`);
});
