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
            const pacienteRef = doc(collection(db, "pacientes"));
            await setDoc(pacienteRef, {
                uid: pacienteRef.id,
                name,
                phone,
            });

            console.log("pacienteRef.id:", pacienteRef.id);

            const result = await generateOtp({
                pacienteId: pacienteRef.id
            });

            console.log("OTP generado:", result.data.otp);

            response.textContent = `Paciente creado. OTP enviado. (Pruebas: ${result.data.otp})`;

        } catch (err) {
            console.error(err);
            response.textContent = "Error creando paciente.";
        }
    });
});
