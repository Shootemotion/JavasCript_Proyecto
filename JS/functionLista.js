// ARRAY CON DATOS PARA LISTAS
let tiposIngreso = ['Alquiler', 'Trabajo', 'Empresa'];
let tiposGasto = ['Impuestos', 'Gas', 'Luz'];



//formulario con listas con dependencia
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



// // Abrir el modal al hacer clic en un botón
// let btn = document.getElementById("myBtn");
// let modal = document.getElementById("myModal");
// let close = document.getElementsByClassName("close")[0];
// btn.onclick = function() {
//   modal.style.display = "block";
// }



// Guardar los datos en los arrays
document.getElementById('modalForm').addEventListener('click', function(event) {
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



