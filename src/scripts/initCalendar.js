import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { db } from '../bd/firebase.js'
import { doc, getDoc } from "firebase/firestore";


const calendarEl = document.getElementById('calendar')

if (calendarEl) {

  const calendar = new Calendar(calendarEl, {
    //Plugins activos
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],

    initialView: 'dayGridMonth',

    editable: false,
    selectable: true,

    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },

    events: [
      {
        id: '1',
        title: 'Reunión de equipo',
        start: new Date().toISOString().split('T')[0],
        color: '#1d4ed8',
        textColor: '#fff'
      },
      {
        id: '2',
        title: 'Presentación',
        start: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        color: '#dc2626',
        textColor: '#fff'
      }
    ],

    dateClick(info) {
      if(event==true){
              calendar.addEvent(nuevoEvento)

      const url = `/evento?id=${encodeURIComponent(nuevoEvento.id)}&title=${encodeURIComponent(nuevoEvento.title)}&start=${encodeURIComponent(nuevoEvento.start)}`
      window.location.href = url
      }

    },


    eventClick(info) {
      info.jsEvent.preventDefault()
      const { id, title, start } = info.event
      const url = `/evento?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&start=${encodeURIComponent(start.toISOString())}`
      window.location.href = url
    }
  })


  calendar.render()
}

const docRef = doc(db, 'pacientes', 'paciente prueba');  // reemplaza 'paciente_1' por el ID real
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Datos del paciente:", docSnap.data());


  const citasRef = collection(docRef, 'citas');
  const citasSnap = await getDocs(citasRef);

  const citas = citasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Citas del paciente:", citas);

} else {
  console.log("El paciente no existe");
}
