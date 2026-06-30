let datos = [];

window.addEventListener("DOMContentLoaded", () => {
  const inputFile = document.getElementById("facturacion");

  inputFile.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const hoja = workbook.Sheets[workbook.SheetNames[0]];

      datos = XLSX.utils.sheet_to_json(hoja);

      console.log("Excel cargado:", datos);
    };

    reader.readAsArrayBuffer(file);
  });

  document.getElementById("btn-buscar").addEventListener("click", () => {
    const codigo = document.getElementById("codigo").value;

    const item = datos.find((d) => d.codigo == codigo);

    if (!item) {
      alert("Código no encontrado");
      return;
    }

    document.getElementById("descripcion").value = item.descripcion;

    document.getElementById("honorario-a").textContent = item.honorarioA;
    document.getElementById("honorario-b").textContent = item.honorarioB;
    document.getElementById("honorario-c").textContent = item.honorarioC;

    document.getElementById("gastos-a").textContent = item.gastoA;
    document.getElementById("gastos-b").textContent = item.gastoB;
    document.getElementById("gastos-c").textContent = item.gastoC;
  });
});
