const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.generateOtp = functions.https.onCall(async (data, context) => {
    const pacienteId = data.pacienteId;

    if (!pacienteId || typeof pacienteId !== "string" || pacienteId.trim() === "") {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Missing or invalid pacienteId."
        );
    }

    console.log("generateOtp called with pacienteId:", pacienteId);

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

    return { success: true, otp };
});