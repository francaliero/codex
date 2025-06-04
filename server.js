
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta POST para recibir reservas
app.post('/reserva', (req, res) => {
  const reserva = req.body;

  // Simular procesamiento de reserva
  console.log('Reserva recibida:', reserva);

  // Aquí puedes integrar con Google Sheets en el futuro

  res.status(200).json({
    mensaje: 'Reserva recibida con éxito',
    datos: reserva
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor de reservas escuchando en http://localhost:${port}`);
});
