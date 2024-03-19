import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import enLocale from '@fullcalendar/core/locales/en-gb';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../app/services/translate-service.service'; // Ajusta la ruta según sea necesario


@Component({
  selector: 'app-calendariopublicaciones',
  templateUrl: './calendariopublicaciones.component.html',
  styleUrls: ['./calendariopublicaciones.component.scss']
})


export class CalendariopublicacionesComponent implements OnInit, OnDestroy {
  calendarOptions?: CalendarOptions;
  private langChangeSubscription?: Subscription;

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.initializeCalendar();
    this.langChangeSubscription = this.languageService.onLangChange.subscribe((event) => {
      this.updateCalendarLocale(event.lang);
    });

  }

  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  initializeCalendar() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      weekends: false,
      locale: this.languageService.getCurrentLanguage() === 'es' ? esLocale : enLocale,
      events: [
        { title: 'Facebook Kia YouTube', start: new Date('03/15/2024') },
        { title: 'Facebook Toyota Facebook', start: new Date() },
        { title: 'Facebook Kia YouTube', start: new Date() }
      ]
    };
  }

  updateCalendarLocale(lang: string) {
    this.calendarOptions = { ...this.calendarOptions, locale: lang === 'es' ? esLocale : enLocale };
  }
}
