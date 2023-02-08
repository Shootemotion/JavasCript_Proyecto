//formulario con listas con dependencia (Preguntar en clase como el usuario puede alimentar la lista dependiente)

function listaDependiente (){
    var tipoMovimientoAdd = document.getElementById ("tipoMovimientoAdd")
    var tipoAdd = document.getElementById ("tipoAdd")

    if(tipoMovimientoAdd.value == ""){
        tipoAdd.disabled = true
    }

   else if(tipoMovimientoAdd.value == "ingreso"){
        tipoAdd.innerHTML = "<option value='Alquiler'>Alquiler</option><option value='trabajo'>trabajo</option><option value='empresa'>empresa</option>" 
        tipoAdd.disabled = false
    }

    else if (tipoMovimientoAdd.value == "gasto"){
        tipoAdd.innerHTML = "<option value='Impuestos'>Impuestos</option><option value='Gas'>Gas</option><option value='Luz'>Luz</option>" 
        tipoAdd.disabled = false
    }
}




// Creo una clase constructora (metodo que tiene como su equivalente a la function)Esta manera es la mas nitida y actual

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

const dato1 = new cargaDatos(1, "ingreso", "Juan" , 423,"Alquiler", new Date(2022, 01 ,02) )
const dato2 = new cargaDatos(2, "gasto", "Stefano" , 300,"Gas", new Date(2022, 03 ,23) )
const dato3 = new cargaDatos(3, "ingreso", "Tiziana" , 1200,"Alquiler", new Date(2022, 05 ,14) )
const dato4 = new cargaDatos(4, "ingreso", "Luis" , 643,"empresa", new Date(2022, 08 ,11) )
const dato5 = new cargaDatos(5, "gasto", "Julieta" , 2321,"Impuestos", new Date(2022, 06 ,10) )


//Armo el array que va a contener los objetos
let arrayBalance = []


// Me fijo si hay Datos en Storage y los cargo.
if(localStorage.getItem("arrayBalance")) {
    arrayBalance = JSON.parse(localStorage.getItem("arrayBalance"))
    generarBaseDatos(arrayBalance)
  
} else {
    arrayBalance.push(dato1,dato2, dato3,dato4,dato5)
    localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance))


}



//------------------------------FUNCIONES-------------------------------------------

//Creo el evento que forma la funcion constructora con la que completo el array
function inputInformacion(array) {
    // pido los datos
    let movimiento = document.getElementById("tipoMovimientoAdd")
    let creador = document.getElementById("creadorAdd")
    let tipo = document.getElementById("tipoAdd")
    let monto = document.getElementById("montoAdd")
    let fecha = document.getElementById("fechaAdd")
   
    // Creo el objeto
    const nuevaEntrada = new cargaDatos (array.length+1, movimiento.value, creador.value, monto.value, tipo.value, new Date(fecha.value))

    // Pusheo los datos en el array
    array.push(nuevaEntrada)

    // agrego al Storage
    localStorage.setItem("arrayBalance", JSON.stringify(array))
   
    generarBaseDatos(array)

     movimiento.value = ""
     creador.value = ""
     tipo.value = ""
     monto.value = ""
     fecha.value = ""

}



// let divBaseDatos = document.getElementById("baseDatos")
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
    
    let img = nuevoDato.querySelector(".iconoImg")

    if (nuevoDato.classList.contains('verde')){
    img.src="../img/icono_billete_verde.png"

    } else if (nuevoDato.classList.contains('rojo')){
        img.src= "../img/icono_billete_rojo.png"
        
    }


    divBaseDatos.appendChild(nuevoDato)
 }
}
 

// CAMBIO EL ICONO DEPENDIENDO EL TIPO DE MOVIMIENTO













