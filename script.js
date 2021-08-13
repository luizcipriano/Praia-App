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
const geoLocal_URL = "https://ip-api.com/json/?fields=61439"
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
    }
    else{
        alert('Erro ao obter localização')
        cidade_inner.innerHTML = 'Rio de Janeiro'
        getTempo2('Rio%20de%20Janeiro')
    }
}

// Achar tempo
async function getTempo(lat, lon){
    const icone_tempo = document.getElementById('icone-tempo')
    let tempo_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=pt&appid=1124b498fe4c4e132eb3c4c95318b70a`

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

// Achar tempo
async function getTempo2(cidade){
    const icone_tempo = document.getElementById('icone-tempo')
    let tempo_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&lang=pt&appid=1124b498fe4c4e132eb3c4c95318b70a`

    let response = await fetch(tempo_URL)
    let json2 = await response.json()

    const icone = json2.weather[0].icon
    const icone_url = `http://openweathermap.org/img/wn/${icone}@2x.png`
    icone_tempo.src = icone_url

    console.log(json2, 'Segundo')

    imprimeTempoAtual(json2)
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
    const vento_velo_inner = document.getElementById('vento-velo')
    
    vento_velo_inner.innerHTML = formatVelocidade(data.wind.speed)
}

function formatVelocidade(velo){
    return Math.round(Number(velo) * 3.6)
}


// Sensação
function imprimeSensacao(data){
    const sensacao_inner = document.getElementById('sensacao')

    sensacao_inner.innerHTML = formatTemperatura(data.main.feels_like)
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


// Tempo Atual
function imprimeTempoAtual(data){
    const tempo_atual_inner = document.getElementById('tempo-local-atual')
    const descricao_tempo_inner = document.getElementById('descricao-tempo')

    let tempo_atual = data.weather[0].main
    let clouds = data.clouds.all
    console.log(clouds)
    let descricao_tempo = data.weather[0].description
    let tempo_id = data.weather[0].id

    descricao_tempo_inner.innerHTML = formatText(descricao_tempo) 

    switch(tempo_id){
        // nublado
        case 800:
            tempo_atual_inner.innerHTML = 'O céu está limpo'
            break
        case 801:
            tempo_atual_inner.innerHTML = 'poucas nuvens'
            break
        case 802:
            tempo_atual_inner.innerHTML = 'algumas nuvens'
            break
        case 803:
            tempo_atual_inner.innerHTML = 'parcialmente nublado'
            break
        case 804:
            tempo_atual_inner.innerHTML = 'tempo nublado'
            break
        
        // tempo misto
        case 701:
            if(clouds >= 80) tempo_atual_inner.innerHTML = 'pancadas de chuva'
            else if(clouds >= 60) tempo_atual_inner.innerHTML = 'chuva moderada'
            else if (clouds > 40) tempo_atual_inner.innerHTML = 'chuva fraca'
            else if (clouds >= 0) tempo_atual_inner.innerHTML = 'nublado'
        break

        // chuva
        case 500:
            tempo_atual_inner.innerHTML = 'chuva fraca'
            break
        case 501:
            tempo_atual_inner.innerHTML = 'chuva moderada'
            break
        case 502:
            tempo_atual_inner.innerHTML = 'chuva forte-moderada'
            break
        case 503:
            tempo_atual_inner.innerHTML = 'chuva forte'
            break
        case 504:
            tempo_atual_inner.innerHTML = 'chuva muito forte'
            break
        case 521:
            tempo_atual_inner.innerHTML = 'chuva leve em nuvens passageiras'
            break
        case 522:
            tempo_atual_inner.innerHTML = 'chuva intensa em nuvens passageiras'
            break
        case 531:
            tempo_atual_inner.innerHTML = 'pancadas de chuva'
            break
        
        // chuvisco
        case 300:
            tempo_atual_inner.innerHTML = 'chuvisco levo'
            break
        case 301:
            tempo_atual_inner.innerHTML = 'chuvisco'
            break
        case 302:
            tempo_atual_inner.innerHTML = 'chuvisco forte'
            break
        case 310:
            tempo_atual_inner.innerHTML = 'chuvisco com chuva'
            break
        case 311:
            tempo_atual_inner.innerHTML = 'chuvisco'
            break
        case 312:
            tempo_atual_inner.innerHTML = 'chuvisco com chuva forte'
            break
        case 313:
            tempo_atual_inner.innerHTML = 'chuvisco em nuvens passageiras'
            break
        case 314:
            tempo_atual_inner.innerHTML = 'chuvisco forte com chuva'
            break
        case 321:
            tempo_atual_inner.innerHTML = 'chuvisco em nuvens passageiras'
            break
         
        // tempestade
        case 200:
            tempo_atual_inner.innerHTML = 'tempestade com chuva leve'    
            break
        case 201:
            tempo_atual_inner.innerHTML = 'tempestade com chuva moderada'
            break
        case 202:
            tempo_atual_inner.innerHTML = 'tempestade com chuva forte'
            break
        case 210:
            tempo_atual_inner.innerHTML = 'trovoadas leves'
            break
        case 211:
            tempo_atual_inner.innerHTML = 'trovoadas'
            break
        case 212:
            tempo_atual_inner.innerHTML = 'trovoadas fortes'
            break
        case 230:
            tempo_atual_inner.innerHTML = 'trovoadas com chuvisco leve'
            break
        case 231:
            tempo_atual_inner.innerHTML = 'trovoadas com chuvisco'
            break
        case 232:
            tempo_atual_inner.innerHTML = 'trovoadas com chuvisco forte'
            break
    }
}

function formatText(texto){
    return texto[0].toUpperCase() + texto.slice(1)
}