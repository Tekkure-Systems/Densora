import { httpsCallable } from "firebase/functions";
import { functions } from "/src/bd/firebase.js";

export const generateOtp = httpsCallable(functions, "generateOtp");