// Con la funcion Reduce, calculo cantidad de Ingresos y Gastos
const totalTipo = arrayBalance.reduce((acum, val) => {
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
const totalMonto = arrayBalance.reduce((acum, val) => {
    if (val.movimiento === "ingreso") {
       acum.ingresos += val.monto
       
    } else if (val.movimiento === "gasto") {
        acum.gasto += val.monto
    }
    return acum
    }, {ingresos: 0, gasto: 0})

    

    document.getElementById("totalIngreso").innerHTML=totalMonto.ingresos
    document.getElementById("totalGasto").innerHTML=totalMonto.gasto
    let balance = totalMonto.ingresos -totalMonto.gasto

    document.getElementById("resultadoBalance").innerHTML= `Resultado: ${parseFloat(balance.toFixed(2))} $`


    



//Busco Boton Submit/cargar etc.
let guardarDatos = document.getElementById("guardarDatos")
//Le agrego el evento que va a realizar el boton
guardarDatos.addEventListener("click", ()=>{
    inputInformacion(arrayBalance)}
    )




    
//-------------------------ORDEN-----------------------------------------//

//ORDEN MONTO
//Busco Boton Ordenar Monto.
let OrdenarMonto = document.getElementById("ordenarMonto")
//Le agrego el evento que va a realizar el boton
OrdenarMonto.addEventListener("click", ()=>{
    ordenarArrayMonto(arrayBalance)}
    )

// Ordeno mi Array Por el monto y lo muestro en DOM
function ordenarArrayMonto(array){
    // Copio el original, []Aca recibe un array vacio y concatena/copia el array orig.
    const nuevoArrayBalance =[].concat(array)
    nuevoArrayBalance.sort((a,b) => a.monto - b.monto)
   console.log(nuevoArrayBalance)
    generarBaseDatos(nuevoArrayBalance)
}


//ORDEN TIPO MOVIMIENTO
let OrdenarTipo = document.getElementById("OrdenarTipo")
OrdenarTipo.addEventListener("click", ()=>{
    ordenarArrayTipo(arrayBalance)}
    )

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
    generarBaseDatos(nuevoArrayTipo)
 }


//Creo la function constructora con la que completo el array y creo objetos.

// function inputInformacion() {
//     // pido los datos
//     let movimiento = prompt("ingrese el tipo Movimiento")
//     let creador = prompt("ingrese el tipo Movimiento")
//     let tipo = prompt("ingrese el tipo Movimiento")
//     let monto = ParseInt(prompt("Ingrese el precio del libro"))
//     let subtipo = prompt("ingrese el tipo Movimiento")
   

//     // Creo el objeto
//     const dato = new cargaDatos (arrayDatos.length+1, movimiento, creador, tipo, subtipo, monto)
//     // Pusheo los datos en el array
//     arrayDatos.push(dato)
//     console.log(arrayDatos)
// }







// inputInformacion()




// let totalIngresos = 


// // Solicita el total de movimientos a Cargar
// function solicitaMovimientos (){
//    let qMovimientos = prompt("Ingrese la cantidad de movimientos que va a cargar")
//    // Controlo que cargo un numero
//    while(isNaN(qMovimientos)){
//     qMovimientos = prompt("Debe Ingresar un Numero, dato anterior Incorrecto. Ingrese la cantidad de movimientos a cargar.")
//    }
//    // Convierto la cadena de texto a Numero
//    return parseInt(qMovimientos)
// }
// function cargarMovimientos(cantidadDeMovimientos){
//     document.getElementById("resultadoIngreso").innerHTML=(`realizó ${cantidadDeMovimientos}  movimientos`)
//     console.log(`realizó ${cantidadDeMovimientos}  movimientos`)
//    for (let i = 0; i < cantidadDeMovimientos; i++){
//     ingresarTipoMov(i)
//    }
  
// }
   
// // LLamo a las funciones con el boton

// document.getElementById ("boton").onclick=function(){
//     let cantidadDeMovimientos =  solicitaMovimientos()
//     cargarMovimientos(cantidadDeMovimientos)}







// // // Preguntar Tipo de movimiento a realizar
// function ingresarTipoMov(i){ 
//     let salirMov = false
//     let n= i+1
//     do{    
//         let tipoMovimiento = parseInt(prompt(`Ingrese el tipo de movimiento N°: ${n} a realizar
//         1- Ingresos
//         2- Gastos
//         0- Salir`))
    
//             switch(tipoMovimiento){
//                 case 1: 
//                 movimientoIngreso()
//                 salirMov = true
//                 break
                
//                 case 2: 
//                 movimientoGasto()
//                 salirMov = true
//                 break
    
//                 case 0: 
//                 console.log("Muchas gracias!")
//                 salirMov = true
//                 break
    
//                 default:
//             console.log("Usted no ah seleccionado una opcion valida")
//             break
//             }
//         }while(!salirMov)
    
//     }
    


// // Subtipo de movimiento a cargar -  Ingreso
// function movimientoIngreso(){
//     let camping = 800
//     let cabaña = 1200
//     let carpa = 600
//     let salirIngreso = false
//     let qPersonas = parseInt(prompt(`Cantidad de personas que se van a hospedar`))
//     do{
//         var tenPer = 0.10
//         var fifPer = 0.15
//         var tenPerT = "10 %"
//         var fifPerT = "15%"

//         let tipoIngreso = parseInt(prompt(`Tipo de entrada
//         1 - Camping -> 800
//         2 - Cabaña -> 1200
//         3 - Carpa -> 600
//         0 - Menu Anterior`))
//             switch (tipoIngreso){
            
//                 // Si el valor de hospedaje es mayor a 10mil, le da un descuento del 15%
//                 case 1: 
//                 let precioFinal = camping * qPersonas
//                  if (precioFinal >=10000) {
//                     alert (`El precio es de ${precioFinal.toFixed(1)} $, pero Usted tiene un descuento del  ${fifPerT}`)
//                     let precioConDesc = precioFinal - ( precioFinal * fifPer)
//                     document.getElementById("descuentoText").innerHTML= `${fifPerT}`
//                     document.getElementById("resultadoValor").innerHTML=(`Precio Final  ${precioConDesc.toFixed(1)} $`)
//                 }
                 
//                     // Si el valor de hospedaje es mayor a 5mil, le da un descuento del 10%
//                     else if (precioFinal >=5000) {
//                         alert (`El precio es de ${precioFinal.toFixed(1)} $, pero Usted tiene un descuento del   ${tenPerT}`)
//                         let precioConDesc = precioFinal - ( precioFinal * tenPer)
//                         document.getElementById("descuentoText").innerHTML= `${tenPerT}`
//                          document.getElementById("resultadoValor").innerHTML= (`Precio Final  ${precioConDesc.toFixed(1)}`)
//                 }
//                         // Si el valor de hospedaje es menor a 5mil cobra la tarifa normal
//                         else { document.getElementById("resultadoValor").innerHTML= (`el precio final para abonar por ${qPersonas} personas es de ${precioFinal}`)}
//                         salirIngreso = true
//                 break
                



//                 case 2: 
//                 let precioFinal2 = cabaña * qPersonas
//                 if (precioFinal2 >=10000) {
//                     alert (`El precio es de ${precioFinal2.toFixed(1)} $, pero Usted tiene un descuento del  ${fifPerT}`)
//                     let precioConDesc = precioFinal2 - ( precioFinal2 * fifPer)
//                     document.getElementById("descuentoText").innerHTML= `${fifPerT}`
//                     document.getElementById("resultadoValor").innerHTML=(`Precio Final  ${precioConDesc.toFixed(1)} $`)
//                 }
                 

//                     else if (precioFinal2 >=5000) {
//                         alert (`El precio es de ${precioFinal2.toFixed(1)} $, pero Usted tiene un descuento del   ${tenPerT}`)
//                         let precioConDesc = precioFinal2 - ( precioFinal2 * tenPer)
//                         document.getElementById("descuentoText").innerHTML= `${tenPerT}`
//                          document.getElementById("resultadoValor").innerHTML= (`Precio Final  ${precioConDesc.toFixed(1)}`)
//                 }

//                         else { document.getElementById("resultadoValor").innerHTML= (`el precio final para abonar por ${qPersonas} personas es de ${precioFinal2}`)}
            
//                         salirIngreso = true
//                 break
                

//                 case 3: 
//                 let precioFinal3 = carpa * qPersonas
//                 if (precioFinal3 >=10000) {
//                     alert (`El precio es de ${precioFinal3.toFixed(1)} $, pero Usted tiene un descuento del  ${fifPerT}`)
//                     let precioConDesc = precioFinal3 - ( precioFinal3 * fifPer)
//                     document.getElementById("descuentoText").innerHTML= `${fifPerT}`
//                     document.getElementById("resultadoValor").innerHTML=(`Precio Final  ${precioConDesc.toFixed(1)} $`)
//                 }
                 

//                     else if (precioFinal3 >=5000) {
//                         alert (`El precio es de ${precioFinal3.toFixed(1)} $, pero Usted tiene un descuento del   ${tenPerT}`)
//                         let precioConDesc = precioFinal3 - ( precioFinal3 * tenPer)
//                         document.getElementById("descuentoText").innerHTML= `${tenPerT}`
//                          document.getElementById("resultadoValor").innerHTML= (`Precio Final  ${precioConDesc.toFixed(1)}`)
//                 }

//                         else { document.getElementById("resultadoValor").innerHTML= (`el precio final para abonar por ${qPersonas} personas es de ${precioFinal3}`)}
            
//                             salirIngreso = true
//                 break

//                 case 0: 
//                 ingresarTipoMov()
//                 salirIngreso = true

//                 default:
//                 console.log("Usted no ah seleccionado una opcion valida")
//                 break
//         }
//     } while(!salirIngreso)
// }


// // Subtipo de movimiento a cargar - Gasto
// function movimientoGasto(){
//     let salirIngreso = false
//     do{
//         let tipoGasto = parseInt(prompt(`Tipo de entrada
//         1 - Ferreteria
//         2 - Electricidad
//         3 - Gas
//         4 - Refacciones
//         0 - Menu anterior `))
      
//             switch (tipoGasto){     
//                 case 1: 
//                 let monto = parseInt(prompt(`Ingrese el gasto para Ferreteria`))
//                 console.log (`el precio final adeudado para ferreteria es de ${monto}`)
//                 salirIngreso = true
//                 break
                
//                 case 2: 
//                 let monto1 = parseInt(prompt(`Ingrese el gasto para Electricidad`))
//                 console.log (`el precio final adeudado para Electricidad es de ${monto1}`)
//                 salirIngreso = true
//                 break

//                 case 3: 
//                 let monto3 = parseInt(prompt(`Ingrese el gasto para gas`))
//                 console.log (`el precio final adeudado para gas es de ${monto3}`)
//                 salirIngreso = true
//                 break

//                 case 4: 
//                 let monto4 = parseInt(prompt(`Ingrese el gasto para Refacciones`))
//                 console.log (`el precio final adeudado para Refacciones es de ${monto4}`)
//                 break

//                 case 0:
//                 ingresarTipoMov()
//                 break

//                 salirIngreso = true
//                 break

//                 default:
//                 console.log("Usted no ah seleccionado una opcion valida")
//                 break
//         }

//     } while(!salirIngreso)
// }
