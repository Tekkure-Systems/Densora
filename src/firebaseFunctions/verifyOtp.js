exports.verifyOtp = functions.https.onCall(async (data, context) => {
    const { identifier, otp } = data;

    const doc = await db.collection("otp").doc(identifier).get();
    if (!doc.exists) return { success: false, message: "OTP no encontrado" };

    const { code, expiresAt } = doc.data();
    const now = Date.now();

    if (now > expiresAt) {
        return { success: false, message: "OTP expirado" };
    }

    if (otp !== code) {
        return { success: false, message: "OTP incorrecto" };
    }

    // OTP válido
    await db.collection("otp").doc(identifier).delete(); // opcional: eliminarlo
    return { success: true };
});
