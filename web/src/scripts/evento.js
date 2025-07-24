import { db } from '../bd/firebase';
import { doc, getDoc } from "firebase/firestore";

const params = new URLSearchParams(window.location.search);
const citaId = params.get("citaId");
const pacienteId = params.get("pacienteId");

console.log("ID de cita: ", citaId, " ID de paciente: ", pacienteId);

const citaRef = doc(db, "pacientes", pacienteId, "citas", citaId);
getDoc(citaRef).then((docSnap) => {
  if (docSnap.exists()) {
    const datos = docSnap.data();

    document.getElementById("motivo").textContent = datos.motivo || "No disponible";
    document.getElementById("estado").textContent = datos.estado || "No disponible";

    const fecha = datos["fecha/hora"]?.toDate();
    document.getElementById("fecha").textContent = fecha ? fecha.toLocaleString() : "No disponible";

    document.getElementById("duracion").textContent = datos.duracionMinutos
      ? `${datos.duracionMinutos} minutos`
      : "No especificado";

    document.getElementById("dentistaId").textContent = datos.dentistaId || "No asignado";
    document.getElementById("consultorioId").textContent = datos.consultorioId || "No asignado";

  } else {
    console.log("No se encontró la cita");
  }
}).catch(error => {
  console.error("Error al obtener la cita:", error);
});
