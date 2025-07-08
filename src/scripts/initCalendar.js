import { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import { db } from '../bd/firebase.js'
import { doc, collection, getDoc, getDocs } from 'firebase/firestore'

const calendarEl = document.getElementById('calendar')


    db.collection("pacientes").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
      });
    });
    
    

    

