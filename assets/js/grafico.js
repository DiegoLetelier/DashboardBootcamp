import { grados, horas } from "./main.js";

export default function pintaGrafico() {
  const data = {
    labels: horas,
    datasets: [{
      label: 'Temperatura próximas 8 Horas',
            data: grados,
            fill: true,
            backgroundColor:'rgba(255, 0, 0, 0.5)',
            borderColor: 'rgb(255,0,0,1)',  //'rgb(75, 192, 192)'
            tension: 0.4,
            borderWidth: 1,
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

}