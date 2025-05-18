// Script do Leaflet
// Coordenadas da Márcia Imobiliária (obtidas via geocodificação)
const coordenadas = [-25.535764, -54.586797];

// Inicializa o mapa centralizado na coordenada e com zoom 17
const mapa = L.map('map').setView(coordenadas, 17);

// Adiciona o mapa base do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap',
}).addTo(mapa);

// Adiciona um marcador no endereço com popup
L.marker(coordenadas).addTo(mapa)
  .bindPopup('<strong>Márcia Imobiliária</strong><br>Rua Bartolomeu de Gusmão, 1148<br>Centro, Foz do Iguaçu - PR')
  .openPopup();