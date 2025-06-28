import { db } from "/src/bd/firebase.js";
import {
    collection,
    doc,
    setDoc
} from "firebase/firestore";

import { generateOtp } from "/src/services/otp.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register");
    const response = document.getElementById("response");

    let currentPacienteId = null;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        try {
            const pacienteRef = doc(collection(db, "pacientes"));
            await setDoc(pacienteRef, {
                uid: pacienteRef.id,
                name,
                phone,
            });

            currentPacienteId = pacienteRef.id;

            console.log("Llamando generateOtp con:", pacienteRef.id);
            const result = await generateOtp({ pacienteId: pacienteRef.id });
            console.log("Respuesta:", result);

            console.log("OTP generado (solo test):", result.data.otp);

            response.textContent = `Paciente creado. OTP enviado. (Para pruebas: ${result.data.otp})`;

        } catch (err) {
            console.error(err);
            response.textContent = "Error creando paciente.";
        }
    });
});