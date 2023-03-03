// Capturas en DOM
let formCarga = document.getElementById("formCarga")
let guardarcSubCatBtn = document.getElementById("guardarcSubCatBtn")
let guardarDatos = document.getElementById("guardarDatos")
let ideliminarDatos = document.getElementById("ideliminarDatos")
let eliminarBtn2 = document.getElementById("eliminarBtn2")
let agregarDatos = document.getElementById("agregarDatos")
let cardsTotales = document.getElementById("cardsTotales")
let elementosLista = document.getElementById("elementosLista");
let verTablas = document.getElementById("verTablas")
let guardarTabla = document.getElementById("guardarTabla")
let titlebaseDatos = document.getElementById("titlebaseDatos")
let nombreTablaInput = document.getElementById("tablaNombre")
let tituloBaseDatos = false
let tipoMovimientoAdd = document.getElementById("tipoMovimientoAdd")
let selectTabla  = document.getElementById("selectTabla")
let seleccionarTabla = document.getElementById("seleccionarTabla")
let tipoAdd = document.getElementById("tipoAdd");
let nombreTablaSeleccionada = document.getElementById('nombreTablaSeleccionada')
let modalAgregarSubcategoria = new bootstrap.Modal(document.getElementById
    ("idModalAgregarSubcategoria"))
let modalAgregarDatos = new bootstrap.Modal(document.getElementById ("idModalAgregarDatos"))
let tablaSelectName =''
let tablaSelectArray =''



//------------------------------FUNCIONES-------------------------------------------
// ALIMENTAR ARRAY DE TABLAS

function inputNuevoArray() {

    let nombreTabla = nombreTablaInput.value
    let nuevaTabla = [] // Crear un array vacío

    if(localStorage.getItem("arrayBases")) {
        arrayBases = JSON.parse(localStorage.getItem("arrayBases"))
        arrayBases.push({ [nombreTabla]: nuevaTabla }); // Agregar el array nuevaTabla como valor del objeto que se insertará en arrayBases
        console.log(arrayBases);
        localStorage.setItem("arrayBases", JSON.stringify(arrayBases));

    } else {
        arrayBases.push({ [nombreTabla]: nuevaTabla }); // Agregar el array nuevaTabla como valor del objeto que se insertará en arrayBases
        console.log(arrayBases);
        localStorage.setItem("arrayBases", JSON.stringify(arrayBases));
    }

    
    Swal.fire({
        title: "La Nueva Area a sido Creada",
        icon: "success",
        text: "Ahora a cargar Datos!",
        customClass: {
            text: "font-weight-bold text-green-500",
            color: "#545454"
        }

    })
    tablaSelectName= nombreTabla
    console.log(tablaSelectName)
    console.log(nombreTabla)
    }

function verificarStorage(tablaSelectName, param) {   

   // Verifica si hay datos en localStorage con la clave tablaSelectName
   if (localStorage.getItem(tablaSelectName) !== null) {
    // Carga los datos desde localStorage y los convierte a un objeto JavaScript
    const data = JSON.parse(localStorage.getItem(tablaSelectName))
    // Verifica si el array 'param' está vacío
    if (param.length === 0) {
      // Si 'param' está vacío, simplemente asigna los datos cargados desde localStorage
      param.push(...data)
    } else {
      // Si 'param' no está vacío, busca los registros que no existan en 'param' y los agrega
      data.forEach(item => {
        const index = param.findIndex(elem => elem.id === item.id)
        if (index === -1) {
          param.push(item)
        }
      })
    }
  }
}


// ALIMENTAR OBJETOS EN ARRAY

//Creo el evento que forma la funcion constructora con la que completo el array

