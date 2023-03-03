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

// let arrayEnLS 
// // STORAGE, Reviso si esta vacio
// if(localStorage.getItem("arrayBalance")) {
//     arrayDatos.push(dato1, dato2, dato3,dato4,dato5)
//     arrayEnLS = JSON.parse(localStorage.getItem("arrayBalance"))

  
// } else {
//     localStorage.setItem("arrayBalance", JSON.stringify(arrayDatos))    
// }
// console.log(arrayDatos)

