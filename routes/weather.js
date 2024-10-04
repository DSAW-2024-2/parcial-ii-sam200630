const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SECRET_KEY = 'your_secret_key';

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token requerido.');

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send('Token inválido o expirado.');
    req.userId = decoded.id;
    next();
  });
};

// Endpoint de weather (protegido)
router.get('/', verifyToken, async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).send('Latitud y longitud son requeridos.');
  }

  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast`, {
      params: {
        latitude,
        longitude,
        current_weather: true
      }
    });

    const temperature = response.data.current_weather.temperature;
    res.status(200).send({ temperature });
  } catch (error) {
    res.status(500).send('Error al consultar la API de Open Meteo.');
  }
});

module.exports = router;