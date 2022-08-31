
const fecha = document.getElementById('fecha');
const temperatura = document.getElementById('temperatura');
const city = document.getElementById('ciudad');
const estado = document.getElementById('estado');
const icon = document.getElementById('icon');

export default function pintaDatos(response) {

    //Hora Unix a Hora UTC
    let unixTimestamp = response.dt
    let date = new Date(unixTimestamp * 1000);
    fecha.textContent = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`

    //Se obtiene nombre de ciudad
    city.textContent = `${response.name}`
    //Obtencion temperatura
    let tempRedondeada = Math.trunc(response.main.temp)
    temperatura.textContent = `${tempRedondeada}°C`

    /*     let tempminima = Math.trunc(response.main.temp_min)
        tempmin.textContent = `${tempminima}°C`
        
        let tempmaxima = Math.trunc(response.main.temp_max)
        tempmax.textContent = `${tempmaxima}°C` */

    estado.textContent = `${response.weather[0].description}`

    icon.src = `https://openweathermap.org/img/wn/${response.weather[0].icon}.png`

    /* console.log(response.weather[0].description) */

}
