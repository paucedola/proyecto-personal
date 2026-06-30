let auditoria = [];

function registrarAuditoria(evento) {
  const registro = {
    fecha: new Date().toISOString(),
    codigo: evento.codigo || null,
    descripcion: evento.descripcion || null,
    valorBase: evento.valorBase ?? null,
    montoFinal: evento.montoFinal ?? null,
    tipo: evento.tipo || "consulta"
  };

  auditoria.push(registro);

  console.log("📊 Auditoría:", registro);
}

// ============================
// OBTENER HISTORIAL
// ============================
function obtenerAuditoria() {
  return auditoria;
}

// ============================
// LIMPIAR HISTORIAL
// ============================
function limpiarAuditoria() {
  auditoria = [];
  console.log("🧹 Auditoría limpiada");
}
