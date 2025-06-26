import { db } from "/src/bd/firebase.js";
import { collection, addDoc } from "firebase/firestore";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register");
    const response = document.getElementById("response");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        try {
            const docRef = await addDoc(collection(db, "users"), {
                name,
                phone,
            });
            await setDoc(docRef, {
                uid: docRef.id,
                name,
                phone,
            });
        } catch (err) {}
    });
});