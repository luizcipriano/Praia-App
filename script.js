

const geoLocal_URL = "http://ip-api.com/json/?fields=61439"

async function getLocal(geoLocal_URL){
    const response = await fetch(geoLocal_URL)

    const json = await response.json()
    console.log(json)

}

getLocal(geoLocal_URL)