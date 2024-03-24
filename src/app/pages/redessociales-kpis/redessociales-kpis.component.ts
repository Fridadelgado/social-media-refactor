// redessociales-kpis.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redessociales-kpis',
  templateUrl: './redessociales-kpis.component.html',
  styleUrls: ['./redessociales-kpis.component.scss']
})
export class RedesSocialesKpisComponent implements OnInit {
  kpisData: any[] = [];
  filteredKpisData: any[] = [];
  selectedSocialMedias: Set<string> = new Set();
  availableSocialMedias: any[] = [
    { name: 'facebook', selected: false },
    { name: 'twitter', selected: false },
    { name: 'instagram', selected: false },
    { name: 'youtube', selected: false },
    { name: 'tiktok', selected: false },
    { name: 'linkedin', selected: false },
    { name: 'pinterest', selected: false }
  ];
  timeFilter: 'month' | 'week' | 'day' = 'month';
  currentTitle: string = 'KPIs por Mes'; // Título inicial

  ngOnInit() {
    this.kpisData = [
      // Datos por mes
      { socialMedia: 'facebook', period: 'month', name: "Impresiones", anterior: 12000, actual: 13000 },
      { socialMedia: 'facebook', period: 'month', name: "Alcance Orgánico", anterior: 8000, actual: 8500 },
      { socialMedia: 'facebook', period: 'month', name: "Alcance Pagado", anterior: 4000, actual: 4500 },
      { socialMedia: 'facebook', period: 'month', name: "Clics en Enlaces", anterior: 2500, actual: 2700 },
      { socialMedia: 'facebook', period: 'month', name: "Clics en Publicidad", anterior: 100, actual: 110 },

      { socialMedia: 'twitter', period: 'month', name: "Favoritos", anterior: 650, actual: 700 },
      { socialMedia: 'twitter', period: 'month', name: "Respuestas", anterior: 300, actual: 320 },
      { socialMedia: 'twitter', period: 'month', name: "Clics en Enlaces", anterior: 1800, actual: 2000 },
      { socialMedia: 'twitter', period: 'month', name: "Retuits con Comentario", anterior: 120, actual: 130 },

      { socialMedia: 'instagram', period: 'month', name: "Interacciones", anterior: 1800, actual: 2000 },
      { socialMedia: 'instagram', period: 'month', name: "Impresiones de Perfil", anterior: 7000, actual: 7500 },
      { socialMedia: 'instagram', period: 'month', name: "Clics en Enlaces", anterior: 4000, actual: 4500 },
      { socialMedia: 'instagram', period: 'month', name: "Visitas al Perfil", anterior: 25000, actual: 28000 },

      { socialMedia: 'youtube', period: 'month', name: "Suscriptores", anterior: 7500, actual: 8000 },
      { socialMedia: 'youtube', period: 'month', name: "Visualizaciones de Playlist", anterior: 35000, actual: 38000 },
      { socialMedia: 'youtube', period: 'month', name: "Clics en Anuncios", anterior: 5000, actual: 5500 },
      { socialMedia: 'youtube', period: 'month', name: "Minutos Vistos", anterior: 12000, actual: 13000 },

      { socialMedia: 'tiktok', period: 'month', name: "Seguidores", anterior: 2500, actual: 2800 },
      { socialMedia: 'tiktok', period: 'month', name: "Visualizaciones de Perfil", anterior: 30000, actual: 32000 },
      { socialMedia: 'tiktok', period: 'month', name: "Clics en Enlaces", anterior: 700, actual: 750 },
      { socialMedia: 'tiktok', period: 'month', name: "Comentarios en Videos", anterior: 150, actual: 170 },

      { socialMedia: 'linkedin', period: 'month', name: "Publicaciones", anterior: 25, actual: 30 },
      { socialMedia: 'linkedin', period: 'month', name: "Alcance de Publicaciones", anterior: 100000, actual: 110000 },
      { socialMedia: 'linkedin', period: 'month', name: "Clics en Contenido", anterior: 1500, actual: 1700 },
      { socialMedia: 'linkedin', period: 'month', name: "Comentarios en Publicaciones", anterior: 50, actual: 60 },

      { socialMedia: 'pinterest', period: 'month', name: "Visitas al Sitio", anterior: 1000, actual: 1100 },
      { socialMedia: 'pinterest', period: 'month', name: "Compartidos", anterior: 200, actual: 220 },
      { socialMedia: 'pinterest', period: 'month', name: "Clics en Pines", anterior: 500, actual: 550 },
      { socialMedia: 'pinterest', period: 'month', name: "Seguidores Nuevos", anterior: 100, actual: 120 },
      // Datos por semana
      { socialMedia: 'facebook', period: 'week', name: "Impresiones", anterior: 3000, actual: 3200 },
      { socialMedia: 'facebook', period: 'week', name: "Alcance Orgánico", anterior: 20000, actual: 22000 },
      { socialMedia: 'facebook', period: 'week', name: "Alcance Pagado", anterior: 1000, actual: 12000 },
      { socialMedia: 'facebook', period: 'week', name: "Clics en Enlaces", anterior: 8000, actual: 8500 },
      { socialMedia: 'facebook', period: 'week', name: "Clics en Publicidad", anterior: 3000, actual: 3200 },

      { socialMedia: 'twitter', period: 'week', name: "Favoritos", anterior: 150, actual: 170 },
      { socialMedia: 'twitter', period: 'week', name: "Respuestas", anterior: 70, actual: 80 },
      { socialMedia: 'twitter', period: 'week', name: "Clics en Enlaces", anterior: 500, actual: 550 },
      { socialMedia: 'twitter', period: 'week', name: "Retuits con Comentario", anterior: 40, actual: 45 },

      { socialMedia: 'instagram', period: 'week', name: "Interacciones", anterior: 800, actual: 850 },
      { socialMedia: 'instagram', period: 'week', name: "Impresiones de Perfil", anterior: 150000, actual: 160000 },
      { socialMedia: 'instagram', period: 'week', name: "Clics en Enlaces", anterior: 1200, actual: 1300 },
      { socialMedia: 'instagram', period: 'week', name: "Visitas al Perfil", anterior: 8000, actual: 8500 },

      { socialMedia: 'youtube', period: 'week', name: "Suscriptores", anterior: 1800, actual: 2000 },
      { socialMedia: 'youtube', period: 'week', name: "Visualizaciones de Playlist", anterior: 9000, actual: 9500 },
      { socialMedia: 'youtube', period: 'week', name: "Clics en Anuncios", anterior: 1200, actual: 1300 },
      { socialMedia: 'youtube', period: 'week', name: "Minutos Vistos", anterior: 250000, actual: 270000 },

      { socialMedia: 'tiktok', period: 'week', name: "Seguidores", anterior: 600, actual: 650 },
      { socialMedia: 'tiktok', period: 'week', name: "Visualizaciones de Perfil", anterior: 5000, actual: 5500 },
      { socialMedia: 'tiktok', period: 'week', name: "Clics en Enlaces", anterior: 150, actual: 170 },
      { socialMedia: 'tiktok', period: 'week', name: "Comentarios en Videos", anterior: 30, actual: 35 },

      { socialMedia: 'linkedin', period: 'week', name: "Publicaciones", anterior: 5, actual: 6 },
      { socialMedia: 'linkedin', period: 'week', name: "Alcance de Publicaciones", anterior: 15000, actual: 17000 },
      { socialMedia: 'linkedin', period: 'week', name: "Clics en Contenido", anterior: 200, actual: 220 },
      { socialMedia: 'linkedin', period: 'week', name: "Comentarios en Publicaciones", anterior: 8, actual: 10 },

      { socialMedia: 'pinterest', period: 'week', name: "Visitas al Sitio", anterior: 300, actual: 320 },
      { socialMedia: 'pinterest', period: 'week', name: "Compartidos", anterior: 50, actual: 55 },
      { socialMedia: 'pinterest', period: 'week', name: "Clics en Pines", anterior: 80, actual: 90 },
      { socialMedia: 'pinterest', period: 'week', name: "Seguidores Nuevos", anterior: 20, actual: 25 },
      // Datos por día
      { socialMedia: 'facebook', period: 'day', name: "Impresiones", anterior: 50000, actual: 55000 },
      { socialMedia: 'facebook', period: 'day', name: "Alcance Orgánico", anterior: 30000, actual: 32000 },
      { socialMedia: 'facebook', period: 'day', name: "Alcance Pagado", anterior: 20000, actual: 23000 },
      { socialMedia: 'facebook', period: 'day', name: "Clics en Enlaces", anterior: 1000, actual: 1100 },
      { socialMedia: 'facebook', period: 'day', name: "Clics en Publicidad", anterior: 500, actual: 550 },

      { socialMedia: 'twitter', period: 'day', name: "Favoritos", anterior: 20, actual: 25 },
      { socialMedia: 'twitter', period: 'day', name: "Respuestas", anterior: 8, actual: 10 },
      { socialMedia: 'twitter', period: 'day', name: "Clics en Enlaces", anterior: 50, actual: 55 },
      { socialMedia: 'twitter', period: 'day', name: "Retuits con Comentario", anterior: 3, actual: 4 },

      { socialMedia: 'instagram', period: 'day', name: "Interacciones", anterior: 50, actual: 60 },
      { socialMedia: 'instagram', period: 'day', name: "Impresiones de Perfil", anterior: 10000, actual: 11000 },
      { socialMedia: 'instagram', period: 'day', name: "Clics en Enlaces", anterior: 200, actual: 220 },
      { socialMedia: 'instagram', period: 'day', name: "Visitas al Perfil", anterior: 1000, actual: 1200 },

      { socialMedia: 'youtube', period: 'day', name: "Suscriptores", anterior: 30, actual: 35 },
      { socialMedia: 'youtube', period: 'day', name: "Visualizaciones de Playlist", anterior: 200, actual: 220 },
      { socialMedia: 'youtube', period: 'day', name: "Clics en Anuncios", anterior: 30, actual: 35 },
      { socialMedia: 'youtube', period: 'day', name: "Minutos Vistos", anterior: 5000, actual: 5500 },

      { socialMedia: 'tiktok', period: 'day', name: "Seguidores", anterior: 5, actual: 6 },
      { socialMedia: 'tiktok', period: 'day', name: "Visualizaciones de Perfil", anterior: 50, actual: 55 },
      { socialMedia: 'tiktok', period: 'day', name: "Clics en Enlaces", anterior: 3, actual: 4 },
      { socialMedia: 'tiktok', period: 'day', name: "Comentarios en Videos", anterior: 2, actual: 3 },

      { socialMedia: 'linkedin', period: 'day', name: "Publicaciones", anterior: 1, actual: 2 },
      { socialMedia: 'linkedin', period: 'day', name: "Alcance de Publicaciones", anterior: 500, actual: 550 },
      { socialMedia: 'linkedin', period: 'day', name: "Clics en Contenido", anterior: 5, actual: 6 },
      { socialMedia: 'linkedin', period: 'day', name: "Comentarios en Publicaciones", anterior: 1, actual: 2 },

      { socialMedia: 'pinterest', period: 'day', name: "Visitas al Sitio", anterior: 10, actual: 12 },
      { socialMedia: 'pinterest', period: 'day', name: "Compartidos", anterior: 2, actual: 3 },
      { socialMedia: 'pinterest', period: 'day', name: "Clics en Pines", anterior: 5, actual: 6 },
      { socialMedia: 'pinterest', period: 'day', name: "Seguidores Nuevos", anterior: 1, actual: 2 },
    ];

    // Aplica los filtros iniciales basados en el periodo por mes
    this.setTimeFilter('month');
  }

  toggleSocialMedia(socialMedia: any) {
    socialMedia.selected = !socialMedia.selected; // Cambia el estado de selección

    // Actualiza el conjunto de medios sociales seleccionados
    if (socialMedia.selected) {
      this.selectedSocialMedias.add(socialMedia.name);
    } else {
      this.selectedSocialMedias.delete(socialMedia.name);
    }

    this.applyFilters();
  }


  setTimeFilter(filter: 'month' | 'week' | 'day') {
    this.timeFilter = filter;
    // Actualiza el título basado en el filtro seleccionado
    switch (filter) {
      case 'month':
        this.currentTitle = 'KPIs por Mes';
        break;
      case 'week':
        this.currentTitle = 'KPIs por Semana';
        break;
      case 'day':
        this.currentTitle = 'KPIs por Día';
        break;
      default:
        this.currentTitle = 'KPIs';
    }
    this.applyFilters();
  }

  applyFilters() {
    // Filtra los datos de KPI basados en el periodo de tiempo seleccionado
    this.filteredKpisData = this.kpisData.filter(kpi =>
      kpi.period === this.timeFilter &&
      (this.selectedSocialMedias.size === 0 || this.selectedSocialMedias.has(kpi.socialMedia))
    );
  }
}
