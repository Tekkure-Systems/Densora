import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { db, functions, firebaseConfig } from '../bd/firebase';
import { collection, documentId, getDocs } from "firebase/firestore";

document.addEventListener('DOMContentLoaded', () => {

  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',

      events: async function(info, successCallback, failureCallback) {
      /*try {
        const pacienteId = localStorage.getItem("pacienteId");

        if (!pacienteId) {
          throw new Error("Paciente no autenticado");
        }

        const citasRef = collection(db, "pacientes", pacienteId, "citas");
        const citasSnap = await getDocs(citasRef);

        const eventos = [];

        citasSnap.forEach((doc) => {
          const cita = doc.data();
          const fecha = cita["fecha/hora"].toDate();
          const soloFecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
        
          eventos.push({
            title: cita.motivo || "Sin motivo",
            start: soloFecha,
            allDay: true,
            extendedProps: {
            estado: cita.estado,
            consultorioId: cita.consultorioId,
            dentistaId: cita.dentistaId
            }
          });
    });
    successCallback(eventos);

  } catch (error) {
    console.error("Error al cargar eventos:", error);
    failureCallback(error);
  }*/
    try {
    const eventos = [];

    const pacientesSnap = await getDocs(collection(db, "pacientes"));
    
    for (const pacienteDoc of pacientesSnap.docs) {
      const citasSnap = await getDocs(collection(db, "pacientes", pacienteDoc.id, "citas"));

      citasSnap.forEach((citaDoc) => {
        const cita = citaDoc.data();

        const fecha = cita["fecha/hora"].toDate(); // Firestore Timestamp -> JS Date
        const duracion = cita.duracionMinutos || 30; // Por defecto 30 minutos

        const evento = {
          title: `${cita.motivo || "Sin motivo"}`,
          start: fecha,
          allDay: true,
          end: new Date(fecha.getTime() + duracion * 60000),
          extendedProps: {
            pacienteId: pacienteDoc.id,
            estado: cita.estado,
            consultorioId: cita.consultorioId,
            dentistaId: cita.dentistaId
          }
        };

        eventos.push(evento);
      });
    }

    successCallback(eventos);
  } catch (error) {
    failureCallback(error);
  }

}


  });
    calendar.render();
  }
});
