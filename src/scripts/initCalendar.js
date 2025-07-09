import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarEl = document.getElementById('calendar')

if (calendarEl) {
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: false,
    selectable: false,
    droppable: false,

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
      }
    ],

    eventClick(info) {
      info.jsEvent.preventDefault()
      const { id, title, start } = info.event
      const url = `/evento?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&start=${encodeURIComponent(start.toISOString())}`
      window.location.href = url
    }
  })

  calendar.render()
}
