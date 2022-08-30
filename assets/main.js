// let url = 'https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid={a636dc5fa5641736f2391c1a680c197e}'


/*

async function getData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        const API_KEY = '49cc8c821cd2aff9af04c9f98c36eb74'
        let {latitude, longitude} = success.coords;
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

        console.log(data)
        
        })

    })
}

getData()


*/

// funciones para fetch de url para latitud y longitud, sacando variable con datos (data)




 async function geo() {
 
  navigator.geolocation.getCurrentPosition(succes => {


    const API_KEY = 'a636dc5fa5641736f2391c1a680c197e'
  
    let { latitude, longitude } = succes.coords;
  
    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`


    fetch(url)
    .then(response => response.json())
    .then(data => 
      {console.log(data), showDataLocal(data)})
    .catch((error) => console.log(error))
  

  })
           
}

// geo ()

document.querySelector("#btnlocal").addEventListener('click', geo)

document.querySelector("#btncity").addEventListener('click', fromCity)

async function fromCity () {

  let city = document.getElementById('city').value
  const API_KEY = 'a636dc5fa5641736f2391c1a680c197e'

  let url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

  fetch(url2)
    .then(response => response.json())
    .then(data => 
      {console.log(data), showDataCity(data) })
    .catch((error) => console.log(error))
  

}

// ponerle una funcion para identificar donde está desde las longitud y latitud

function showDataLocal(data) {
  clima  = {
    ciudad : data.name,
    temperatura : data.current.temp, 
    viento : data.current.wind_speed,
  }
  
  document.getElementById('datos')
  .innerHTML=`<H2>la temperartura del lugar donde te encuentras es de ${clima.temperatura} con una velocidad del viento de ${clima.viento}</H2>`
}


function showDataCity(data) {
      clima  = {
        ciudad : data.name,
        temperatura : data.main.temp, 
        viento : data.wind.speed,
      }
      
      document.getElementById('datos')
      .innerHTML=`<H2>la temperartura de ${clima.ciudad}  es ${clima.temperatura} con una velocidad del viento de ${clima.viento}</H2>`
    }




/*
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };


  const myChart = new Chart(
    document.getElementById('Chart1'),
    config
  );

/*
let config = {
    
    header : {
        'Content-Type' : 'application/json'
    }
}

async function getData(){
try {
        
    let singIn = await fetch(url);
    answer = await singIn.json();
    console.log(answer);
    
} catch (error){
     console.log(error + ' you suck!')
}
}

/*
async function getData() {
    let response = await axios.get(url, config);
    console.log(response)
}

getData()
*/


