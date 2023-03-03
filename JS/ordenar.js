
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

function ordenarArrayTipo(tablaSelectArray){
    // Copio el original, []Aca recibe un array vacio y concatena/copia el array orig.
    console.log(tablaSelectArray)
    const nuevoArrayTipo =[].concat(tablaSelectArray)

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



 const card = document.querySelector('.card');
card.addEventListener('click', () => {
  card.classList.add('click-effect');
  setTimeout(() => {
    card.classList.remove('click-effect');
  }, 0);
});
