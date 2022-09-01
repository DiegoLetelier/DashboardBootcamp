//Para subir
import pintaDatos from './pintaDatos.js'
import pintaMapa from './mapa.js';
import pintaGrafico from './grafico.js'
const boton = document.getElementById('boton');

export let grados = []; //Inicia vacio para poder reasignar
export let horas = []; //Inicia vacio para poder reasignar
export let lat;
export let lon;
export let response;
let respuestaDias;
let dias = [];
let temDiaria = [];

async function clima() {

    //Realizo primera consulta donde eobtengo los datos que mostrare en el dom
    let buscar = document.getElementById('buscar').value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${buscar}&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    response = await axios.get(url)
    response = response.data;
    /* console.log(response); */
    lat = response.coord.lat //Capturo la latitud que se utilizara en la segunda consulta
    lon = response.coord.lon //Capturo la longitud que se utilizara en la segunda consulta    


    //Realizo la segunda consulta donde obtengo los datos que se utilizan en el gráfico
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    let respuesta = await axios.get(url2)
    respuesta = respuesta.data;
    
    let info = respuesta.list; //Creo la variable info y la igualo a respuesta.list donde se encuentran los grados y las horas 

    let grados_api = info.map((grado) => Math.trunc(grado.main.temp)) //Obtengo temperatura    
    grados = grados_api //Igualo la variable grados a los valores obtenidos de la api

    let horas_api = info.map((fech) => obtenerHora(fech.dt_txt)) //Obtengo Horas     
    horas = horas_api //Igualo la variable horas a los valores obtenidos de la api

    let urlDias = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=616629f9acdc3b22b8b09553e632e5da&lang=es`
    respuestaDias = await axios.get(urlDias)
    respuestaDias = respuestaDias.data
    respuestaDias = respuestaDias.daily
    console.log(respuestaDias);

    dias = respuestaDias.map((dia) => dia.dt)
    console.log(dias);

    temDiaria = respuestaDias.map((diaria) => Math.trunc(diaria.temp.day))
    console.log(temDiaria);
    
    pintaDatos(response) //Pinto datos obtenidos de la ap
    pintaMapa();
    pintaGrafico();
    nextDays();

}

function obtenerHora(fecha) { //Funcion que me formatea la hora 
    let hora_corregida = fecha;
    hora_corregida = hora_corregida.split(' ');
    hora_corregida = hora_corregida[1];
    hora_corregida = hora_corregida.split(':');
    hora_corregida = `${hora_corregida[0]}:${hora_corregida[1]}`
    return hora_corregida
}


function nextDays(){
        let cards = document.getElementById('cards');
        let html = '';

        for(let i = 0; i < respuestaDias.length - 1; i++){
            let dayService = new Date(respuestaDias[i].dt * 1000);

            let day = dayService.getDate();
            let month = 
                dayService.getMonth() == 0 ? "Enero" : 
                dayService.getMonth() == 1 ? "Febrero" : 
                dayService.getMonth() == 2 ? "Marzo" :
                dayService.getMonth() == 3 ? "Abril" :
                dayService.getMonth() == 4 ? "Mayo" :
                dayService.getMonth() == 5 ? "Junio" :
                dayService.getMonth() == 6 ? "Julio" :
                dayService.getMonth() == 7 ? "Agosto" :
                dayService.getMonth() == 8 ? "Septiembre" :
                dayService.getMonth() == 9 ? "Octubre" :
                dayService.getMonth() == 10 ? "Noviembre" :
                dayService.getMonth() == 11 ? "Diciembre" : "";
            let year = dayService.getFullYear();

            let dayOfWeek = 
                dayService.getDay() == 0 ? "Domingo" : 
                dayService.getDay() == 1 ? "Lunes" : 
                dayService.getDay() == 2 ? "Martes" :
                dayService.getDay() == 3 ? "Miércoles" :
                dayService.getDay() == 4 ? "Jueves" :
                dayService.getDay() == 5 ? "Viernes" :
                dayService.getDay() == 6 ? "Sábado" : "";
            
            /* let date = day + '/' + month + '/' + year; */
            
            html = html + `
            <div class="card card-1">
                <div class="card__icon"><i class="fas fa-bolt"></i></div>
                <p class="card__exit"><i class="fas fa-times"></i></p>
                <h2 class="card__link">${ dayOfWeek } ${ day } de ${ month }</h2>
                <h2 class="card__title">${ Math.round(respuestaDias[i].temp.day) } °C</h2>
                <p class="card__apply">
                    <a class="card__link" href="#">${ Math.round(respuestaDias[i].temp.min) } °C - ${ Math.round(respuestaDias[i].temp.max) } °C</a>
                </p>
                <img src="http://openweathermap.org/img/wn/${respuestaDias[i].weather[0].icon }@2x.png" alt="">
            </div>
            `;
        }
        cards.innerHTML = html;
        console.log(respuestaDias);


}



boton.addEventListener('click', clima)