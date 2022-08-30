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
    
    //Realizo primera consulta donde eobtengo los datos que mostrare en el dom
    let buscar = document.getElementById('buscar').value; 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${buscar}&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    let response = await axios.get(url)
    response = response.data; 
    console.log(response);
    let lat = response.coord.lat //Capturo la latitud que se utilizara en la segunda consulta
    let lon = response.coord.lon //Capturo la longitud que se utilizara en la segunda consulta
    

    let map = L.map('map').setView([`${lat}`, `${lon}`], 13); //Crea una instancia de un objeto de mapa dado el ID DOM de un elemento <div>
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Se utiliza para cargar y mostrar capas de mosaicos en el mapa.
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([`${lat}`, `${lon}`]).addTo(map)
        .bindPopup(`Temperatura actual: ${Math.trunc(response.main.temp)}°C </br>
        Condicion actual: ${response.weather[0].description}`)
        .openPopup();

        //map.remove(); 
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    let respuesta = await axios.get(url2)    
    respuesta = respuesta.data;
    console.log(respuesta);
    let info = respuesta.list;

    let grados_api = info.map((grado) => Math.trunc(grado.main.temp)) //Obtengo temperatura    
    grados = grados_api //Igualo la variable grados a los valores obtenidos de la api
    
    let horas_api = info.map((fech) => obtenerHora(fech.dt_txt)) //Obtengo Horas 
    console.log("Fechas: ",horas_api );
    horas = horas_api //Igualo la variable horas a los valores obtenidos de la api
    console.log("Grados: ",grados );
    console.log("Fechas: ",horas );
    
//Principio del Gráfico
    const data = {
        labels: horas,
         datasets: [{
                label: 'Temperatura próximas 5 Horas',
                data: grados,
                fill: false,
                borderColor: 'rgb(255,0,0)',  //'rgb(75, 192, 192)'
                tension: 0.1
        }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {}
      }; 

      const myChart = new Chart(        
        document.getElementById('myChart'),
        config,        
      );    
//Fin del gráfico 
    
    pintaDatos(response) //Pinto datos obtenidos de la ap
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

function obtenerHora(fecha){ //Funcion que me formatea la hora 
    let hora_corregida = fecha;
    hora_corregida = hora_corregida.split(' ');
    hora_corregida = hora_corregida[1];
    hora_corregida = hora_corregida.split(':');
    hora_corregida = `${hora_corregida[0]}:${hora_corregida[1]}`
    return hora_corregida
}

boton.addEventListener('click', clima)