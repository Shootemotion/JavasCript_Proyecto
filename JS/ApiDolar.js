let apiDolar = document.getElementById("apiDolar")
let cardsCreadas = false

async function actualizarInfoDolar() {
  try {
    const respuesta = await fetch("https://api.bluelytics.com.ar/v2/latest")
    const data = await respuesta.json()
    arrayTiposDolar = []

    // Creo un nuevo objeto de la api y uso la clave como Nombre
    Object.entries(data).forEach(([clave, valor]) => {
      if (clave !== "last_update") {
        let objetoNuevo = { Nombre: clave, ...valor }
        arrayTiposDolar.push(objetoNuevo)
      }
    })

    for (let elem of arrayTiposDolar) {
      let cardDolar = document.getElementById(`card-${elem.Nombre}`)
      if (cardDolar) {
        cardDolar.querySelector(".card-text").textContent = elem.value_avg
        cardDolar.querySelector(".card-text").textContent = `AR$ ${elem.value_avg}`
      }
    }

    // testing funciona el update
    // console.log(arrayTiposDolar)

    // Creo las Card originales, uso una bandera para que no se creen en cada bucle
    if (!cardsCreadas) {
      for (let elem of arrayTiposDolar) {
        let cardDolar = document.createElement("div")
        cardDolar.setAttribute("id", `card-${elem.Nombre}`)
        cardDolar.setAttribute("class", `car`)
        cardDolar.innerHTML = `
            <div class="article-card">
              <div class="card h-100">
                <div class="card-body nameMoneda">
                  <h5 class="card-title">${elem.Nombre.toUpperCase()}</h5>
                </div>
                <div class="card-body precioMoneda">
                <p class="card-text">AR$ ${elem.value_avg}</p>
                </div>
              </div>
            </div>`
        apiDolar.appendChild(cardDolar)
      }
      cardsCreadas = true
    }
  } catch (error) {
    console.log("No hay respuesta de la API")
  }
}

// Llamo a la función para actualizar la información cada segundo
function fecha(){
const DateTime = luxon.DateTime
const fecha = DateTime.now()
const fechaformateada = fecha.setLocale('en').toLocaleString(DateTime.TIME_WITH_SECONDS)
let fechaLuxon = document.getElementById("fechaLuxon")

fechaLuxon.textContent = fechaformateada
}


setInterval(function() {
  actualizarInfoDolar()
  fecha()
}, 1000)