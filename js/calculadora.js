let datos = [];

window.addEventListener("DOMContentLoaded", () => {
  // Elementos del HTML
  const inputFile = document.getElementById("facturacion");
  const btnBuscar = document.getElementById("btn-buscar");

  // ============================
  // CARGAR EXCEL
  // ============================
  inputFile.addEventListener("change", (e) => {
    const file = e.target.files[0];

    // Si el usuario cancela la selección
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);

      const workbook = XLSX.read(data, {
        type: "array",
      });

      const hoja = workbook.Sheets[workbook.SheetNames[0]];

      datos = XLSX.utils.sheet_to_json(hoja);

      console.log("Excel cargado:", datos);
    };

    reader.readAsArrayBuffer(file);
  });

  // ============================
  // BUSCAR PRESTACIÓN
  // ============================
  btnBuscar.addEventListener("click", () => {
    // Verifica que se haya cargado un Excel
    if (datos.length === 0) {
      alert("Primero cargá un archivo Excel.");
      return;
    }

    const codigo = document.getElementById("codigo").value.trim();

    const item = datos.find(
      (d) => String(d.codigo) === codigo
    );

    if (!item) {
      alert("Código no encontrado.");
      return;
    }

    // Completa los datos
    document.getElementById("descripcion").value = item.descripcion;

    document.getElementById("honorario-a").textContent = item.honorarioA;
    document.getElementById("honorario-b").textContent = item.honorarioB;
    document.getElementById("honorario-c").textContent = item.honorarioC;

    document.getElementById("gastos-a").textContent = item.gastoA;
    document.getElementById("gastos-b").textContent = item.gastoB;
    document.getElementById("gastos-c").textContent = item.gastoC;
  });
});
