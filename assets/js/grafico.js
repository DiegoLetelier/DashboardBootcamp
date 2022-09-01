import { grados, horas } from "./main.js";

export default function pintaGrafico() {
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

}