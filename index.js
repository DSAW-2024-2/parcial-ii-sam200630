const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const loginRoutes = require('./routes/login');
const weatherRoutes = require('./routes/weather');

app.use(express.json());

app.use('/login', loginRoutes);
app.use('/weather', weatherRoutes);

// Mensaje para rutas sin especificar (/, /login, /weather)
app.get('/', (req, res) => {
  res.send('Bienvenido a la API clima. Usa /login para autenticación y obtener el token, luego usa /weather con el token para consultar el clima.');
});

// Manejo de rutas no definidas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada. Usa /login para autenticación y obtener el token, luego usa /weather con el token para consultar el clima.');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
  