function inputInformacion(param) {

    // pido los datos

    let movimiento = document.getElementById("tipoMovimientoAdd")
    let creador = document.getElementById("creadorAdd")
    let tipo = document.getElementById("tipoAdd")
    let monto = document.getElementById("montoAdd")
    let fecha = document.getElementById("fechaAdd")

    
    // Verifica storage
    verificarStorage(tablaSelectName,param)

    // Verifica si alguna de las variables está vacía
    if (!movimiento.value || !creador.value || !tipo.value || !monto.value || !fecha.value) {
        Swal.fire({
            icon: 'error',
            text: "Debe completar todos los campos" 
        })
        return
    }


    // Creo el objeto
    const nuevaEntrada = new cargaDatos (param.length+1, movimiento.value, creador.value, parseInt(monto.value), tipo.value, fecha.value)
    console.log(param)
    // Pusheo los datos en el array
    param.push(nuevaEntrada);
    // agrego al Storage
    localStorage.setItem(tablaSelectName, JSON.stringify(param))
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
      console.log(param)
      generarBaseDatos(param)
     mostrarCalculos(param)
}






// MUESTRO LA BASE DE DATOS EN EL DOM
function generarBaseDatos (arrayEnUso, usoLocalStorage = true){
    let arraySeleccionado
    // tablaSelectArray = arrayBases.find(tabla => tabla[tablaSelectName] !== undefined)
    switch (usoLocalStorage) {
        case false:
            arraySeleccionado = arrayEnUso;
            break
        case true:
        //  STORAGE, Reviso si esta vacio
            if(localStorage.getItem(tablaSelectName) !== null) {
                arrayEnUso = JSON.parse(localStorage.getItem(tablaSelectName));
                } else {
                // Si no hay datos en localStorage con la clave tablaSelectName, arrayEnUso mantendrá su valor original
                }
            break
        default:
            arraySeleccionado = arrayEnUso;
            break
        }
      
    let divBaseDatos = document.getElementById("baseDatos")
       //vaciar Div
       divBaseDatos.innerHTML = ""

       if (!tituloBaseDatos) {
        titlebaseDatos.innerHTML = `       
        <div  class=" text-center celda1">
        <p></p>
  </div>
      <div  class=" text-center celda">
          <p>TIPO</p>
      </div>
      <div  class=" text-center celda">
          <p>SUBTIPO</p>
      </div>
      <div  class=" text-center celda">
          <p>FECHA</p>
      </div>
      <div  class="text-center celda">
          <p>CREADOR</p>
      </div>
      <div  class="text-center celda">
          <p>MONTO</p>
      </div>`
       }
       tituloBaseDatos =true


  // Dependiendo del tipo de mov, le agrego una clase con Colores a cada DiV
    for (let dato of arrayEnUso){

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
      
             <h4>${dato.fecha}</h4>
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
mostrarCalculos(arrayEnUso)
}




// BOTON PARA REFRESCAR LISTAS Y VISUALIZAR EN EL MODAL
function refrescarLista(){
if(localStorage.getItem("arrayBases")) {
arrayBases = JSON.parse(localStorage.getItem("arrayBases"))
selectTabla.innerHTML=''
// Iterar sobre los elementos de arrayBases
for (let i = 0; i < arrayBases.length; i++) {
    // Obtener el nombre de la tabla
    let nombreTabla = Object.keys(arrayBases[i])[0]
  
    // Crear el option y establecer su value y text
    let option = document.createElement("option")
    option.value = nombreTabla
    option.text = nombreTabla
    // Agregar el option al select
      // Agregar el option al select
      selectTabla.add(option)
    }
    let modal = new bootstrap.Modal(document.getElementById("idModalVerTablas"));
    modal.show();
    // Abrir el modal solo si hay elementos en el localStorage
    $("#idModalVerTablas").modal("show")
  } else {
    Swal.fire({
      icon: "warning",
      title: "No hay Areas disponibles",
      text: "Debe Crear una nueva area de trabajo antes de continuar",
    });
  }
}

// FUNCIONES PARA ELIMINAR OBJETOS DEL ARRAY/DOM

// BUSCO EL OBJETO Y LO BORRO CON SPLICE
function eliminarElementoArray(array, elemento) {
    const index = array.indexOf(elemento);
    if (index !== -1) {
      array.splice(index, 1)
    }
    localStorage.setItem(tablaSelectName, JSON.stringify(array))
  }
  


  // MUESTRO EL MODAL ELIMINAR
  function mostrarModalEliminar(array) {
    let modalElement = document.getElementById("eliminarDatos")
    let modal = new bootstrap.Modal(modalElement)
    // Verificar storage
    verificarStorage(tablaSelectName, array)
  
    // vaciar la lista antes de agregar los elementos del array
    elementosLista.innerHTML = ""

    // agregar los elementos del array a la lista
    array.forEach((elemento) => {
      const li = document.createElement("li");
      li.innerText = `${elemento.movimiento} ${elemento.creador} ${elemento.tipo} ${elemento.monto} ${elemento.fecha}`;
  
      // agregar un botón de eliminar junto a cada elemento de la lista
      const eliminarBtn = document.createElement("button");
      eliminarBtn.classList.add("btn", "btn-sm", "btn-danger", "ms-2" );
      
      eliminarBtn.innerText = "Eliminar";
      eliminarBtn.addEventListener("click", () => {
        // llamar a la función para eliminar el elemento del array
        eliminarElementoArray(array, elemento);
        // volver a mostrar la lista de elementos sin el elemento eliminado
        modal.hide()
        Swal.fire({
            icon: 'success',
            text: "Elemento eliminado" 
        })
        mostrarModalEliminar(array)
        

      })
  
      li.appendChild(eliminarBtn)
      elementosLista.appendChild(li)
    })
  }


//   ELIGO EL AREA A TRABAJAR Y MUESTRO LOS BOTONES "AGREGAR" Y LAS CARD CON TOTALES.

function definoTablaTrabajo (param) {
// ternario, si esta funcion es llamada por el btn "guardarDatos", este le indica el param. Pero si esta funcion es llamada por seleccionarTabla btn, usaria el option.value del dom
tablaSelectName = param ? param : selectTabla.value;


// Pongo el nombre de la tabla en el h1
nombreTablaSeleccionada.textContent = tablaSelectName
tablaSelectArray = arrayBases.find(tabla => tabla[tablaSelectName] !== undefined)[tablaSelectName] || [] //Encuentro la tabla





// CARGO EN EL DOM LOS DATOS
generarBaseDatos(tablaSelectArray)
agregarDatos.classList.remove("d-none");
ideliminarDatos.classList.remove("d-none");
cardsTotales.classList.remove("d-none");
}

// SINO TENGO NINGUNA TABLA SELECCIONADA, ENVIO UN ALERT
function verificoSeleccion () {
    if (tablaSelectName) {
        
    }else {
        modalAgregarDatos.hide()
        Swal.fire({
            icon: 'error',
            text: "Debe Seleccionar una tabla" 
        })
    }
}

//------------------BOTONES CON SUS EVENTOS---------------

// GUARDAR OBJETO EN ARRAY
guardarDatos.addEventListener("click", ()=>{
    if (!tablaSelectName) {
        alert('Por favor, seleccione una tabla');
        return;
    }
    tablaSelectArray = arrayBases.find(tabla => tabla[tablaSelectName] !== undefined)[tablaSelectName] || [] //Encuentro la tabla
    inputInformacion(tablaSelectArray)}
    )



// GUARDAR OBJETO NUEVA TABLA/AREA DE TRABAJO y SELECCIONO 
guardarTabla.addEventListener("click", ()=>{
    inputNuevoArray()
    definoTablaTrabajo(tablaSelectName)
    })


verTablas.addEventListener("click", ()=>{
    if (localStorage.getItem("arrayBases")) {
        refrescarLista();
      } else {
        Swal.fire({
          icon: "warning",
          title: "No hay Areas disponibles",
          text: "Debe Crear una nueva area de trabajo antes de continuar",
        });
      }
    });

agregarDatos.addEventListener("click", ()=>{
    verificoSeleccion()}
)

seleccionarTabla.addEventListener("click", () => {
    definoTablaTrabajo()
    verificarStorage()
    }
    )

eliminarDatos.addEventListener("click", () => {
    mostrarModalEliminar(tablaSelectArray)
  
    }
    )
   


      eliminarBtn2.addEventListener("click", () => {
        cerrarModal();
      })

      function cerrarModal() {    
    let eliminarBtn2 = document.getElementById("eliminarBtn2")
      let modal = new bootstrap.Modal(eliminarBtn2)
      modal.hide()
      }

