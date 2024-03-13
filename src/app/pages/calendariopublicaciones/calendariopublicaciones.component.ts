import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es'; // Importar locale español

@Component({
  selector: 'app-calendariopublicaciones',
  templateUrl: './calendariopublicaciones.component.html',
  styleUrls: ['./calendariopublicaciones.component.scss']
})
export class CalendariopublicacionesComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    weekends: false,
    locale: esLocale, // Establecer el locale a español
    events: [
      { title: 'Facebook Kia YouTube', start: new Date('03/15/2024') },
      { title: 'Facebook Toyota Facebook', start: new Date() },
      { title: 'Facebook Kia YouTube', start: new Date() }
    ]
  };
}
