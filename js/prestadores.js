let data = [];

// 1. TRAER DATOS
fetch("../data/prestadores.json")
  .then((res) => res.json())
  .then((info) => {
    data = info;

    // 🔵 ORDEN A-Z
    data.sort((a, b) => a.nombre.localeCompare(b.nombre));

    render(data);
  });

// 2. RENDER
function render(lista) {
  const contenedor = document.querySelector(".contenedor-prestadores ul");

  // 🔴 SI NO HAY RESULTADOS
  if (lista.length === 0) {
    contenedor.innerHTML = "<li>No se encontraron resultados</li>";
    return;
  }

  let html = "";

  lista.forEach((p) => {
    html += `
      <li>
        <a class="card-link" href="${p.link}">
          ${p.nombre}
        </a>
      </li>
    `;
  });

  contenedor.innerHTML = html;
}

// 3. BUSCADOR
const input = document.getElementById("buscar-prestador");

input.addEventListener("input", (e) => {
  const valor = e.target.value.toLowerCase();

  const filtrados = data.filter((p) => p.nombre.toLowerCase().includes(valor));

  render(filtrados);
});
