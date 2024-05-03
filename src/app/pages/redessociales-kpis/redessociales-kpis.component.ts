// redessociales-kpis.component.ts

import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../../services/facebook.service';


interface KpiValue {
  anterior: number;
  actual: number;
}

interface KpiMetric {
  name: string;
  values: {
    days_28: KpiValue;
    week: KpiValue;
    day: KpiValue;
  };
}

interface KpiCategory {
  category: string;
  metrics: KpiMetric[];
}

interface SocialMediaKpi {
  socialMedia: string;
  KPIs: KpiCategory[];
}

@Component({
  selector: 'app-redessociales-kpis',
  templateUrl: './redessociales-kpis.component.html',
  styleUrls: ['./redessociales-kpis.component.scss']
})
export class RedesSocialesKpisComponent implements OnInit {
  kpisData: SocialMediaKpi[] = [];
  groupedKpisData: any[] = [];
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
  timeFilter: 'days_28' | 'week' | 'day' = 'days_28';
  currentTitle: string = ""; // Título inicial
  selectedCategories: string[] = []; // Para almacenar múltiples categorías
  allCategories?: string[]; // Para almacenar todas las categorías disponibles

  constructor(private facebookService: FacebookService) { }


  ngOnInit() {
    this.loadFacebookKpis();
  }

  loadFacebookKpis() {
    this.facebookService.getKpis().subscribe(
      (data: SocialMediaKpi[]) => {
        this.kpisData = data;
        this.allCategories = Array.from(new Set(this.kpisData.flatMap(kpi => kpi.KPIs.map(kpiCategory => kpiCategory.category))));
        this.selectedCategories = [...this.allCategories];
        this.applyFilters();  // Aplica filtros iniciales o actualiza la vista
      },
      error => {
        console.error('Error loading KPIs from Facebook:', error);
      }
    );
  }



  toggleSocialMedia(selectedSocialMedia: any) {
    // Primero, desmarcamos todos como seleccionados excepto el que se acaba de clickear
    this.availableSocialMedias.forEach(socialMedia => {
      if (socialMedia.name === selectedSocialMedia.name) {
        // Cambia el estado de selección solo del clickeado, si no estaba ya seleccionado
        socialMedia.selected = !socialMedia.selected;
      } else {
        // Asegura que los demás estén deseleccionados
        socialMedia.selected = false;
      }
    });

    // Ahora, actualizamos el conjunto de medios sociales seleccionados basado en el nuevo estado
    this.selectedSocialMedias.clear(); // Limpia el conjunto para asegurar una única selección
    if (selectedSocialMedia.selected) {
      this.selectedSocialMedias.add(selectedSocialMedia.name);
      // Actualiza el título con la red social seleccionada y el filtro de tiempo
      this.updateCurrentTitle(selectedSocialMedia.name, this.timeFilter);
    } else {
      // Si ninguna red social está seleccionada, actualiza el título sin la red social
      this.updateCurrentTitle(null, this.timeFilter);
    }

    this.applyFilters();
  }



  setTimeFilter(filter: 'days_28' | 'week' | 'day') {
    this.timeFilter = filter;
    const selectedSocialMediaName = this.selectedSocialMedias.size > 0 ? Array.from(this.selectedSocialMedias)[0] : null;
    this.updateCurrentTitle(selectedSocialMediaName, filter);
    this.applyFilters();
  }


  updateCurrentTitle(socialMediaName: string | null, timeFilter: 'days_28' | 'week' | 'day') {
    let timeFilterText = '';
    switch (timeFilter) {
      case 'days_28':
        timeFilterText = "KPI's por Mes";
        break;
      case 'week':
        timeFilterText = "KPI's por Semana";
        break;
      case 'day':
        timeFilterText = "KPI's por Día";
        break;
      default:
        timeFilterText = "KPI's";
    }
    this.currentTitle = socialMediaName ? `${timeFilterText} de ${socialMediaName.toUpperCase()} ` : timeFilterText;
  }



  applyFilters() {
    // Restablece los datos filtrados
    this.filteredKpisData = [];
    let categoriesForSelectedSocials = new Set<string>();

    // Combina los datos de todas las redes sociales seleccionadas
    this.kpisData.forEach(socialMediaData => {
      if (this.selectedSocialMedias.has(socialMediaData.socialMedia)) {
        socialMediaData.KPIs.forEach(category => {
          categoriesForSelectedSocials.add(category.category); // Agrega todas las categorías de las redes sociales seleccionadas
        });

        const filteredData = socialMediaData.KPIs
          .filter(category => this.selectedCategories.includes(category.category)) // Filtra por categorías seleccionadas
          .flatMap((category: KpiCategory) =>
            category.metrics.map((metric: KpiMetric) => {
              return {
                category: category.category,
                name: metric.name,
                socialMedia: socialMediaData.socialMedia,
                values: metric.values[this.timeFilter],
              };
            })
          );
        this.filteredKpisData.push(...filteredData);
      }
    });

    // Actualiza las categorías disponibles basadas en las redes sociales seleccionadas SIN filtrar por categorías seleccionadas
    this.allCategories = Array.from(categoriesForSelectedSocials);

    // No filtres las categorías seleccionadas aquí; eso se maneja por el usuario

    // Transforma los datos de KPI para su presentación
    this.transformKpisDataForCategories();
  }


  transformKpisDataForCategories() {
    const categoriesMap = new Map();

    // Iterar sobre filteredKpisData para agrupar por categoría
    this.filteredKpisData.forEach(kpi => {
      if (!categoriesMap.has(kpi.category)) {
        categoriesMap.set(kpi.category, []);
      }
      categoriesMap.get(kpi.category).push(kpi);
    });

    // Convertir el Map en un array para iterar en la plantilla
    this.groupedKpisData = Array.from(categoriesMap, ([category, kpis]) => ({ category, kpis }));
  }


}
