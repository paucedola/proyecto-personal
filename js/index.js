fetch("./data/productos.json")
  .then(res => res.json())
  .then(productos => {
    renderizarProductos(productos);
  });

function renderizarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");

  productos.forEach(producto => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="./img/${producto.imagen}" alt="${producto.nombre}">
        <h2>${producto.nombre}</h2>
        <p>$${producto.precio}</p>
      </div>
    `;
  });
}
