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
                <a id="eliminar" class="btn btn-danger" role="button" data-id="${articulo.id}">Eliminar</a>
            </td>
        </tr>`;
    });
    contenedor.innerHTML = resultados;
};

// Mostrar artículos al cargar
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
            formarticulo.reset();
        })
        .catch(error => console.log(error));
    }
    modalarticulo.hide();
});

// Event listener para el botón eliminar
contenedor.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'eliminar') {
        const id = e.target.getAttribute('data-id');
        
        // Confirmación de eliminación
        const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este artículo?");
        if (confirmDelete) {
            fetch(`${url}/${id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(() => {
                // Refrescar la lista de artículos después de la eliminación
                fetch(url)
                    .then(response => response.json())
                    .then(data => mostrar(data))
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        }
    }
});
