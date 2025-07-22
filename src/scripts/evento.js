import { db, functions, firebaseConfig } from '../bd/firebase';
import { collection, documentId, getDocs } from "firebase/firestore";

const params = new URLSearchParams(window.location.search);
const citaId = params.get("citaId");
const pacienteId = params.get("pacienteId");

console.log("ID de cita: ",citaId," ID de paciente: ",pacienteId);



const citaRef = doc(db, "pacientes", pacienteId, "citas", citaId);
getDoc(citaRef).then((docSnap) => {
  if (docSnap.exists()) {
    const datosCita = docSnap.data();
    // Mostrar en pantalla, por ejemplo:
    document.getElementById("motivo").textContent = datosCita.motivo;
  } else {
    console.log("No se encontró la cita");
  }
});

