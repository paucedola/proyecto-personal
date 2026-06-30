let nomenclador = [];
let valores = [];

window.addEventListener("DOMContentLoaded", () => {
  const inputNomenclador = document.getElementById("nomenclador");
  const inputValores = document.getElementById("valores");
  const btnBuscar = document.getElementById("btn-buscar");

  const inputCodigo = document.getElementById("codigo");
  const inputFecha = document.getElementById("fecha");
  const boxSugerencias = document.getElementById("sugerencias");

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
  // 🔎 AUTOCOMPLETADO CÓDIGO
  // ============================
  inputCodigo.addEventListener("input", () => {
    const texto = inputCodigo.value.trim().toLowerCase();

    if (texto === "") {
      boxSugerencias.innerHTML = "";
      return;
    }

    const filtrados = nomenclador.filter((p) =>
      String(p["Código"]).toLowerCase().includes(texto)
    );

    boxSugerencias.innerHTML = "";

    filtrados.slice(0, 5).forEach((p) => {
      const div = document.createElement("div");

      div.textContent = `${p["Código"]} - ${p["Descripción"]}`;

      div.addEventListener("click", () => {
        inputCodigo.value = p["Código"];
        boxSugerencias.innerHTML = "";
      });

      boxSugerencias.appendChild(div);
    });
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

    const codigo = inputCodigo.value.trim();
    const fechaValue = inputFecha.value;

    if (!fechaValue) {
      alert("Seleccioná una fecha.");
      return;
    }

    const fecha = new Date(fechaValue);

    const item = nomenclador.find(
      (d) => String(d["Código"]) === codigo
    );

    if (!item) {
      alert("Código no encontrado.");
      return;
    }

    // ============================
    // 🔎 buscar valor por código + vigencia
    // ============================
    const valorItem = valores.find((v) => {
      const desde = new Date(v["Desde"]);
      const hasta = new Date(v["Hasta"]);

      return (
        String(v["Código"]) === codigo &&
        desde <= fecha &&
        hasta >= fecha
      );
    });

    const valorBase = valorItem ? Number(valorItem["Valor"]) : 0;

    // ============================
    // MOSTRAR DATOS
    // ============================
    document.getElementById("descripcion").value =
      item["Descripción"];

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
    // 💰 CÁLCULO MONTO FINAL
    // ============================
    const ayudantes = Number(item["Cant. Ayu."]) || 0;
    const factorAyudante = 0.3;

    const montoFinal =
      valorBase + (ayudantes * valorBase * factorAyudante);

    // ============================
    // MOSTRAR MONTO
    // ============================
    document.getElementById("info-monto").textContent =
      montoFinal.toFixed(2);

    console.log("Práctica:", item);
    console.log("Valor base:", valorBase);
    console.log("Monto final:", montoFinal);
  });
});
