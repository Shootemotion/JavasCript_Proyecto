// FILTRAR CON LAS CARDS
const divGasto = document.getElementById("cardIngreso");
const divIngreso = document.getElementById("cardGasto");
const cardBalance = document.getElementById("cardBalance");

// Agregar evento de click al div

divIngreso.addEventListener("click", () => {
    buscador.value = "ingreso"
    // Llamar a la función buscarInfo
    buscarInfo(buscador.value.toLowerCase(), tablaSelectArray);

  })

  divGasto.addEventListener("click", () => {
    buscador.value = "gasto"
   
    buscarInfo(buscador.value.toLowerCase(), tablaSelectArray);
  })
  
  cardBalance.addEventListener("click", () => {
    buscador.value = ""
   
    buscarInfo(buscador.value.toLowerCase(), tablaSelectArray);
  })




// FILTRAR CON EL BUSCADOR DEL NAV

buscador.addEventListener("input", ()=>{
 
    buscarInfo(buscador.value.toLowerCase(), tablaSelectArray)
})

function buscarInfo(buscado,array) {
    if(localStorage.getItem(tablaSelectName) !== null) {
    array = JSON.parse(localStorage.getItem(tablaSelectName))
        } else {
        // Si no hay datos en localStorage con la clave tablaSelectName, array mantendrá su valor original
        }
console.log(array)
    // Verifica si hay datos en localStorage con la clave tablaSelectName 
    if (!Array.isArray(array)) {
        console.error("No es un Array.");
        return;
    }
 
    let busquedaArray = array.filter(elem => {

        return elem.movimiento.toLowerCase().includes(buscado.toLowerCase()) || elem.tipo.toLowerCase().includes(buscado.toLowerCase())
})

console.log(busquedaArray)
    
    busquedaArray.length == 0 ?
        (coincidencia.innerHTML = `<h3>No hay coincidencias con su búsqueda</h3>`, generarBaseDatos(busquedaArray,false)) 
        :
        (coincidencia.innerHTML = "", generarBaseDatos(busquedaArray, false));
}




