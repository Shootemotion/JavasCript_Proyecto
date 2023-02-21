
// Capturas en DOM
let formCarga = document.getElementById("formCarga")
let guardarcSubCatBtn = document.getElementById("guardarcSubCatBtn")


//---- FORMULARIO CON LISTAS DEPENDIENTES -----  
document.getElementById("tipoMovimientoAdd").addEventListener("change", listaDependiente);


function listaDependiente (){
let tipoMovimientoAdd = document.getElementById ("tipoMovimientoAdd");
let tipoAdd = document.getElementById ("tipoAdd");
let options = "";

if(tipoMovimientoAdd.value == ""){
    tipoAdd.disabled = true;
}
else if(tipoMovimientoAdd.value == "ingreso"){
    for (let i = 0; i < tiposIngreso.length; i++) {
    options += "<option value='" + tiposIngreso[i] + "'>" + tiposIngreso[i] + "</option>";
    }
    tipoAdd.innerHTML = options;
    tipoAdd.disabled = false;
    }
    else if (tipoMovimientoAdd.value == "gasto"){
    for (let i = 0; i < tiposGasto.length; i++) {
    options += "<option value='" + tiposGasto[i] + "'>" + tiposGasto[i] + "</option>";
    }
    tipoAdd.innerHTML = options;
    tipoAdd.disabled = false;
    }
    }


    // ARRAY CON DATOS PARA LISTAS
let tiposIngreso = ['Alquiler', 'Trabajo', 'Empresa'];
let tiposGasto = ['Impuestos', 'Gas', 'Luz'];


// guardo nuevos datos en el array de listas
guardarcSubCatBtn.addEventListener('click', function(event) {
    event.preventDefault();
  
    let tipo = document.getElementById("tipo").value;
    let descripcion = document.getElementById("descripcion").value;
  
    if (tipo === 'ingreso') {
      tiposIngreso.push(descripcion);
    } else if (tipo === 'gasto') {
      tiposGasto.push(descripcion);
    }
  
    console.log(tiposIngreso, tiposGasto);
  });



// -------- CLASE CONSTRUCTORA -------------
class cargaDatos {
    constructor(id, movimiento, creador, monto, tipo, fecha){
    this.id = id
    this.movimiento = movimiento
    this.creador = creador
    this.monto = monto
    this.tipo = tipo
    this.fecha= fecha
    }

    mostrarConsola (){
        console.log(`estos son los datos de mi objeto. ${this.id} - ${this.movimiento} - ${this.creador} - ${this.tipo} - ${this.fecha}`)
    }
}
//Creo  objetos
const dato1 = new cargaDatos(1, "ingreso", "Juan" , 100,"Alquiler", new Date(2022, 01 ,02) )
const dato2 = new cargaDatos(2, "gasto", "Stefano" , 300,"Gas", new Date(2022, 03 ,23) )
const dato3 = new cargaDatos(3, "ingreso", "Tiziana" , 400,"Alquiler", new Date(2022, 05 ,14) )
const dato4 = new cargaDatos(4, "ingreso", "Luis" , 400,"empresa", new Date(2022, 08 ,11) )
const dato5 = new cargaDatos(5, "gasto", "Julieta" , 100,"Impuestos", new Date(2022, 06 ,10) )


//ARRAY QUE CONTIENE OBJETOS
let arrayBalance = []


let arrayEnLS 
// STORAGE, Reviso si esta vacio
if(localStorage.getItem("arrayBalance")) {
    arrayEnLS = JSON.parse(localStorage.getItem("arrayBalance"))
    console.log(arrayEnLS)
    generarBaseDatos(arrayEnLS)
  
} else {
    arrayBalance.push(dato1, dato2, dato3,dato4,dato5)
    localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance))
    generarBaseDatos(arrayBalance)
}



//------------------------------FUNCIONES-------------------------------------------
// FUNCION QUE ALIMENTA LOS TIPOS DE MOVMIENTO

