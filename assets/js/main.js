<<<<<<< HEAD

import pintaDatos from './pintaDatos.js'
import pintaMapa from './mapa.js';
import pintaGrafico from './grafico.js'
import getWeather from './wcards.js';
const boton = document.getElementById('boton');

/* const fecha = document.getElementById('fecha');
const temperatura = document.getElementById('temperatura');
const city = document.getElementById('ciudad');
const tempmin = document.getElementById('tempmin');
const tempmax = document.getElementById('tempmax');
const estado = document.getElementById('estado');
const icon = document.getElementById('icon'); */
=======
import pintaDatos from './pintaDatos.js'
import pintaMapa from './mapa.js';
import pintaGrafico from './grafico.js'
const boton = document.getElementById('boton');
>>>>>>> 2e05dad4257e0cfdce001043e0ac4842f4e77ded

export let grados = []; //Inicia vacio para poder reasignar
export let horas = []; //Inicia vacio para poder reasignar
export let lat;
export let lon;
export let response;
<<<<<<< HEAD
export let respuesta;
=======
let respuestaDias;
>>>>>>> 2e05dad4257e0cfdce001043e0ac4842f4e77ded

async function clima() {

    //Realizo primera consulta donde eobtengo los datos que mostrare en el dom
    let buscar = document.getElementById('buscar').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${buscar}&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    response = await axios.get(url)
    response = response.data;
    /* console.log(response); */
<<<<<<< HEAD
    /* let  */lat = response.coord.lat //Capturo la latitud que se utilizara en la segunda consulta
    /* let  */lon = response.coord.lon //Capturo la longitud que se utilizara en la segunda consulta    

/*     let map = L.map('map').setView([`${lat}`, `${lon}`], 13); //Crea una instancia de un objeto de mapa dado el ID DOM de un elemento <div>
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Se utiliza para cargar y mostrar capas de mosaicos en el mapa.
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map); //Añade la informacion recibida al mapa
    L.marker([`${lat}`, `${lon}`]).addTo(map) //Se utiliza para mostrar iconos en los que se puede hacer clic o arrastrar en el mapa.
        .bindPopup(`Temperatura actual: ${Math.trunc(response.main.temp)}°C </br> 
        Condicion actual: ${response.weather[0].description}`) //popup que muestra la temperatura actual y el estado
        .openPopup(); //Despliega el popup */


    
    //Realizo la segunda consulta donde obtengo los datos que se utilizan en el gráfico
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    let respuesta = await axios.get(url2)
    respuesta = respuesta.data;
    /* console.log(respuesta); */
=======
    lat = response.coord.lat //Capturo la latitud que se utilizara en la segunda consulta
    lon = response.coord.lon //Capturo la longitud que se utilizara en la segunda consulta    


    //Realizo la segunda consulta donde obtengo los datos que se utilizan en el gráfico
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    let respuesta = await axios.get(url2)
    respuesta = respuesta.data;
    
>>>>>>> 2e05dad4257e0cfdce001043e0ac4842f4e77ded
    let info = respuesta.list; //Creo la variable info y la igualo a respuesta.list donde se encuentran los grados y las horas 

    let grados_api = info.map((grado) => Math.trunc(grado.main.temp)) //Obtengo temperatura    
    grados = grados_api //Igualo la variable grados a los valores obtenidos de la api

<<<<<<< HEAD
    let horas_api = info.map((fech) => obtenerHora(fech.dt_txt)) //Obtengo Horas 
    console.log("Fechas: ", horas_api);
    horas = horas_api //Igualo la variable horas a los valores obtenidos de la api
    
/*     console.log("Grados: ",grados );
    console.log("Fechas: ",horas ); */
    pintaDatos(response) //Pinto datos obtenidos de la ap
    pintaMapa();
    pintaGrafico();
    getWeather();
    
}

=======
    let horas_api = info.map((fech) => obtenerHora(fech.dt_txt)) //Obtengo Horas     
    horas = horas_api //Igualo la variable horas a los valores obtenidos de la api

    let urlDias = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    respuestaDias = await axios.get(urlDias)
    respuestaDias = respuestaDias.data
    respuestaDias = respuestaDias.daily
    console.log(respuestaDias);

    let dias = respuestaDias.map((dia) => dia.dt)
    console.log(dias);

    let temDiaria = respuestaDias.map((diaria) => Math.trunc(diaria.temp.day))
    console.log(temDiaria);

    pintaDatos(response) //Pinto datos obtenidos de la ap
    pintaMapa();
    pintaGrafico();

}




>>>>>>> 2e05dad4257e0cfdce001043e0ac4842f4e77ded
function obtenerHora(fecha) { //Funcion que me formatea la hora 
    let hora_corregida = fecha;
    hora_corregida = hora_corregida.split(' ');
    hora_corregida = hora_corregida[1];
    hora_corregida = hora_corregida.split(':');
    hora_corregida = `${hora_corregida[0]}:${hora_corregida[1]}`
    return hora_corregida
}

boton.addEventListener('click', clima)