import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { db } from '../bd/firebase.js'
import { doc, setDoc } from 'firebase/firestore'

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
      // 🟢 Crea un nuevo evento con un ID único
      const nuevoEvento = {
        id: crypto.randomUUID(),
        title: 'Nuevo evento',
        start: info.dateStr,
        allDay: true,
        color: '#16a34a',
        textColor: '#fff'
      }


      calendar.addEvent(nuevoEvento)


      const url = `/evento?id=${encodeURIComponent(nuevoEvento.id)}&title=${encodeURIComponent(nuevoEvento.title)}&start=${encodeURIComponent(nuevoEvento.start)}`
      window.location.href = url
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
