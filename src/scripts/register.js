import { db } from "/src/bd/firebase.js";
import { collection, doc, setDoc } from "firebase/firestore";
import { generateOtp } from "../services/otp.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register");
    const response = document.getElementById("response");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        try {
            // Crea referencia al doc (sin guardarlo aún)
            const pacienteRef = doc(collection(db, "pacientes"));
            console.log("pacienteRef:", pacienteRef);
            console.log("pacienteRef.id:", pacienteRef.id);

            // Guarda el documento en Firestore
            await setDoc(pacienteRef, {
                uid: pacienteRef.id,
                name,
                phone,
            });
            console.log("Paciente guardado correctamente en Firestore.");

            // Llama la Cloud Function
            const result = await generateOtp({
                pacienteId: pacienteRef.id
            });

            console.log("Resultado de generateOtp:", result);

            if (result?.data?.success) {
                console.log("OTP generado:", result.data.otp);
                response.textContent = `Paciente creado. OTP enviado. (Pruebas: ${result.data.otp})`;
            } else {
                console.error("generateOtp no devolvió éxito:", result);
                response.textContent = "Error: no se generó OTP.";
            }

        } catch (err) {
            console.error("Error en submit:", err);
            response.textContent = `Error creando paciente: ${err.message || JSON.stringify(err)}`;
        }
    });

    (async () => {
        try {
            const testPacienteId = "psDljYHRlvZl0DsoIXnm";
            console.log("Llamando generateOtp con id hardcodeado:", testPacienteId);
            const result = await generateOtp({
                pacienteId: testPacienteId
            });
            console.log("OTP generado hardcode:", result);
        } catch (err) {
            console.error("Error en generateOtp hardcode:", err);
        }
    })();
    
});
