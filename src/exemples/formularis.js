// Validació del formulari de registre
const registreForm = document.getElementById('registreForm');
registreForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita l'enviament del formulari per validar primer

  const nif = document.getElementById('nif').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const birthdate = document.getElementById('birthdate').value;
  const terms = document.getElementById('terms').checked;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idNumberRegex = /^[0-9A-Za-z]{1,10}$/;

  let valid = true;

  // Validació NIF
  if (!idNumberRegex.test(nif)) {
    alert('El NIF no és vàlid!');
    valid = false;
  }

  // Validació Email
  if (!emailRegex.test(email)) {
    alert('El correu electrònic no és vàlid!');
    valid = false;
  }

  // Validació Contrasenya
  if (password.length < 6) {
    alert('La contrasenya ha de tenir com a mínim 6 caràcters!');
    valid = false;
  }

  // Validació Data de Naixement (major de 18 anys)
  const birthDateObj = new Date(birthdate);
  const age = new Date().getFullYear() - birthDateObj.getFullYear();
  if (age < 18 || isNaN(age)) {
    alert('Has de ser major d’edat per registrar-te!');
    valid = false;
  }

  // Validació Termes i Condicions
  if (!terms) {
    alert('Has d’acceptar els Termes i Condicions!');
    valid = false;
  }

  if (valid) {
    alert('Registre completat correctament!');
    registreForm.submit();
  }
});

// Consulta meteorològica
const meteoForm = document.getElementById('meteoForm');
const weatherResults = document.getElementById('weatherResults');
meteoForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const city = document.getElementById('city').value;
  const country = document.getElementById('country').value;

  if (!city || !country) {
    alert('Els camps Ciutat i País són obligatoris!');
    return;
  }

  const apiKey = 'YOUR_API_KEY'; // Substitueix amb la teva clau de l'API
  const weatherApiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city},${country}&days=2`;

  try {
    const response = await fetch(weatherApiUrl);
    if (!response.ok) throw new Error('Error en obtenir les dades de l’API');

    const data = await response.json();

    // Informació actual
    const current = data.current;
    const forecast = data.forecast.forecastday[1];

    document.getElementById('currentWeather').innerHTML = `
      Temperatura actual: ${current.temp_c}°C<br>
      Condicions: ${current.condition.text}<br>
      <img src="${current.condition.icon}" alt="Icona temps actual" />
    `;

    // Informació de la previsió
    document.getElementById('forecastWeather').innerHTML = `
      Temperatura prevista: ${forecast.day.avgtemp_c}°C<br>
      Condicions: ${forecast.day.condition.text}<br>
      <img src="${forecast.day.condition.icon}" alt="Icona temps previst" />
    `;

    weatherResults.style.display = 'block';
  } catch (error) {
    alert('No s’ha pogut obtenir la informació meteorològica.');
    console.error(error);
  }
});
