const API_URL = 'https://pokeapi.co/api/v2/pokemon/' //aqui se busca el pokemon
const IMG_PATH = `https://pokeapi.co/api/v2/pokemon-form/`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

const getPokemones = (url) => {
    const peticion = fetch(url)
    peticion.then(resp => resp.json())
    .then(data => showPokemones(data.results))
    .catch(error => 
        swal.fire({
            title: 'Hubo un error en el servidor1',
            text: 'Intente mas tarde',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          }))
}

//otra forma
//const getMovies2 = async(url) => {
 //   const resp = await fetch(url)
 //   const data = await resp.json()
 //  console.log(data.results);
//}   )
getPokemones(API_URL)




const showPokemones = (pokemones) => {
    
    if (pokemones.length == 0){
        swal.fire({
            title: 'Pokemon no encontrado',
            text: 'Intenta otra busqueda',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          })
    }
    else{ //evitar que se caerguen las tarjetas 
    main.innerHTML = ''
    console.log(pokemones)
    pokemones.forEach(pokemon => {
        let ide = 0
        const id = ide + 1
        const {name} = pokemon
        const getImagen = (url) => { //obtengo arvhico de la imagen
            const peticion = fetch(url)
            peticion.then(resp => resp.json())
            .then(data => showImagen(data))
            .catch(/*error => 
                swal.fire({
                    title: 'Hubo un error en el servidor2',
                    text: 'Intente mas tarde',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })*/)
        }
        getImagen(IMG_PATH + id + "/")
        
        const getAbility = (url) => { //obtengo arvhico de la imagen
            const peticion = fetch(url)
            peticion.then(resp => resp.json())
            .then(data => showHabilidad(data))
            .catch(/*error => 
                swal.fire({
                    title: 'Hubo un error en el servidor2',
                    text: 'Intente mas tarde',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                })*/)
        }
        getAbility(API_URL + id + "/")

        const showHabilidad = (Habilidad) => {
               //const ability = Habilidad.ability.
               console.log(Habilidad)
               const weight = Habilidad.weight
               const base_experience = Habilidad.base_experience
               const abilities = Habilidad.0.abilities.ability.name
                console.log(abilities)
        }
        const showImagen = (foto) => {
            const fotoFrente = foto.sprites.front_default
            return fotoFrente
            }

            
        console.log(fotoFrente)
        console.log(name)
        const divPokemon = document.createElement('div')
        divPokemon.classList.add('pokemon') //aqui le agregamos la clase al div anterior
        divPokemon.innerHTML = `
        <img src="${fotoFrente}" alt="">
        <div class="pokemon-info">
            <h3>${name}</h3>
            <span class="green">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(divPokemon)
    })
    }

form.addEventListener('submit', e => {
    e.preventDefault()//evita que se recargue la pagina al enviar el formulairio
    const searchTerm = search.value
    if (searchTerm && searchTerm !== ''){
        getPokemones(SEARCH_URL + searchTerm)
        search.value = ""
    }else{
        window.location.reload()
    }
})}
