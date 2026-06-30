let nomenclador = [];
let valores = [];

window.addEventListener("DOMContentLoaded", () => {
  const inputNomenclador = document.getElementById("nomenclador");
  const inputValores = document.getElementById("valores");
  const btnBuscar = document.getElementById("btn-buscar");

  // ============================
  // FUNCIÓN PARA LEER UN EXCEL
  // ============================
  function cargarExcel(input, callback) {
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, { type: "array" });

        const hoja = workbook.Sheets[workbook.SheetNames[0]];

        callback(XLSX.utils.sheet_to_json(hoja));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  // ============================
  // CARGAR NOMENCLADOR
  // ============================
  cargarExcel(inputNomenclador, (datos) => {
    nomenclador = datos;
    console.log("Nomenclador:", nomenclador);
  });

  // ============================
  // CARGAR VALORES
  // ============================
  cargarExcel(inputValores, (datos) => {
    valores = datos;
    console.log("Valores:", valores);
  });

  // ============================
  // BUSCAR PRESTACIÓN
  // ============================
  btnBuscar.addEventListener("click", () => {
  if (nomenclador.length === 0) {
    alert("Primero cargá el nomenclador.");
    return;
  }

  if (valores.length === 0) {
    alert("Primero cargá la tabla de valores.");
    return;
  }

  const codigo = document.getElementById("codigo").value.trim();

  const item = nomenclador.find(
    (d) => String(d["Código"]) === codigo
  );

  if (!item) {
    alert("Código no encontrado.");
    return;
  }

  // 🔎 buscar valor asociado
  const valorItem = valores.find(
    (v) => String(v["Código"]) === codigo
  );

  const valor = valorItem ? valorItem["Valor"] : "Sin valor";

  // ============================
  // INPUT DESCRIPCIÓN
  // ============================
  document.getElementById("descripcion").value =
    item["Descripción"];

  // ============================
  // PANEL INFO
  // ============================
  document.getElementById("info-descripcion").textContent =
    item["Descripción"];

  document.getElementById("info-forma").textContent =
    item["Forma Fact."];

  document.getElementById("info-pedido").textContent =
    item["Pedido."];

  document.getElementById("info-informe").textContent =
    item["Informe."];

  document.getElementById("info-cantidad").textContent =
    item["Cant. Ayu."];

  // ============================
  // NUEVO: VALOR DE LA PRÁCTICA
  // ============================
  console.log("Valor encontrado:", valor);

  // (opcional: mostrarlo en pantalla)
  if (!document.getElementById("info-valor")) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>Valor:</strong> <span id="info-valor"></span>`;
    document.querySelector(".info-practica").appendChild(p);
  }

  document.getElementById("info-valor").textContent = valor;
});
    // ============================
    // DEBUG
    // ============================
    console.log("Práctica encontrada:", item);
    console.log("Valores cargados:", valores);
  });
});
