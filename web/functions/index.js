const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.generateOtp = functions.https.onCall(async (data, context) => {
    const pacienteId = data.pacienteId;
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