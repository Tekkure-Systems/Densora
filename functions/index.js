const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
exports.generateOtp = functions.https.onCall(async (data, context) => {
    try {
        console.log("Payload recibido:", data);
        const pacienteId = data?.pacienteId;
        if (!pacienteId || typeof pacienteId !== "string" || pacienteId.trim() === "") {
            console.log("PacienteId es inválido o vacío:", pacienteId);
            throw new functions.https.HttpsError(
                "invalid-argument",
                "Missing or invalid pacienteId."
            );
        }
        console.log("generateOtp called with pacienteId:", pacienteId);
        const docSnap = await db.collection("pacientes").doc(pacienteId).get();
        if (!docSnap.exists) {
            console.log("Paciente NO existe:", pacienteId);
            throw new functions.https.HttpsError(
                "not-found",
                `Paciente ${pacienteId} no existe en Firestore.`
            );
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;
        await db
            .collection("pacientes")
            .doc(pacienteId)
            .collection("otp")
            .doc("code")
            .set({
                code: otp,
                expiresAt,
            });
        console.log("OTP generado correctamente!");
        return { success: true, otp };
    } catch (error) {
        console.error("Error en generateOtp:", error);
        throw new functions.https.HttpsError(
            "internal",
            error.message || "Internal error"
        );
    }
});