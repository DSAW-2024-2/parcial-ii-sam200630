const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'your_secret_key';

// Credenciales del usuario
const user = {
  email: 'admin@admin.com',
  password: bcrypt.hashSync('admin', 8) // Hasheamos la contraseña
};

// Endpoint de login
router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).send('Credenciales incorrectas.');
  }

  // Crear token de sesión
  const token = jwt.sign({ id: user.email }, SECRET_KEY, { expiresIn: 3600 });
  res.status(200).send({ auth: true, token });
});

module.exports = router;