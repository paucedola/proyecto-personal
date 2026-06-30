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

        const workbook = XLSX.read(data, {
          type: "array",
        });

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

    // IMPORTANTE:
    // Acá usamos el nombre REAL de la columna del Excel
    const item = nomenclador.find(
      (d) => String(d["Código"]) === codigo
    );

    if (!item) {
      alert("Código no encontrado.");
      return;
    }

    // Mostrar descripción
    document.getElementById("descripcion").value =
      item["Descripción"];

    console.log("Práctica encontrada:", item);
    console.log("Valores cargados:", valores);

    // Las multiplicaciones las hacemos en el siguiente paso.
  });
});
