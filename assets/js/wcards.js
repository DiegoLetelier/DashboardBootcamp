
// Hacer nuevo proyecto para ver que funcione
// investigar "new Date" y proponer una nueva forma de resolver los datos para las fechas
// mejorar la visualización de la temperatura
// Arreglar y que funcione git
// que funcione import export
// Poder instalar node en repositorio

var res = import('./main.js');
 

res => {
        let cards = document.getElementById('cards');
        let html = '';

        for(let i = 0; i < res.daily.length - 1; i++){
            let dayService = new Date(res.daily[i].dt * 1000);

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
            
            let date = day + '/' + month + '/' + year;
            
            html = html + `
            <div class="card card-1">
                <div class="card__icon"><i class="fas fa-bolt"></i></div>
                <p class="card__exit"><i class="fas fa-times"></i></p>
                <h2 class="card__link">${ dayOfWeek } ${ day } de ${ month }</h2>
                <h2 class="card__title">${ Math.round(res.daily[i].temp.day - 273.15) } °C</h2>
                <p class="card__apply">
                    <a class="card__link" href="#">${ Math.round(res.daily[i].temp.min - 273.15) } °C - ${ Math.round(res.daily[i].temp.max - 273.15) } °C</a>
                </p>
                <img src="http://openweathermap.org/img/wn/${ res.daily[i].weather[0].icon }@2x.png" alt="">
            </div>
            `;
        }
        cards.innerHTML = html;
        console.log(res);

    }


getWeather();