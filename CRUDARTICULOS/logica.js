const url = "http://localhost:3001/api/articulos";
const contenedor = document.querySelector('tbody');
const modalarticulo = new bootstrap.Modal(document.getElementById('modalarticulo'));
const formarticulo = document.querySelector('form');
const descripcion = document.getElementById("descripcion");
const precio = document.getElementById("precio");
const stock = document.getElementById("stock");
let opcion = '';

document.getElementById("btncrear").addEventListener("click", () => {
    descripcion.value = "";
    precio.value = "";
    stock.value = "";
    modalarticulo.show();
    opcion = "crear";
});

// Función para mostrar artículos
const mostrar = (articulos) => {
    let resultados = '';
    articulos.forEach(articulo => {
        resultados += `<tr>
            <td>${articulo.id}</td>
            <td>${articulo.descripcion}</td>
            <td>${articulo.precio}</td>
            <td>${articulo.stock}</td>
            <td>
                <a id="editar" class="btn btn-primary" role="button">Editar</a>
                <a id="eliminar" class="btn btn-danger" role="button">Eliminar</a>
            </td>
        </tr>`;
    });
    contenedor.innerHTML = resultados;
};

// Mostrar artículos
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));

// Método para crear artículo
formarticulo.addEventListener('submit', (e) => {
    e.preventDefault();
    if (opcion == "crear") {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value
            })
        })
        .then(response => response.json())
        .then(data => {
            mostrar([data]);
        })
        .catch(error => console.log(error));
    }
    modalarticulo.hide();
});
