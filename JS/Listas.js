//---- FORMULARIO CON LISTAS DEPENDIENTES -----  
document.getElementById("tipoMovimientoAdd").addEventListener("change", listaDependiente);

function listaDependiente () {
  let options = "";
  
  if (tipoMovimientoAdd.value == "") {
    tipoAdd.disabled = true;
  }
  else if (tipoMovimientoAdd.value == "ingreso") {
    for (let i = 0; i < tiposIngreso.length; i++) {
      options += "<option value='" + tiposIngreso[i] + "'>" + tiposIngreso[i] + "</option>";
    }
    tipoAdd.innerHTML = options;
    tipoAdd.disabled = false;
  }
  else if (tipoMovimientoAdd.value == "gasto") {
    for (let i = 0; i < tiposGasto.length; i++) {
      options += "<option value='" + tiposGasto[i] + "'>" + tiposGasto[i] + "</option>";
    }
    tipoAdd.innerHTML = options;
    tipoAdd.disabled = false;
  }

  tipoAdd.addEventListener("change", function() {
    if (this.value == "nueva subcategoria") {
      // Llamar al modal "Agregar subcategoria"

     
      modalAgregarSubcategoria.show();
    }
  }); 
}

// ARRAY CON DATOS PARA LISTAS
let tiposIngreso = ['Select', 'nueva subcategoria', 'Alquiler', 'Trabajo', 'Empresa'];
let tiposGasto = ['Select', 'nueva subcategoria', 'Impuestos', 'Gas', 'Luz'];


// guardo nuevos datos en el array de listas
guardarcSubCatBtn.addEventListener('click', function(event) {
  event.preventDefault();
  let descripcion = document.getElementById("descripcion").value;

  if (tipoMovimientoAdd.value == "ingreso") {
    tiposIngreso.push(descripcion);
  } 
  else if (tipoMovimientoAdd.value == "gasto") {
    tiposGasto.push(descripcion);
  }
  
  listaDependiente()

  modalAgregarSubcategoria.hide();
  console.log(tiposIngreso, tiposGasto);
});
