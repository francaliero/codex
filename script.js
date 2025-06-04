
document.getElementById('reservaForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const adultos = parseInt(document.getElementById('adultos').value);
  const ninos = parseInt(document.getElementById('ninos').value);
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;

  let individuales = 0, dobles = 0, triples = 0;
  let adultosRestantes = adultos;
  let ninosRestantes = ninos;

  while (adultosRestantes >= 2) {
    dobles++;
    adultosRestantes -= 2;
  }
  while (adultosRestantes >= 1 && ninosRestantes >= 1) {
    dobles++;
    adultosRestantes--;
    ninosRestantes--;
  }
  while (adultosRestantes >= 1) {
    individuales++;
    adultosRestantes--;
  }
  while (ninosRestantes >= 2) {
    triples++;
    ninosRestantes -= 2;
  }

  let precio = individuales * 35 + dobles * 30 * 2 + triples * (30 + 20 * 2);

  const reserva = {
    fecha, hora, nombre, email, telefono,
    adultos, ninos, individuales, dobles, triples, precio
  };

  try {
    const response = await fetch('http://localhost:3000/reserva', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reserva)
    });

    const result = await response.json();

    let resumen = `
      <h3>Resumen de Reserva</h3>
      <p>${result.mensaje}</p>
      <p>Nombre: ${nombre}</p>
      <p>Email: ${email}</p>
      <p>Teléfono: ${telefono}</p>
      <p>Canoas individuales: ${individuales}</p>
      <p>Canoas dobles: ${dobles}</p>
      <p>Canoas triples: ${triples}</p>
      <p><strong>Precio total: ${precio} €</strong></p>
    `;
    document.getElementById('resumen').innerHTML = resumen;
  } catch (error) {
    console.error('Error al enviar la reserva:', error);
    document.getElementById('resumen').innerHTML = "<p>Error al enviar la reserva. Intenta más tarde.</p>";
  }
});
