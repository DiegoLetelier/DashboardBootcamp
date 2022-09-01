import {lat, lon, response} from './main.js'


export default function pintaMapa(){
let map = L.map('map').setView([`${lat}`, `${lon}`], 13); //Crea una instancia de un objeto de mapa dado el ID DOM de un elemento <div>
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Se utiliza para cargar y mostrar capas de mosaicos en el mapa.
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); //Añade la informacion recibida al mapa

L.marker([`${lat}`, `${lon}`]).addTo(map) //Se utiliza para mostrar iconos en los que se puede hacer clic o arrastrar en el mapa.
    .bindPopup(`Temperatura actual: ${Math.trunc(response.main.temp)}°C </br> 
    Condicion actual: ${response.weather[0].description}`) //popup que muestra la temperatura actual y el estado
    .openPopup(); //Despliega el popup

}