const url="http://localhost:3000/api/articulos"
let id=document.getElementById("cjaid")
const urlbusquedaunitaria='http://localhost:3000/api/articulos/'+id
 
const contenedor=document.querySelector('tbody')
let resultados=''



const modalarticulo=new bootstrap.Modal(document.getElementById('modalarticulo'))
const formarticulo=document.querySelector('form')
const descripcion=document.getElementById("descripcion")
const precio=document.getElementById("precio")
const stock=document.getElementById("stock")
let opcion=''

btncrear.addEventListener("click",()=>{
    descripcion.value=""
    precio.value=""
    stock.value=""
    modalarticulo.show()
    opcion="crear"

})

//funcion para mostrar articulos
const mostrar=(articulos)=>{
    articulos.forEach(articulo => {
        resultados+= `<tr>

            <td>${articulo.id}</td>
            <td>${articulo.descripcion}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.stock}</td>
            <td><a              
                id="editar"
                class="btn btn-primary"                
                role="button"
                >Editar</a
            ><a              
                id="eliminar"
                class="btn btn-danger"                
                role="button"
                >Eliminar</a
            >
            </td>
           
        </tr>`
    });
    contenedor.innerHTML=resultados
}

//procedimiento para mosrtar
fetch(url)
  .then(response=>response.json())
  .then(data=>mostrar(data))
  .catch(error=>console.log(error))




//metodo para crear
formarticulo.addEventListener('submit', (e) => {
    e.preventDefault();
    if (opcion === "crear") {
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value
            })
        })
        .then(response => response.json())
        .then(data => {
            const nuevoArticulo = [];
            nuevoArticulo.push(data);
            mostrar(nuevoArticulo);
        })
        .catch(error => console.error('Error:', error));  // Agregar manejo de error
    }

    modalarticulo.hide(); 
});
