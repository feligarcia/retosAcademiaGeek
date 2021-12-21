let formulario = document.getElementById('formulario')
let citas = JSON.parse(localStorage.getItem('citas')) || []
let listarCita = document.getElementById('listarCita')
let buscar = document.getElementById('btnBuscar')
let busqueda = document.getElementById('busqueda')


const capturarDatos = () => {
    let nombre = document.getElementById('nombre').value
    let fecha = document.getElementById('fecha').value
    let hora = document.getElementById('hora').value
    let sintomas = document.getElementById('sintomas').value

    let registro = { //aqui toma el nombre de la variable directamente, si queremos otro nombre ponemos nombrecompleto: nombre;
        nombre,
        fecha,
        hora,
        sintomas
    }
    citas.unshift(registro) // unshift se agrega al inicio, push al final
    localStorage.setItem('citas',JSON.stringify(citas))
    getLocalStorage()
    
}
formulario.addEventListener('submit', e => {
    e.preventDefault()
    capturarDatos()
    e.target.reset() //cuando envie el formulario se borran los inputs
})

const getLocalStorage = () => {
    listarCita.innerHTML = ''
 let citasLocalStorage = JSON.parse(localStorage.getItem('citas'))
 citasLocalStorage?.map(cita => { // ? se usa para decir--> si no existe o null pues no lo haga
     const {nombre, fecha, hora, sintomas} = cita
     //abajo se usa + para agregar a lo que ya hay
     listarCita.innerHTML += ` 
     
        <tr>
            <td>${nombre}<td>
            <td>${fecha}<td>
            <td>${hora}<td>
            <td>${sintomas}<td>
        </tr>
    
     `
 })
}
buscar.addEventListener('click', e=> {
    e.preventDefault()
    let input = document.getElementById('inputBuscar').value
    let data = JSON.parse(localStorage.getItem('citas'))
    let filtro = data.filter(cita => cita.nombre.toLowerCase() === input.toLowerCase())
    busqueda.innerHTML = ''
    
    let cont = 1
    filtro.length === 0
        ?
        busqueda.innerHTML += `<div class="alertaBusqueda">La persona ${input} no tiene citas o no existe</div>`
        :
        filtro.map(cita => {
            
            let btnCont = 'btnCont' + cont
            const {nombre,fecha,hora,sintomas} = cita
        busqueda.innerHTML += `
        <div class="divBusqueda">${nombre}</div>
        <div class="divBusqueda">${fecha}</div>
        <div class="divBusqueda">${hora}</div>
        <div class="divBusqueda">${sintomas}</div>
            <button id="${btnCont}">Borrar</button></div>
            <br>
        `
        cont = cont + 1 
        //borrar datos con el boton borrar
        let borrar = document.getElementById(`${btnCont}`)
        console.log(filtro)
        console.log('aquivamos')
        console.log(`${nombre}`)
        
        let t = 0
        borrar.addEventListener('click', e=> {
            
            data.forEach(function(data, index, object) {
                if(data.nombre === `${nombre}` && t==0){
                  object.splice(index, 1);
                  t=t+1
                }
                
            });
            console.log('afuera')
       // console.log(object)
            console.log(data)
            localStorage.setItem('citas',JSON.stringify(data))
            getLocalStorage()
            t=0
        })
        
    })
})
//limpiar datos de la agenda
let btnLimpiar = document.getElementById('btnLimpiar')
btnLimpiar.addEventListener('click', e => {
    localStorage.removeItem('citas',JSON.stringify(citas))
    listarCita.innerHTML = ''
    e.preventDefault()
})


document.addEventListener('DOMContentLoaded',getLocalStorage)

