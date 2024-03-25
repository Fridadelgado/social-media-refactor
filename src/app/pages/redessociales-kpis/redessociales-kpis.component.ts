// redessociales-kpis.component.ts

import { Component, OnInit } from '@angular/core';

interface KpiValue {
  anterior: number;
  actual: number;
}

interface KpiMetric {
  name: string;
  values: {
    month: KpiValue;
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
  kpisData: any[] = [];
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
  timeFilter: 'month' | 'week' | 'day' = 'month';
  currentTitle: string = 'KPIs por Mes'; // Título inicial

  ngOnInit() {
    this.kpisData = [
      {
        socialMedia: 'facebook',
        KPIs: [
          {
            category: 'Alcance',
            metrics: [
              {
                name: 'Alcance Orgánico',
                values: {
                  month: { anterior: 8000, actual: 8500 },
                  week: { anterior: 2000, actual: 2100 },
                  day: { anterior: 250, actual: 300 }
                }
              },
              {
                name: 'Alcance Pagado',
                values: {
                  month: { anterior: 4000, actual: 4500 },
                  week: { anterior: 1000, actual: 1125 },
                  day: { anterior: 140, actual: 160 }
                }
              },
              {
                name: 'Impresiones',
                values: {
                  month: { anterior: 12000, actual: 13000 },
                  week: { anterior: 3000, actual: 3200 },
                  day: { anterior: 400, actual: 450 }
                }
              }
            ]
          },
          {
            category: 'Engagement',
            metrics: [
              {
                name: 'Me gusta',
                values: {
                  month: { anterior: 5000, actual: 5500 },
                  week: { anterior: 1250, actual: 1375 },
                  day: { anterior: 175, actual: 195 }
                }
              },
              {
                name: 'Comentarios',
                values: {
                  month: { anterior: 1500, actual: 1650 },
                  week: { anterior: 375, actual: 412 },
                  day: { anterior: 50, actual: 58 }
                }
              },
              {
                name: 'Reacciones',
                values: {
                  month: { anterior: 7000, actual: 7700 },
                  week: { anterior: 1750, actual: 1925 },
                  day: { anterior: 250, actual: 275 }
                }
              },
              {
                name: 'Compartidos',
                values: {
                  month: { anterior: 1000, actual: 1100 },
                  week: { anterior: 250, actual: 275 },
                  day: { anterior: 35, actual: 40 }
                }
              }
            ]
          },
          {
            category: 'Clics',
            metrics: [
              {
                name: 'Clics en Enlaces',
                values: {
                  month: { anterior: 3000, actual: 3300 },
                  week: { anterior: 750, actual: 825 },
                  day: { anterior: 100, actual: 110 }
                }
              },
              {
                name: 'Clics en Publicaciones',
                values: {
                  month: { anterior: 2000, actual: 2200 },
                  week: { anterior: 500, actual: 550 },
                  day: { anterior: 70, actual: 78 }
                }
              }
            ]
          },
          {
            category: 'Conversiones',
            metrics: [
              {
                name: 'Leads',
                values: {
                  month: { anterior: 250, actual: 275 },
                  week: { anterior: 62, actual: 68 },
                  day: { anterior: 8, actual: 9 }
                }
              },
              {
                name: 'Ventas',
                values: {
                  month: { anterior: 120, actual: 130 },
                  week: { anterior: 30, actual: 33 },
                  day: { anterior: 4, actual: 5 }
                }
              }
            ]
          },
          {
            category: 'Otros KPIs',
            metrics: [
              {
                name: 'Tasa de Participación',
                values: {
                  month: { anterior: 4.5, actual: 4.7 },
                  week: { anterior: 1.12, actual: 1.17 },
                  day: { anterior: 0.16, actual: 0.17 }
                }
              },
              {
                name: 'Tasa de Crecimiento de Seguidores',
                values: {
                  month: { anterior: 2, actual: 2.1 },
                  week: { anterior: 0.5, actual: 0.52 },
                  day: { anterior: 0.07, actual: 0.075 }
                }
              },
              {
                name: 'Coste por Clic (CPC)',
                values: {
                  month: { anterior: 0.25, actual: 0.27 },
                  week: { anterior: 0.0625, actual: 0.0675 },
                  day: { anterior: 0.0089, actual: 0.0096 }
                }
              },
              {
                name: 'Coste por Adquisición (CPA)',
                values: {
                  month: { anterior: 1.5, actual: 1.6 },
                  week: { anterior: 0.375, actual: 0.4 },
                  day: { anterior: 0.053, actual: 0.057 }
                }
              }
            ]
          }
        ]
      }
      // Aquí podrías añadir otros medios sociales siguiendo el mismo patrón
    ];
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
    let socialMediaData = this.kpisData.find(social => this.selectedSocialMedias.has(social.socialMedia));

    if (!socialMediaData) {
      this.filteredKpisData = [];
      return;
    }

    // Asegurándonos de que el tipo de 'category' y 'metric' no sea 'any'
    this.filteredKpisData = socialMediaData.KPIs.flatMap((category: KpiCategory) =>
      category.metrics.map((metric: KpiMetric) => {
        // La estructura de retorno aquí debe coincidir con la estructura esperada por 'filteredKpisData'
        // Si 'filteredKpisData' espera un tipo específico, asegúrate de que los objetos aquí creados coincidan con ese tipo
        return {
          category: category.category,
          name: metric.name,
          socialMedia: socialMediaData.socialMedia,
          // 'values' aquí debería estructurarse de acuerdo a cómo espera ser usado
          // Esto podría necesitar ajustes si 'filteredKpisData' espera una estructura diferente
          values: metric.values[this.timeFilter]
        };
      })
    );

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
