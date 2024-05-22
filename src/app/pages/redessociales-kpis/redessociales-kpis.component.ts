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

interface FilteredKpi {
  category: string;
  name: string;
  socialMedia: string;
  values: KpiValue;
}

@Component({
  selector: 'app-redessociales-kpis',
  templateUrl: './redessociales-kpis.component.html',
  styleUrls: ['./redessociales-kpis.component.scss']
})
export class RedesSocialesKpisComponent implements OnInit {
  kpisData: SocialMediaKpi[] = [];
  groupedKpisData: any[] = [];
  filteredKpisData: FilteredKpi[] = [];  // Explicitly defining the type
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
        this.kpisData = Array.isArray(data) ? data : [];
        this.allCategories = Array.from(new Set(this.kpisData.reduce((acc, kpi) => {
          kpi.KPIs.forEach(kpiCategory => acc.push(kpiCategory.category));
          return acc;
        }, [] as string[])));
        this.selectedCategories = [...this.allCategories];
        this.applyFilters();  // Aplica filtros iniciales o actualiza la vista
      },
      error => {
        console.error('Error loading KPIs from Facebook:', error);
      }
    );
  }

  toggleSocialMedia(selectedSocialMedia: any) {
    this.availableSocialMedias.forEach(socialMedia => {
      if (socialMedia.name === selectedSocialMedia.name) {
        socialMedia.selected = !socialMedia.selected;
      } else {
        socialMedia.selected = false;
      }
    });

    this.selectedSocialMedias.clear();
    if (selectedSocialMedia.selected) {
      this.selectedSocialMedias.add(selectedSocialMedia.name);
      this.updateCurrentTitle(selectedSocialMedia.name, this.timeFilter);
    } else {
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
    this.filteredKpisData = [];
    let categoriesForSelectedSocials = new Set<string>();

    this.kpisData.forEach(socialMediaData => {
      if (this.selectedSocialMedias.has(socialMediaData.socialMedia)) {
        socialMediaData.KPIs.forEach(category => {
          categoriesForSelectedSocials.add(category.category);
        });

        const filteredData = socialMediaData.KPIs
          .filter(category => this.selectedCategories.includes(category.category))
          .reduce((acc, category: KpiCategory) => {
            category.metrics
              .filter((metric: KpiMetric) => metric.values[this.timeFilter].actual !== 0 || metric.values[this.timeFilter].anterior !== 0)
              .forEach((metric: KpiMetric) => {
                acc.push({
                  category: category.category,
                  name: metric.name,
                  socialMedia: socialMediaData.socialMedia,
                  values: metric.values[this.timeFilter],
                });
              });
            return acc;
          }, [] as FilteredKpi[]);
        this.filteredKpisData.push(...filteredData);
      }
    });

    this.allCategories = Array.from(categoriesForSelectedSocials);
    this.transformKpisDataForCategories();
  }

  transformKpisDataForCategories() {
    const categoriesMap = new Map<string, FilteredKpi[]>();

    this.filteredKpisData.forEach(kpi => {
      if (!categoriesMap.has(kpi.category)) {
        categoriesMap.set(kpi.category, []);
      }
      categoriesMap.get(kpi.category)?.push(kpi);
    });

    this.groupedKpisData = Array.from(categoriesMap, ([category, kpis]) => ({ category, kpis }));
  }
}
