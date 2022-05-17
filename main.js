
//declarar lienzo
const canvas = document.getElementById('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

const ctx = canvas.getContext("2d")

//declarar prevX y prevY (posición previa del mouse)
let prevX = null
let prevY = null

//ancho de la linea
ctx.lineWidth = 4

//para q no dibuje solo
let draw = false

//tomar la clase .clr
let clrs = document.querySelectorAll('.clr')
//convertir a array
clrs = Array.from(clrs)

//cambiar el color de linea
clrs.forEach(clr => {
    clr.addEventListener('click', () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})


let clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click', () => {
    //limpiar el lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

//guardar dibujo
let saveBtn = document.querySelector('.save')
saveBtn.addEventListener('click', () => {
    let data = canvas.toDataURL('imag/png')
    let a = document.createElement('a')
    a.href = data

    a.download = 'dibujo.png'
    a.click()
})

//dibujar cuando MouseDown
window.addEventListener('mousedown', (e) => draw = true)
//dejar de dibujar cuando MouseUp
window.addEventListener('mouseup', (e) => draw = false)

//evento para saber la posición del mouse de usuario
window.addEventListener('mousemove', (e) => {

    //pos previa
    if(prevX == null || prevY == null || !draw){
        prevX = e.clientX
        prevY = e.clientY
        return
    }

    //pos actual
    let currentX = e.clientX
    let currentY = e.clientY

    //dibujar una linea desde la posición previa a la actual
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    //update pos previa
    prevX = currentX
    prevY = currentY

    //esta función toma la posición previa del mouse y dibuja una linea desde esa posición a la posición actual
})