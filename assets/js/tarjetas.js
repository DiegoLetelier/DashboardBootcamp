import { respuestaDias } from './main.js' 

export default function nextDays(){
    let cards = document.getElementById('cards');
    let html = '';

    for(let i = 1; i < respuestaDias.length - 1; i++){
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
        
        html = html +  `        
        <div class="card col-lg text-center customCards">
        <div class="card__icon"><i class="fas fa-bolt"></i></div>
            
            <h5 class="card__link">${ dayOfWeek } ${ day } de ${ month }</h5>
            <h6 class="card__title">${ Math.round(respuestaDias[i].temp.day) } °C</h6>
            <p class="card__apply">
                <a class="card__link" href="#">${ Math.round(respuestaDias[i].temp.min) } °C - ${ Math.round(respuestaDias[i].temp.max) } °C</a>
            </p>
            <span class="text-center"><img src="http://openweathermap.org/img/wn/${respuestaDias[i].weather[0].icon }@2x.png" alt="" width="120px" height="120px" ></span>
        </div>
        `;
    }
    cards.innerHTML = html;
   


}