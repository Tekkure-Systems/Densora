import { db } from "/src/bd/firebase.js";
import {
    collection,
    doc,
    setDoc
} from "firebase/firestore";

import { generateOtp } from "/src/services/otp.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register");
    const otpBtn = document.getElementById("verifyOtpBtn");
    const response = document.getElementById("response");

    let currentPacienteId = null;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;

        try {
            // Crear paciente en Firestore
            const pacienteRef = doc(collection(db, "pacientes"));
            await setDoc(pacienteRef, {
                uid: pacienteRef.id,
                name,
                phone,
            });

            currentPacienteId = pacienteRef.id;

            // Generar OTP mediante Firebase Function
            const result = await generateOtp({ pacienteId: pacienteRef.id });
            console.log("OTP generado (solo test):", result.otp);

            response.textContent = `Paciente creado. OTP enviado. (Para pruebas: ${result.otp})`;

        } catch (err) {
            console.error(err);
            response.textContent = "Error creando paciente.";
        }
    });
});