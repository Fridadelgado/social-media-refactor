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
  timeFilter: 'month' | 'quarter' | 'day' = 'month';

  ngOnInit() {
    this.kpisData = [
      { socialMedia: 'facebook', period: 'month', name: "Likes", value: 894, total: 1000, monthDifference: "+5%" },
      { socialMedia: 'twitter', period: 'month', name: "Retweets", value: 500, total: 800, monthDifference: "-2%" },
      { socialMedia: 'instagram', period: 'quarter', name: "Followers", value: 7200, total: 8000, quarterDifference: "+10%" },
      { socialMedia: 'youtube', period: 'day', name: "Views", value: 52000, total: 60000, dayDifference: "+3%" },
      // Añade más datos simulados según sea necesario
    ];

    this.applyFilters();
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


  setTimeFilter(filter: 'month' | 'quarter' | 'day') {
    this.timeFilter = filter;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredKpisData = this.kpisData.filter(kpi =>
      (this.selectedSocialMedias.size === 0 || this.selectedSocialMedias.has(kpi.socialMedia)) &&
      kpi.period === this.timeFilter
    );
  }
}
