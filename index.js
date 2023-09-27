require('dotenv').config()
const axios = require('axios')

const { appid } = process.env

const city = process.argv[2]
if(city == undefined){
    console.log("insira o nome da cidade como argumento")
    return
}

axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${appid}&lang=pt_BR`)
  .then((res) => {
    let name = res.data[0]['name']
    let lat = res.data[0]['lat']
    let lon = res.data[0]['lon']
    console.log(`a cidade de ${name} esta na latitude ${lat} e longitude ${lon}`)

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_BR&appid=${appid}`)
      .then(res => {
        let feels = res.data.main.feels_like
        let des = res.data.weather[0].description
        console.log(`sencacao termica de ${feels} graus cecius e clima ${des}`)
      })
      .catch(err => console.log("erro ao fazer a requisicao de clima"))
  })
  .catch(err => console.log("erro ao fazer a requisicao a API"))
