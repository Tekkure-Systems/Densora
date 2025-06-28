import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

export const generateOtp = httpsCallable(functions, "generateOtp");