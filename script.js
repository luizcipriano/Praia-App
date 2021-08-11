/////////////////////////////////////////////////////////////////////////////////////////
//                                          TEMPO

// Tempo Agora
setInterval(tempo, 1000)

function tempo(){
    const hora_inner = document.getElementById('horas')
    const minuto_inner = document.getElementById('minutos')

    const dataAtual = new Date()
    const horaAtual = dataAtual.getHours()
    const minutoAtual = dataAtual.getMinutes()
    

    hora_inner.innerHTML = formatHora(horaAtual)
    minuto_inner.innerHTML = formatHora(minutoAtual)
}

function formatHora(hora){
    if(hora < 10){
        hora = '0' + hora
    }
    return hora
}

/////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////
//                                          API

// Achar Cidade
const geoLocal_URL = "http://ip-api.com/json/?fields=61439"
getLocal(geoLocal_URL)
async function getLocal(geoLocal_URL){
    const cidade_inner = document.getElementById('cidade')
    let resp = await fetch(geoLocal_URL)
    let json1 = await resp.json()
    console.log(json1)
    
    if(json1.status === 'success'){
        const cidade = json1.city
        cidade_inner.innerHTML = cidade
        const lat = json1.lat
        const lon = json1.lon
        getTempo(lat, lon)

    }else{
        alert('Erro ao obter localização')
        const cidade = json1.city
        cidade_inner.innerHTML = cidade
        getTempo2('Rio%20de%20Janeiro')
    }
    
}

// Achar tempo
async function getTempo(lat, lon){
    const icone_tempo = document.getElementById('icone-tempo')
    let tempo_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt&appid=1124b498fe4c4e132eb3c4c95318b70a`

    let response = await fetch(tempo_URL)
    let json2 = await response.json()
    const icone = json2.weather[0].icon
    const icone_url = `http://openweathermap.org/img/wn/${icone}@2x.png`
    icone_tempo.src = icone_url
    console.log(json2)

    imprimeTemp(json2)
    imprimePressao(json2)
    imprimeVento(json2)
    imprimeSensacao(json2)
    imprimeSol(json2)
    imprimeUmidade(json2)
}

async function getTempo2(cidade){
    const icone_tempo = document.getElementById('icone-tempo')
    let tempo_URL = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&appid=1124b498fe4c4e132eb3c4c95318b70a`

    let response = await fetch(tempo_URL)
    let json2 = await response.json()
    const icone = json2.weather[0].icon
    const icone_url = `http://openweathermap.org/img/wn/${icone}@2x.png`
    icone_tempo.src = icone_url
    console.log(json2)

    imprimeTemp(json2)
    imprimePressao(json2)
    imprimeVento(json2)
    imprimeSensacao(json2)
    imprimeSol(json2)
    imprimeUmidade(json2)
}

/////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////
//                                          EVENTOS

// Temperatura
function imprimeTemp(data){
    const temp_atual = document.getElementById('temp-atual')
    const temp_minima = document.getElementById('temp-minima')
    const temp_maxima = document.getElementById('temp-maxima')

    temp_atual.innerHTML = formatTemperatura(data.main.temp)
    temp_minima.innerHTML = formatTemperatura(data.main.temp_min)
    temp_maxima.innerHTML = formatTemperatura(data.main.temp_max)

}

function formatTemperatura(temp){
    return Math.round(Number(temp) - 273.15)
}

// Pressão
function imprimePressao(data){
    const pressao_inner = document.getElementById('pressao')

    const pressao = data.main.pressure
    pressao_inner.innerHTML = pressao
}

// Vento
function imprimeVento(data){
    const vento_ang_inner = document.getElementById('vento-ang')
    const vento_velo_inner = document.getElementById('vento-velo')

    const vento_ang = data.wind.deg
    const vento_velo = data.wind.speed
    vento_ang_inner.innerHTML = vento_ang
    vento_velo_inner.innerHTML = formatVelocidade(vento_velo)
}

function formatVelocidade(velo){
    return Math.round(Number(velo) * 3.6)
}

// Sensação
function imprimeSensacao(data){
    const sensacao_inner = document.getElementById('sensacao')

    const sensacao = formatTemperatura(data.main.feels_like)
    sensacao_inner.innerHTML = sensacao
}

// Sol
function imprimeSol(data){
    const nascer_hora_inner = document.getElementById('nascer-sol-hora')
    const nascer_minuto_inner = document.getElementById('nascer-sol-minuto')

    const por_hora_inner = document.getElementById('por-sol-hora')
    const por_minuto_inner = document.getElementById('por-sol-minuto')

    const nascer = data.sys.sunrise
    const por = data.sys.sunset

    let nascer_minutes = Math.floor((nascer /  60) % 60)
    let nascer_hours = (Math.floor((nascer / 3600) % 24)) -3
    if(nascer_hours < 10) nascer_hours = '0' + nascer_hours
    if(nascer_minutes < 10) nascer_minutes = '0' + nascer_minutes

    nascer_minuto_inner.innerHTML = nascer_minutes
    nascer_hora_inner.innerHTML = nascer_hours


    let por_minutes = Math.floor((por /  60) % 60)
    let por_hours = (Math.floor((por / 3600) % 24)) - 3
    if (por_minutes < 10) por_minutes = '0' + por_minutes
    if (por_hours < 10) por_hours = '0' + por_hours

    por_minuto_inner.innerHTML = por_minutes
    por_hora_inner.innerHTML = por_hours
}

// Umidade
function imprimeUmidade(data){
    const umidade_inner = document.getElementById('umidade')

    const umidade = data.main.humidity
    umidade_inner.innerHTML = umidade
}