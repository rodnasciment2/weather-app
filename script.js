const form = document.getElementById('form');
const search = document.getElementById('search');
const info = document.getElementById('weather-info');

const apiKey = '8dc525ef2863a2d8a8242ea4a1816b42';


const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=pt_br`;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = search.value.trim();
  if (!city) return;
  info.innerHTML = '<p>Carregando...</p>';
  try {
    const resp = await fetch(apiUrl(city));
    if (!resp.ok) throw new Error('Cidade não encontrada');
    const data = await resp.json();
    mostrarTempo(data);
  } catch (err) {
    info.innerHTML = `<p style="color:red">${err.message}</p>`;
  }
});

function mostrarTempo(data) {
  const { name, main, weather } = data;
  info.innerHTML = `
    <h2>${name}</h2>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
    <p><strong>${Math.round(main.temp)}°C</strong></p>
    <p>${weather[0].description}</p>
    <p>Umidade: ${main.humidity}%</p>
  `;
}
