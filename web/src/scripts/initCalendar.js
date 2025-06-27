import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const calendarEl = document.getElementById('calendar')

if (calendarEl) {
  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    droppable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [
      {
        title: 'Evento inicial',
        start: new Date().toISOString().split('T')[0],
        color: '#3b82f6'
      }
    ],
    dateClick(info) {
      const title = prompt('¿Título del nuevo evento?')
      if (title) {
        calendar.addEvent({
          title,
          start: info.dateStr,
          allDay: true
        })
      }
    },
    eventDrop(info) {
      alert(`Evento movido a ${info.event.start.toISOString().split('T')[0]}`)
    }
  })

  calendar.render()
}