//Creo el evento que forma la funcion constructora con la que completo el array
function inputInformacion(array) {
    // pido los datos
    let movimiento = document.getElementById("tipoMovimientoAdd")
    let creador = document.getElementById("creadorAdd")
    let tipo = document.getElementById("tipoAdd")
    let monto = document.getElementById("montoAdd")
    let fecha = document.getElementById("fechaAdd")
   
  // Verifica si alguna de las variables está vacía
  if (!movimiento.value || !creador.value || !tipo.value || !monto.value || !fecha.value) {
     
Swal.fire({
    icon: 'error',
    text: "Debe completar todos los campos" ,
})
      return;
   
    }

      // RRECUPERO MI ARRAY EN LS
      let arrayEnLS = JSON.parse(localStorage.getItem("arrayBalance")) || [];

    // Creo el objeto
    const nuevaEntrada = new cargaDatos (array.length+1, movimiento.value, creador.value, parseInt(monto.value), tipo.value, new Date(fecha.value))


  

    // Pusheo los datos en el array
    arrayEnLS.push(nuevaEntrada);


    // agrego al Storage
    localStorage.setItem("arrayBalance", JSON.stringify(arrayEnLS))
   

  
    formCarga.reset()
     Toastify({
        text: "Registro Guardado",
        duration: 4000,
        newWindow: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      console.log(arrayEnLS)
      generarBaseDatos(arrayEnLS)
      mostrarCalculos()
}

// Muestro el Array en el DOM
function generarBaseDatos (array){
    let divBaseDatos = document.getElementById("baseDatos")
       //vaciar Div
       divBaseDatos.innerHTML = ""

      // Dependiendo del tipo de mov, le agrego una clase con Colores a cada DiV
    for (let dato of array){
        let nuevoDato = document.createElement("div")  
        if(dato.movimiento ==="ingreso") {
            nuevoDato.classList.add('verde')
        }else if (dato.movimiento ==="gasto") {
            nuevoDato.classList.add('rojo')}

    // Creo una div Standar o modelo con el formato que van a tener todos mis objetos creados.
        nuevoDato.innerHTML =
        `<div class="fila">
        <div  class=" text-center celda1">
        <img class="iconoImg" src="../img/icono_billete_verde.png"  alt="">
    </div>
        <div  class=" text-center celda">
            <h4>${dato.movimiento}</h4>
        </div>
        <div  class=" text-center celda">
            <h4>${dato.tipo}</h4>
        </div>
        <div  class=" text-center celda">
            <h4>${new Date(dato.fecha).toISOString().slice(0,10)}</h4>
        </div>
        <div  class=" celda">
            <h4>${dato.creador}</h4>
        </div>
        <div  class=" celda">
            <h4>${dato.monto} AR$</h4>
        </div>
    </div>`
    // CAMBIO EL ICONO DEPENDIENDO EL TIPO DE MOVIMIENTO
    let img = nuevoDato.querySelector(".iconoImg")
    if (nuevoDato.classList.contains('verde')){
    img.src="../img/icono_billete_verde.png"
    } else if (nuevoDato.classList.contains('rojo')){
        img.src= "../img/icono_billete_rojo.png"
        
    }
    divBaseDatos.appendChild(nuevoDato)
 }
}



// --------------- CALCULOS ---------------------------------------------

function mostrarCalculos(){
    let arrayEnLS=[]
    if(localStorage.getItem("arrayBalance")) {
        arrayEnLS = JSON.parse(localStorage.getItem("arrayBalance"))
    console.log(arrayBalance)
    } else {
        arrayEnLS=[...arrayBalance]
    
    }
    console.log(arrayEnLS)

// Con la funcion Reduce, calculo cantidad de Ingresos y Gastos
const totalTipo = arrayEnLS.reduce((acum, val) => {
if (val.movimiento === "ingreso") {
    acum.ingreso++
} else if (val.movimiento === "gasto") {
    acum.gasto++
}
return acum
}, {ingreso: 0, gasto: 0})

document.getElementById("qIngreso").innerHTML=totalTipo.ingreso
document.getElementById("qGasto").innerHTML=totalTipo.gasto


// Con la funcion Reduce, calculo el total en Ingresos y Gastos
const totalMonto = arrayEnLS.reduce((acum, val) => {
    if (val.movimiento === "ingreso") {
       acum.ingresos += val.monto
       
    } else if (val.movimiento === "gasto") {
        acum.gasto += val.monto
    }
    return acum
    }, {ingresos: 0, gasto: 0})


// MUESTRO EN EL DOM
    document.getElementById("totalIngreso").innerHTML=totalMonto.ingresos
    document.getElementById("totalGasto").innerHTML=totalMonto.gasto
    let balance = totalMonto.ingresos -totalMonto.gasto

    document.getElementById("resultadoBalance").innerHTML= `${parseFloat(balance.toFixed(2))} $`

    
    document.getElementById("totalIngreso1").innerHTML=`${parseFloat(totalMonto.ingresos.toFixed(2))} $`
    document.getElementById("totalGasto1").innerHTML=`${parseFloat(totalMonto.gasto.toFixed(2))} $`


}


//Busco Boton Submit/cargar etc.
let guardarDatos = document.getElementById("guardarDatos")
//Le agrego el evento que va a realizar el boton
guardarDatos.addEventListener("click", ()=>{
    inputInformacion(arrayEnLS)}
    )




    
//-------------------------ORDEN-----------------------------------------//

//ORDEN MONTO
//Busco Boton Ordenar Monto.
let OrdenarMonto = document.getElementById("ordenarMonto")
//Le agrego el evento que va a realizar el boton
// OrdenarMonto.addEventListener("click", ()=>{
//     ordenarArrayMonto(arrayBalance)}
//     )

// Ordeno mi Array Por el monto y lo muestro en DOM
function ordenarArrayMonto(array){
    // Copio el original, []Aca recibe un array vacio y concatena/copia el array orig.
    const nuevoArrayBalance =[].concat(array)
    nuevoArrayBalance.sort((a,b) => a.monto - b.monto)
   console.log(nuevoArrayBalance)
    generarBaseDatos(nuevoArrayBalance)
}


// //ORDEN TIPO MOVIMIENTO
// let OrdenarTipo = document.getElementById("OrdenarTipo")
// OrdenarTipo.addEventListener("click", ()=>{
//     ordenarArrayTipo(arrayBalance)}
//     )

function ordenarArrayTipo(array){
    // Copio el original, []Aca recibe un array vacio y concatena/copia el array orig.
    const nuevoArrayTipo =[].concat(array)

    nuevoArrayTipo.sort((a,b) => {
        if(a.movimiento > b.movimiento) {
            return 1
          }
          if (a.movimiento < b.movimiento) {
            return -1
          }
          return 0;
    })
 }



 buscador.addEventListener("input", ()=>{

    buscarInfo(buscador.value.toLowerCase(), arrayEnLS)
})

 function buscarInfo(buscado, array){
    //comparación estricta autor y titulo, ej:
    // libro.autor.toLowerCase() == buscado.toLowerCase() || libro.titulo.toLowerCase() == buscado.toLowerCase()
    let busquedaArray = array.filter(
        (cargaDatos)=> cargaDatos.movimiento.toLowerCase().includes(buscado) || cargaDatos.tipo.toLowerCase().includes(buscado)
    )
    busquedaArray.length == 0 ?
    (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, generarBaseDatos(busquedaArray)) 
    :
    (coincidencia.innerHTML = "", generarBaseDatos(busquedaArray))

}



 mostrarCalculos()
