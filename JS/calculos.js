// --------------- CALCULOS ---------------------------------------------

function mostrarCalculos(param){

// Con la funcion Reduce, calculo cantidad de Ingresos y Gastos
const totalTipo = param.reduce((acum, val) => {
if (val.movimiento === "ingreso") {
    acum.ingreso++
} else if (val.movimiento === "gasto") {
    acum.gasto++
}
return acum
}, {ingreso: 0, gasto: 0})

const totalMonto = param.reduce((acum, val) => {
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

}



// CALCULADORA

let operator = null
let operand1 = null
let operand2 = null
let currentOperand = ''
let justAddedOperator = false

// Asigno los numeros al Operand1 y operand2. cuando voy agregando operadores, el operand1 va almacenando el resultado.
function addNumber(num) {
    let display = document.getElementById('display')
    
    if (operator === null) {
        if (display.value === '0' && num !== '.') {
            display.value = num
        } else {
            display.value += num
        }
        operand1 = display.value // asigno el valor a operand1
    } else {
        if (justAddedOperator) {
            display.value = num
            justAddedOperator = false
        } else {
            display.value += num
        }
        operand2 = display.value // asigno el valor a operand2
    }
}

// Agrego el operador matematico
function addOperator(op) {
  let display = document.getElementById('display')

  if (operand1 === null) {
    operand1 = display.value

  } else if (operand2 !== null) {
      operand2 = display.value

    let result = eval(operand1 + operator + operand2)
    display.value = result
    operand1 = result
    operand2 = null

  }

  operator = op
  justAddedOperator = true
}


function addDecimal() {
  let display = document.getElementById('display')
  if (!display.value.includes('.')) {
    display.value += '.'
  }
}


// Con el igual, uso las tres variables para sacar las cuentas
function calculate() {
  let display = document.getElementById('display')
  if (operand1 !== null && operator !== null && operand2 !== null) {

    console.log(operand1)
    console.log(operand2)
    console.log(operator)

    // Este eval, toma una cadena string  y evalua como codigo de javascript, ver como lo puedo reemplazar. 
    let result = eval(operand1 + operator + operand2)
    display.value = result
    operand1 = result
    operand2 = null
  }
}

// Limpiar Screen
function clearDisplay() {
  let display = document.getElementById('display')
  operator = null
  operand1 = null
  operand2 = null
  currentOperand = 1
  display.value = '0'
}