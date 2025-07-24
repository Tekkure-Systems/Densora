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
        headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,timeGridDay,dayGridMonth'
    },

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

        const fecha = cita["fecha/hora"].toDate(); 
        const duracion = cita.duracionMinutos || 30;

        const evento = {
          title: `${cita.motivo || "Sin motivo"}`,
          start: fecha,
          allDay: true,
          end: new Date(fecha.getTime() + duracion * 60000),//esto si no se para que
          extendedProps: {
            pacienteId: pacienteDoc.id,
            estado: cita.estado,
            consultorioId: cita.consultorioId,
            dentistaId: cita.dentistaId,
            citaId: citaDoc.id
          }
        };

        eventos.push(evento);
      });
    }

    successCallback(eventos);
  } catch (error) {
    failureCallback(error);
  }

},
  eventClick: function(info) {
    const evento = info.event;
    const citaId = evento.extendedProps.citaId;
    const pacienteId = evento.extendedProps.pacienteId;

    // Redireccionamos a otra página con parámetros
    window.location.href = `evento?citaId=${citaId}&pacienteId=${pacienteId}`;
  },


  });
    calendar.render();
  }
});
