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

    pintaDatos(response)
}

function pintaDatos(response){
    /* let {temp, temp_max, temp_min } = response.main 
       console.log(temp);
    */  
    //Hora Unix a Hora UTC
    let unixTimestamp = response.dt
    let date = new Date(unixTimestamp*1000);
    fecha.textContent = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

    //Se obtiene nombre de ciudad
    city.textContent = `${response.name}`
    //Obtencion temperatura
    let tempRedondeada = Math.trunc(response.main.temp)
    temperatura.textContent = `${tempRedondeada}°C`

    let tempminima = Math.trunc(response.main.temp_min)
    tempmin.textContent = `${tempminima}°C`
    
    let tempmaxima = Math.trunc(response.main.temp_max)
    tempmax.textContent = `${tempmaxima}°C`

    estado.textContent = `${response.weather[0].description}`

    icon.src= `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`

    /* console.log(response.weather[0].description) */

}
 
boton.addEventListener('click', clima)