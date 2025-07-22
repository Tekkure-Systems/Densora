import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { db, functions, firebaseConfig } from '../bd/firebase';
import { collection, getDocs } from "firebase/firestore";

document.addEventListener('DOMContentLoaded', () => {

  let request="/eventos.json"

  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',

      events:function(info,successCallback,failureCallback){
        fetch(request)
          .then(function(response){
            return response.json()
          })
          .then(function(data){
            let events =data.events.map(function(event){
              return{
                title: event.eventTitle,
                start: new Date(event.eventStartDate),
                end: new Date(event.eventEndDate),
                url: event.eventUrl,
                location: event.eventLocation,
                timeStart: event.eventTimeStart,
                timeEnd: event.eventTimeEnd
              }
            })

            successCallback(events)

          })
          .catch(function(error){
            failureCallback(error)
          })
              
          
      },

    });
    calendar.render();
  }
});

const pacientesRef = collection(db, "pacientes");

getDocs(pacientesRef).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
});

