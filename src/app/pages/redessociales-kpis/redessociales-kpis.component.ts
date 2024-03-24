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
  availableSocialMedias: string[] = ['facebook', 'twitter', 'instagram', 'youtube'];
  timeFilter: 'month' | 'quarter' | 'day' = 'month';

  socialMediaImages: { [key: string]: string } = {
    facebook: 'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-0.png',
    twitter: 'https://img.freepik.com/vector-gratis/nuevo-diseno-icono-x-logotipo-twitter-2023_1017-45418.jpg?size=338&ext=jpg',
    instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png',
    linkedin: 'https://cdn-icons-png.flaticon.com/256/174/174857.png',
    tiktok: 'https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_640.png',
    pinterest: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
    youtube: 'https://w7.pngwing.com/pngs/982/799/png-transparent-youtube-logo-youtube-logo-internet-marketing-subscribe-television-label-text.png'
  };



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

  toggleSocialMedia(socialMedia: string) {
    if (this.selectedSocialMedias.has(socialMedia)) {
      this.selectedSocialMedias.delete(socialMedia);
    } else {
      this.selectedSocialMedias.add(socialMedia);
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
