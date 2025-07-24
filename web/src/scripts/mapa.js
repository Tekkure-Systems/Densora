
import { db } from '../bd/firebase.js'

db.collection("pacientes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });
});