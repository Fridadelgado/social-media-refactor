import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // Importa las opciones de configuración de FullCalendar.
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin para la vista de cuadrícula por días.
import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin para la vista de cuadrícula por tiempos/horas.
import esLocale from '@fullcalendar/core/locales/es'; // Localización en español.
import enLocale from '@fullcalendar/core/locales/en-gb'; // Localización en inglés (Reino Unido).
import { Subscription } from 'rxjs'; // Importa Subscription de RxJS para manejar la desuscripción.
import { LanguageService } from '../../../app/services/translate-service.service'; // Servicio personalizado para la gestión del idioma.

@Component({
  selector: 'app-calendariopublicaciones', // Selector CSS del componente.
  templateUrl: './calendariopublicaciones.component.html', // Plantilla HTML del componente.
  styleUrls: ['./calendariopublicaciones.component.scss'] // Estilos específicos del componente.
})


export class CalendariopublicacionesComponent implements OnInit, OnDestroy {
  calendarOptions?: CalendarOptions; // Define las opciones de configuración para FullCalendar.
  private langChangeSubscription?: Subscription; // Suscripción al cambio de idioma.

  constructor(private languageService: LanguageService) { } // Inyecta el LanguageService.

  ngOnInit() {
    this.initializeCalendar(); // Inicializa el calendario.
    // Se suscribe al observable de cambio de idioma y actualiza la localización del calendario según el idioma.
    this.langChangeSubscription = this.languageService.onLangChange.subscribe((event) => {
      this.updateCalendarLocale(event.lang);
    });
  }

  ngOnDestroy() {
    // Al destruir el componente, cancela la suscripción para prevenir fugas de memoria.
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }


  initializeCalendar() {
    // Configura las opciones iniciales de FullCalendar.
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin], // Plugins para diferentes vistas.
      initialView: 'dayGridMonth',  // Vista inicial.
      headerToolbar: { // Configura la barra de herramientas del calendario.
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      weekends: false, // Deshabilita los fines de semana.
      // Establece la localización según el idioma actual del servicio de idiomas.
      locale: this.languageService.getCurrentLanguage() === 'es' ? esLocale : enLocale,
      events: [
        { title: 'Facebook Kia YouTube', start: new Date('03/15/2024') },
        { title: 'Facebook Toyota Facebook', start: new Date() },
        { title: 'Facebook Kia YouTube', start: new Date() }
      ]
    };
  }

  updateCalendarLocale(lang: string) {
    // Actualiza la localización del calendario cuando el idioma cambia.
    this.calendarOptions = { ...this.calendarOptions, locale: lang === 'es' ? esLocale : enLocale };
  }
}
