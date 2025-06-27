// src/firebaseFunctions/generateOtp.js
import { functions } from "../bd/firebase";
import { httpsCallable } from "firebase/functions";

const generateOtp = httpsCallable(functions, "generateOtp");

export async function generateOtpCall(pacienteId) {
    const result = await generateOtp({ pacienteId });
    return result.data;
}

