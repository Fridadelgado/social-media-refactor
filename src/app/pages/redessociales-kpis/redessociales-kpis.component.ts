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
  timeFilter: 'month' | 'week' | 'day' = 'month';
  currentTitle: string = ""; // Título inicial
  selectedCategories: string[] = []; // Para almacenar múltiples categorías
  allCategories?: string[]; // Para almacenar todas las categorías disponibles


  ngOnInit() {
    this.kpisData = [
      {
        socialMedia: 'facebook',
          KPIs: [
            {
              category: 'Alcance',
              metrics: [
                {
                  name: 'Alcance Total',
                  values: {
                    month: { anterior: 80000, actual: 88000 },
                    week: { anterior: 20000, actual: 22000 },
                    day: { anterior: 2857, actual: 3143 }
                  }
                },
                {
                  name: 'Alcance Único',
                  values: {
                    month: { anterior: 60000, actual: 66000 },
                    week: { anterior: 15000, actual: 16500 },
                    day: { anterior: 2143, actual: 2357 }
                  }
                },
                {
                  name: 'Impresiones',
                  values: {
                    month: { anterior: 120000, actual: 132000 },
                    week: { anterior: 30000, actual: 33000 },
                    day: { anterior: 4286, actual: 4714 }
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
                    month: { anterior: 10000, actual: 11000 },
                    week: { anterior: 2500, actual: 2750 },
                    day: { anterior: 357, actual: 393 }
                  }
                },
                {
                  name: 'Comentarios',
                  values: {
                    month: { anterior: 2000, actual: 2200 },
                    week: { anterior: 500, actual: 550 },
                    day: { anterior: 71, actual: 78 }
                  }
                },
                {
                  name: 'Compartidos',
                  values: {
                    month: { anterior: 1200, actual: 1320 },
                    week: { anterior: 300, actual: 330 },
                    day: { anterior: 42, actual: 47 }
                  }
                },
                {
                  name: 'Reacciones',
                  values: {
                    month: { anterior: 15000, actual: 16500 },
                    week: { anterior: 3750, actual: 4125 },
                    day: { anterior: 536, actual: 589 }
                  }
                }
              ]
            },
            {
              category: 'Visualizaciones',
              metrics: [
                {
                  name: 'Visualizaciones Totales',
                  values: {
                    month: { anterior: 50000, actual: 55000 },
                    week: { anterior: 12500, actual: 13750 },
                    day: { anterior: 1786, actual: 1964 }
                  }
                },
                {
                  name: 'Visualizaciones Promedio',
                  values: {
                    month: { anterior: 1200, actual: 1320 },
                    week: { anterior: 300, actual: 330 },
                    day: { anterior: 43, actual: 47 }
                  }
                },
                {
                  name: 'Tasa de Visualización',
                  values: {
                    month: { anterior: 0.6, actual: 0.65 },
                    week: { anterior: 0.62, actual: 0.67 },
                    day: { anterior: 0.64, actual: 0.69 }
                  }
                }
              ]
            },
            {
              category: 'Seguidores',
              metrics: [
                {
                  name: 'Número de Seguidores',
                  values: {
                    month: { anterior: 15000, actual: 15750 },
                    week: { anterior: 3750, actual: 3937 },
                    day: { anterior: 535, actual: 564 }
                  }
                },
                {
                  name: 'Tasa de Crecimiento de Seguidores',
                  values: {
                    month: { anterior: 0.04, actual: 0.042 },
                    week: { anterior: 0.041, actual: 0.043 },
                    day: { anterior: 0.042, actual: 0.044 }
                  }
                }
              ]
            },
            {
              category: 'Conversiones',
              metrics: [
                {
                  name: 'Clics en Enlaces',
                  values: {
                    month: { anterior: 8000, actual: 8800 },
                    week: { anterior: 2000, actual: 2200 },
                    day: { anterior: 286, actual: 314 }
                  }
                },
                {
                  name: 'Leads',
                  values: {
                    month: { anterior: 500, actual: 550 },
                    week: { anterior: 125, actual: 138 },
                    day: { anterior: 18, actual: 20 }
                  }
                },
                {
                  name: 'Ventas',
                  values: {
                    month: { anterior: 300, actual: 330 },
                    week: { anterior: 75, actual: 83 },
                    day: { anterior: 10, actual: 12 }
                  }
                }
              ]
            },
            {
              category: 'Otros KPIs',
              metrics: [
                {
                  name: 'Tasa de Engagement',
                  values: {
                    month: { anterior: 0.07, actual: 0.075 },
                    week: { anterior: 0.071, actual: 0.076 },
                    day: { anterior: 0.072, actual: 0.077 }
                  }
                },
                {
                  name: 'Coste por Clic (CPC)',
                  values: {
                    month: { anterior: 0.3, actual: 0.28 },
                    week: { anterior: 0.31, actual: 0.29 },
                    day: { anterior: 0.32, actual: 0.3 }
                  }
                },
                {
                  name: 'Coste por Adquisición (CPA)',
                  values: {
                    month: { anterior: 2.5, actual: 2.3 },
                    week: { anterior: 2.55, actual: 2.35 },
                    day: { anterior: 2.6, actual: 2.4 }
                  }
                }
              ]
            }
          ]
      },
      {
        socialMedia: 'tiktok',
        KPIs: [
          {
            category: 'Alcance',
            metrics: [
              {
                name: 'Alcance Total',
                values: {
                  month: { anterior: 10000, actual: 12000 },
                  week: { anterior: 2500, actual: 3000 },
                  day: { anterior: 300, actual: 350 }
                }
              },
              {
                name: 'Alcance Único',
                values: {
                  month: { anterior: 8000, actual: 9500 },
                  week: { anterior: 2000, actual: 2400 },
                  day: { anterior: 250, actual: 290 }
                }
              },
              {
                name: 'Impresiones',
                values: {
                  month: { anterior: 15000, actual: 18000 },
                  week: { anterior: 3750, actual: 4500 },
                  day: { anterior: 500, actual: 600 }
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
                  month: { anterior: 7000, actual: 8000 },
                  week: { anterior: 1750, actual: 2000 },
                  day: { anterior: 200, actual: 250 }
                }
              },
              {
                name: 'Comentarios',
                values: {
                  month: { anterior: 2000, actual: 2300 },
                  week: { anterior: 500, actual: 575 },
                  day: { anterior: 60, actual: 70 }
                }
              },
              {
                name: 'Compartidos',
                values: {
                  month: { anterior: 1500, actual: 1800 },
                  week: { anterior: 375, actual: 450 },
                  day: { anterior: 50, actual: 60 }
                }
              },
              {
                name: 'Dúos',
                values: {
                  month: { anterior: 500, actual: 600 },
                  week: { anterior: 125, actual: 150 },
                  day: { anterior: 15, actual: 20 }
                }
              }
            ]
          },
          {
            category: 'Visualizaciones',
            metrics: [
              {
                name: 'Visualizaciones Totales',
                values: {
                  month: { anterior: 20000, actual: 25000 },
                  week: { anterior: 5000, actual: 6250 },
                  day: { anterior: 700, actual: 850 }
                }
              },
              {
                name: 'Visualizaciones Promedio',
                values: {
                  month: { anterior: 1500, actual: 1800 },
                  week: { anterior: 375, actual: 450 },
                  day: { anterior: 50, actual: 60 }
                }
              },
              {
                name: 'Tasa de Visualización',
                values: {
                  month: { anterior: 0.45, actual: 0.50 },
                  week: { anterior: 0.46, actual: 0.51 },
                  day: { anterior: 0.47, actual: 0.52 }
                }
              }
            ]
          },
          {
            category: 'Seguidores',
            metrics: [
              {
                name: 'Número de Seguidores',
                values: {
                  month: { anterior: 5000, actual: 5500 },
                  week: { anterior: 1250, actual: 1375 },
                  day: { anterior: 160, actual: 175 }
                }
              },
              {
                name: 'Tasa de Crecimiento de Seguidores',
                values: {
                  month: { anterior: 0.1, actual: 0.12 },
                  week: { anterior: 0.11, actual: 0.13 },
                  day: { anterior: 0.14, actual: 0.15 }
                }
              }
            ]
          },
          {
            category: 'Conversiones',
            metrics: [
              {
                name: 'Clics en Enlaces',
                values: {
                  month: { anterior: 4000, actual: 4500 },
                  week: { anterior: 1000, actual: 1125 },
                  day: { anterior: 130, actual: 145 }
                }
              },
              {
                name: 'Leads',
                values: {
                  month: { anterior: 300, actual: 350 },
                  week: { anterior: 75, actual: 88 },
                  day: { anterior: 10, actual: 12 }
                }
              },
              {
                name: 'Ventas',
                values: {
                  month: { anterior: 150, actual: 175 },
                  week: { anterior: 37, actual: 44 },
                  day: { anterior: 5, actual: 6 }
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
                  month: { anterior: 0.2, actual: 0.25 },
                  week: { anterior: 0.21, actual: 0.26 },
                  day: { anterior: 0.22, actual: 0.27 }
                }
              },
              {
                name: 'Coste por Clic (CPC)',
                values: {
                  month: { anterior: 0.05, actual: 0.045 },
                  week: { anterior: 0.052, actual: 0.047 },
                  day: { anterior: 0.053, actual: 0.048 }
                }
              },
              {
                name: 'Coste por Adquisición (CPA)',
                values: {
                  month: { anterior: 1.0, actual: 0.95 },
                  week: { anterior: 1.05, actual: 1.00 },
                  day: { anterior: 1.1, actual: 1.05 }
                }
              }
            ]
          }
        ]
      },
      {
        socialMedia: 'pinterest',
        KPIs: [
          {
            category: 'Alcance',
            metrics: [
              {
                name: 'Impresiones',
                values: {
                  month: { anterior: 20000, actual: 22000 },
                  week: { anterior: 5000, actual: 5500 },
                  day: { anterior: 700, actual: 750 }
                }
              },
              {
                name: 'Alcance',
                values: {
                  month: { anterior: 15000, actual: 16500 },
                  week: { anterior: 3750, actual: 4125 },
                  day: { anterior: 500, actual: 550 }
                }
              }
            ]
          },
          {
            category: 'Engagement',
            metrics: [
              {
                name: 'Guardados',
                values: {
                  month: { anterior: 800, actual: 1000 },
                  week: { anterior: 200, actual: 250 },
                  day: { anterior: 30, actual: 35 }
                }
              },
              {
                name: 'Clics',
                values: {
                  month: { anterior: 5000, actual: 5500 },
                  week: { anterior: 1250, actual: 1375 },
                  day: { anterior: 180, actual: 195 }
                }
              },
              {
                name: 'Comentarios',
                values: {
                  month: { anterior: 250, actual: 300 },
                  week: { anterior: 62, actual: 75 },
                  day: { anterior: 8, actual: 10 }
                }
              }
            ]
          },
          {
            category: 'Conversiones',
            metrics: [
              {
                name: 'Visitas al Sitio Web',
                values: {
                  month: { anterior: 4000, actual: 4500 },
                  week: { anterior: 1000, actual: 1125 },
                  day: { anterior: 140, actual: 160 }
                }
              },
              {
                name: 'Leads',
                values: {
                  month: { anterior: 200, actual: 250 },
                  week: { anterior: 50, actual: 62 },
                  day: { anterior: 7, actual: 9 }
                }
              },
              {
                name: 'Ventas',
                values: {
                  month: { anterior: 100, actual: 120 },
                  week: { anterior: 25, actual: 30 },
                  day: { anterior: 3, actual: 4 }
                }
              }
            ]
          },
          {
            category: 'Otros KPIs',
            metrics: [
              {
                name: 'Tasa de Clics (CTR)',
                values: {
                  month: { anterior: 0.25, actual: 0.27 },
                  week: { anterior: 0.26, actual: 0.28 },
                  day: { anterior: 0.27, actual: 0.29 }
                }
              },
              {
                name: 'Coste por Clic (CPC)',
                values: {
                  month: { anterior: 0.2, actual: 0.18 },
                  week: { anterior: 0.21, actual: 0.19 },
                  day: { anterior: 0.22, actual: 0.20 }
                }
              },
              {
                name: 'Coste por Adquisición (CPA)',
                values: {
                  month: { anterior: 1.2, actual: 1.1 },
                  week: { anterior: 1.25, actual: 1.15 },
                  day: { anterior: 1.3, actual: 1.2 }
                }
              }
            ]
          }
        ]
      },
      {
        socialMedia: 'twitter',
        KPIs: [
          {
            category: 'Alcance',
            metrics: [
              {
                name: 'Impresiones',
                values: {
                  month: { anterior: 25000, actual: 27000 },
                  week: { anterior: 6250, actual: 6750 },
                  day: { anterior: 890, actual: 950 }
                }
              },
              {
                name: 'Alcance',
                values: {
                  month: { anterior: 20000, actual: 22000 },
                  week: { anterior: 5000, actual: 5500 },
                  day: { anterior: 710, actual: 770 }
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
                  month: { anterior: 10000, actual: 10500 },
                  week: { anterior: 2500, actual: 2625 },
                  day: { anterior: 357, actual: 375 }
                }
              },
              {
                name: 'Retweets',
                values: {
                  month: { anterior: 4000, actual: 4200 },
                  week: { anterior: 1000, actual: 1050 },
                  day: { anterior: 143, actual: 150 }
                }
              },
              {
                name: 'Respuestas',
                values: {
                  month: { anterior: 3000, actual: 3150 },
                  week: { anterior: 750, actual: 787 },
                  day: { anterior: 107, actual: 112 }
                }
              },
              {
                name: 'Citas',
                values: {
                  month: { anterior: 2000, actual: 2100 },
                  week: { anterior: 500, actual: 525 },
                  day: { anterior: 71, actual: 75 }
                }
              }
            ]
          },
          {
            category: 'Conversiones',
            metrics: [
              {
                name: 'Clics en enlaces',
                values: {
                  month: { anterior: 6000, actual: 6300 },
                  week: { anterior: 1500, actual: 1575 },
                  day: { anterior: 214, actual: 225 }
                }
              },
              {
                name: 'Leads',
                values: {
                  month: { anterior: 250, actual: 275 },
                  week: { anterior: 62, actual: 68 },
                  day: { anterior: 9, actual: 10 }
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
                name: 'Tasa de Engagement',
                values: {
                  month: { anterior: 0.1, actual: 0.11 },
                  week: { anterior: 0.102, actual: 0.112 },
                  day: { anterior: 0.103, actual: 0.113 }
                }
              },
              {
                name: 'Tasa de Crecimiento de Seguidores',
                values: {
                  month: { anterior: 0.05, actual: 0.052 },
                  week: { anterior: 0.051, actual: 0.053 },
                  day: { anterior: 0.052, actual: 0.054 }
                }
              },
              {
                name: 'Coste por Clic (CPC)',
                values: {
                  month: { anterior: 0.3, actual: 0.28 },
                  week: { anterior: 0.31, actual: 0.29 },
                  day: { anterior: 0.32, actual: 0.30 }
                }
              },
              {
                name: 'Coste por Adquisición (CPA)',
                values: {
                  month: { anterior: 1.8, actual: 1.7 },
                  week: { anterior: 1.85, actual: 1.75 },
                  day: { anterior: 1.9, actual: 1.8 }
                }
              }
            ]
          }
        ]
      },
      {
        socialMedia: 'youtube',
        KPIs: [
          {
            category: 'Alcance',
            metrics: [
              {
                name: 'Visitas',
                values: {
                  month: { anterior: 50000, actual: 55000 },
                  week: { anterior: 12500, actual: 13750 },
                  day: { anterior: 1785, actual: 1960 }
                }
              },
              {
                name: 'Impresiones',
                values: {
                  month: { anterior: 120000, actual: 130000 },
                  week: { anterior: 30000, actual: 32500 },
                  day: { anterior: 4285, actual: 4640 }
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
                  month: { anterior: 15000, actual: 15750 },
                  week: { anterior: 3750, actual: 3937 },
                  day: { anterior: 535, actual: 564 }
                }
              },
              {
                name: 'No me gusta',
                values: {
                  month: { anterior: 1000, actual: 1050 },
                  week: { anterior: 250, actual: 262 },
                  day: { anterior: 35, actual: 37 }
                }
              },
              {
                name: 'Comentarios',
                values: {
                  month: { anterior: 4000, actual: 4200 },
                  week: { anterior: 1000, actual: 1050 },
                  day: { anterior: 142, actual: 150 }
                }
              },
              {
                name: 'Compartidos',
                values: {
                  month: { anterior: 2500, actual: 2625 },
                  week: { anterior: 625, actual: 656 },
                  day: { anterior: 89, actual: 93 }
                }
              }
            ]
          },
          {
            category: 'Conversiones',
            metrics: [
              {
                name: 'Clics en enlaces',
                values: {
                  month: { anterior: 7000, actual: 7350 },
                  week: { anterior: 1750, actual: 1837 },
                  day: { anterior: 250, actual: 263 }
                }
              },
              {
                name: 'Leads',
                values: {
                  month: { anterior: 350, actual: 368 },
                  week: { anterior: 87, actual: 92 },
                  day: { anterior: 12, actual: 13 }
                }
              },
              {
                name: 'Ventas',
                values: {
                  month: { anterior: 200, actual: 210 },
                  week: { anterior: 50, actual: 52 },
                  day: { anterior: 7, actual: 7.5 }
                }
              }
            ]
          },
          {
            category: 'Otros KPIs',
            metrics: [
              {
                name: 'Tiempo de visualización',
                values: {
                  month: { anterior: 150000, actual: 157500 },
                  week: { anterior: 37500, actual: 39375 },
                  day: { anterior: 5357, actual: 5642 }
                }
              },
              {
                name: 'Tasa de retención de audiencia',
                values: {
                  month: { anterior: 0.45, actual: 0.47 },
                  week: { anterior: 0.46, actual: 0.48 },
                  day: { anterior: 0.47, actual: 0.49 }
                }
              },
              {
                name: 'Tasa de crecimiento de suscriptores',
                values: {
                  month: { anterior: 0.1, actual: 0.11 },
                  week: { anterior: 0.102, actual: 0.112 },
                  day: { anterior: 0.103, actual: 0.113 }
                }
              },
              {
                name: 'Coste por clic (CPC)',
                values: {
                  month: { anterior: 0.2, actual: 0.19 },
                  week: { anterior: 0.21, actual: 0.20 },
                  day: { anterior: 0.22, actual: 0.21 }
                }
              },
              {
                name: 'Coste por adquisición (CPA)',
                values: {
                  month
                    : { anterior: 2.0, actual: 1.9 },
                  week: { anterior: 2.1, actual: 2.0 },
                  day: { anterior: 2.2, actual: 2.1 }
                }
              }
            ]
          }
        ]
      },
      {
        socialMedia: 'linkedin',
        KPIs: [
          {
            category: 'Alcance',
            metrics: [
              {
                name: 'Impresiones',
                values: {
                  month: { anterior: 30000, actual: 33000 },
                  week: { anterior: 7500, actual: 8250 },
                  day: { anterior: 1000, actual: 1100 }
                }
              },
              {
                name: 'Visitas al perfil',
                values: {
                  month: { anterior: 5000, actual: 5500 },
                  week: { anterior: 1250, actual: 1375 },
                  day: { anterior: 180, actual: 195 }
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
                  month: { anterior: 2000, actual: 2200 },
                  week: { anterior: 500, actual: 550 },
                  day: { anterior: 70, actual: 75 }
                }
              },
              {
                name: 'Comentarios',
                values: {
                  month: { anterior: 1000, actual: 1100 },
                  week: { anterior: 250, actual: 275 },
                  day: { anterior: 35, actual: 38 }
                }
              },
              {
                name: 'Compartidos',
                values: {
                  month: { anterior: 800, actual: 880 },
                  week: { anterior: 200, actual: 220 },
                  day: { anterior: 28, actual: 31 }
                }
              }
            ]
          },
          {
            category: 'Conversiones',
            metrics: [
              {
                name: 'Clics en enlaces',
                values: {
                  month: { anterior: 4000, actual: 4400 },
                  week: { anterior: 1000, actual: 1100 },
                  day: { anterior: 140, actual: 155 }
                }
              },
              {
                name: 'Leads',
                values: {
                  month: { anterior: 300, actual: 330 },
                  week: { anterior: 75, actual: 82 },
                  day: { anterior: 10, actual: 11 }
                }
              },
              {
                name: 'Ventas',
                values: {
                  month: { anterior: 150, actual: 165 },
                  week: { anterior: 37, actual: 41 },
                  day: { anterior: 5, actual: 5.5 }
                }
              }
            ]
          },
          {
            category: 'Otros KPIs',
            metrics: [
              {
                name: 'Tasa de Engagement',
                values: {
                  month: { anterior: 0.05, actual: 0.055 },
                  week: { anterior: 0.051, actual: 0.056 },
                  day: { anterior: 0.052, actual: 0.057 }
                }
              },
              {
                name: 'Tasa de Crecimiento de Seguidores',
                values: {
                  month: { anterior: 0.03, actual: 0.033 },
                  week: { anterior: 0.031, actual: 0.034 },
                  day: { anterior: 0.032, actual: 0.035 }
                }
              },
              {
                name: 'Coste por Clic (CPC)',
                values: {
                  month: { anterior: 0.4, actual: 0.38 },
                  week: { anterior: 0.41, actual: 0.39 },
                  day: { anterior: 0.42, actual: 0.4 }
                }
              },
              {
                name: 'Coste por Adquisición (CPA)',
                values: {
                  month: { anterior: 2.5, actual: 2.3 },
                  week: { anterior: 2.55, actual: 2.35 },
                  day: { anterior: 2.6, actual: 2.4 }
                }
              }
            ]
          }
        ]
      },
      {
        socialMedia: 'instagram',
        KPIs: [
          {
            category: 'Alcance',
            metrics: [
              {
                name: 'Alcance Total',
                values: {
                  month: { anterior: 70000, actual: 77000 },
                  week: { anterior: 17500, actual: 19250 },
                  day: { anterior: 2500, actual: 2750 }
                }
              },
              {
                name: 'Alcance Único',
                values: {
                  month: { anterior: 50000, actual: 55000 },
                  week: { anterior: 12500, actual: 13750 },
                  day: { anterior: 1800, actual: 1950 }
                }
              },
              {
                name: 'Impresiones',
                values: {
                  month: { anterior: 120000, actual: 132000 },
                  week: { anterior: 30000, actual: 33000 },
                  day: { anterior: 4300, actual: 4700 }
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
                  month: { anterior: 20000, actual: 21000 },
                  week: { anterior: 5000, actual: 5250 },
                  day: { anterior: 714, actual: 750 }
                }
              },
              {
                name: 'Comentarios',
                values: {
                  month: { anterior: 3000, actual: 3300 },
                  week: { anterior: 750, actual: 825 },
                  day: { anterior: 107, actual: 118 }
                }
              },
              {
                name: 'Compartidos',
                values: {
                  month: { anterior: 1500, actual: 1650 },
                  week: { anterior: 375, actual: 412 },
                  day: { anterior: 53, actual: 59 }
                }
              },
              {
                name: 'Guardados',
                values: {
                  month: { anterior: 4000, actual: 4400 },
                  week: { anterior: 1000, actual: 1100 },
                  day: { anterior: 143, actual: 157 }
                }
              }
            ]
          },
          {
            category: 'Visualizaciones',
            metrics: [
              {
                name: 'Visualizaciones Totales',
                values: {
                  month: { anterior: 80000, actual: 88000 },
                  week: { anterior: 20000, actual: 22000 },
                  day: { anterior: 2857, actual: 3143 }
                }
              },
              {
                name: 'Visualizaciones Promedio',
                values: {
                  month: { anterior: 1000, actual: 1100 },
                  week: { anterior: 250, actual: 275 },
                  day: { anterior: 35, actual: 39 }
                }
              },
              {
                name: 'Tasa de Visualización',
                values: {
                  month: { anterior: 0.5, actual: 0.55 },
                  week: { anterior: 0.52, actual: 0.57 },
                  day: { anterior: 0.54, actual: 0.59 }
                }
              }
            ]
          },
          {
            category: 'Seguidores',
            metrics: [
              {
                name: 'Número de Seguidores',
                values: {
                  month: { anterior: 10000, actual: 10500 },
                  week: { anterior: 2500, actual: 2625 },
                  day: { anterior: 357, actual: 375 }
                }
              },
              {
                name: 'Tasa de Crecimiento de Seguidores',
                values: {
                  month: { anterior: 0.02, actual: 0.021 },
                  week: { anterior: 0.0205, actual: 0.0215 },
                  day: { anterior: 0.0207, actual: 0.0217 }
                }
              }
            ]
          },
          {
            category: 'Conversiones',
            metrics: [
              {
                name: 'Clics en Enlaces',
                values: {
                  month: { anterior: 5000, actual: 5500 },
                  week: { anterior: 1250, actual: 1375 },
                  day: { anterior: 178, actual: 196 }
                }
              },
              {
                name: 'Leads',
                values: {
                  month: { anterior: 400, actual: 440 },
                  week: { anterior: 100, actual: 110 },
                  day: { anterior: 14, actual: 16 }
                }
              },
              {
                name: 'Ventas',
                values: {
                  month: { anterior: 250, actual: 275 },
                  week: { anterior: 62, actual: 68 },
                  day: { anterior: 9, actual: 10 }
                }
              }
            ]
          },
          {
            category: 'Otros KPIs',
            metrics: [
              {
                name: 'Tasa de Engagement',
                values: {
                  month: { anterior: 0.15, actual: 0.16 },
                  week: { anterior: 0.152, actual: 0.162 },
                  day: { anterior: 0.153, actual: 0.163 }
                }
              },
              {
                name: 'Coste por Clic (CPC)',
                values: {
                  month: { anterior: 0.25, actual: 0.23 },
                  week: { anterior: 0.26, actual: 0.24 },
                  day: { anterior: 0.27, actual: 0.25 }
                }
              },
              {
                name: 'Coste por Adquisición (CPA)',
                values: {
                  month: { anterior: 2.2, actual: 2.0 },
                  week: { anterior: 2.25, actual: 2.05 },
                  day: { anterior: 2.3, actual: 2.1 }
                }
              }
            ]
          }
        ]
      }





      // Aquí podrías añadir otros medios sociales siguiendo el mismo patrón
    ];
    // tu código existente para inicializar kpisData y allCategories
    this.allCategories = Array.from(new Set(this.kpisData.flatMap(kpi => kpi.KPIs.map(kpiCategory => kpiCategory.category))));

    // Establece todas las categorías como seleccionadas por defecto
    this.selectedCategories = [...this.allCategories];
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



  setTimeFilter(filter: 'month' | 'week' | 'day') {
    this.timeFilter = filter;
    const selectedSocialMediaName = this.selectedSocialMedias.size > 0 ? Array.from(this.selectedSocialMedias)[0] : null;
    this.updateCurrentTitle(selectedSocialMediaName, filter);
    this.applyFilters();
  }


  updateCurrentTitle(socialMediaName: string | null, timeFilter: 'month' | 'week' | 'day') {
    let timeFilterText = '';
    switch (timeFilter) {
      case 'month':
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
