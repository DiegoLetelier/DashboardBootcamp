const boton = document.getElementById('boton');
const fecha = document.getElementById('fecha');
const temperatura = document.getElementById('temperatura');
const city = document.getElementById('ciudad');
const tempmin = document.getElementById('tempmin');
const tempmax = document.getElementById('tempmax');
const estado = document.getElementById('estado');
const icon = document.getElementById('icon');

let grados = [];
let horas = [];

async function clima(){
    
    let buscar = document.getElementById('buscar').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${buscar}&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    let response = await axios.get(url)
    response = response.data; 
    console.log(response);
    let lat = response.coord.lat 
    let lon = response.coord.lon

}