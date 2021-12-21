let usuarios = JSON.parse(localStorage.getItem('usuario')) || []
const ingreso = document.getElementById('btnIngreso')
const crearCuenta = document.getElementById('refcrearCuenta')

//verificar usuarios y dar ingreso

ingreso.addEventListener('click', e=> {
    e.preventDefault()
    let user = document.getElementById('email').value
    let password = document.getElementById('password').value
    let filtroUser = usuarios.filter(e => e.email.toLowerCase() === user.toLowerCase())
    let filtroPass= usuarios.filter(i => i.password === password)

    if((filtroUser.length == 0) || (filtroPass.length == 0)){
        let Mensaje = document.getElementById('Mensaje')
        Mensaje.innerText = 'Usuario o contrasena incorrectas'
        
    }else{
        console.log('Verificacion de ingreso')
        console.log()
        console.log(user)
        console.log(filtroPass)
        console.log(password)
        filtroUser.forEach(usua => {
            if(usua.email === user && usua.password === password){
                function abro(url){
                    let abrir = window.open(url, "_blank")
                } 
                abro('citas.html')
            }else{
                Mensaje.innerText = 'Usuario o contrasena incorrectas'}
        })           
        
        }
})
 



// crear usuarios y llevar a login

crearCuenta.addEventListener('click', e=> {
    console.log('probando')
    e.preventDefault()
    let Registro = document.getElementById('formRegistro')
    ingreso.innerText = "Crear cuenta"
    ingreso.value = 'btnCrear'
    Registro.reset()
    Mensaje.innerText = ''
})

    ingreso.addEventListener('click', e =>{
        
    if (ingreso.value == 'btnCrear'){
        e.preventDefault()
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value
        let usuario = { 
            email,
            password,
        }
        usuarios.unshift(usuario)
        localStorage.setItem('usuario',JSON.stringify(usuarios))
        ingreso.value = 'btnIngreso'
        ingreso.innerText = "Ingresar"
        let Mensaje = document.getElementById('Mensaje')
        Mensaje.innerText = 'Usuario creado satisfactoriamente'
        Mensaje.setAttribute('class',"green")
}})

    

//document.addEventListener('DOMContentLoaded', usuarios)