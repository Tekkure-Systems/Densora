import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../bd/firebase.js";

const functions = getFunctions(app);

export async function generateOtp(pacienteId) {
    const fn = httpsCallable(functions, "generateOtp");
    const res = await fn({ pacienteId });
    return res.data;
}

export async function verifyOtp(pacienteId, otp) {
    const fn = httpsCallable(functions, "verifyOtp");
    const res = await fn({ pacienteId, otp });
    return res.data;
}