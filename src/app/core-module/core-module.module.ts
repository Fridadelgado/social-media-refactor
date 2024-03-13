import { NgModule } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class CoreModule {
  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerSvgPack('seekop', {
      'custom-home': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14C14.42 14 18 15.79 18 18V20H2V18C2 15.79 5.58 14 10 14M20 12V7H22V13H20M20 17V15H22V17H20Z" fill="#FFFF" /></svg>',
      'account-alert-primary': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14C14.42 14 18 15.79 18 18V20H2V18C2 15.79 5.58 14 10 14M20 12V7H22V13H20M20 17V15H22V17H20Z" fill="#8095BF" /></svg>',
      'mdi-megamenu': '<svg id="mdi-megamenu" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path id="Trazado_408" data-name="Trazado 408" d="M22.02,2.02a20,20,0,1,0,20,20,20,20,0,0,0-20-20Zm0,35.992A15.992,15.992,0,1,1,38.012,22.02,16.011,16.011,0,0,1,22.02,38.012Zm1.5-30.02L14.5,25.026H20.8V36.048l8.737-17.034H23.523Z" transform="translate(-2.02 -2.02)" fill="#a3bd36"/></svg>',
      'mdi-home-outline': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35"><path id="mdi-home-outline" d="M22,8.538,32,17.8V33.882H28V21.529H16V33.882H12V17.8L22,8.538ZM22,3,2,21.529H8V38H20V25.647h4V38H36V21.529h6Z" transform="translate(-2 -3)" fill="currentColor"/></svg>',
      'calendar-text-outline': '<svg style="vertical-align: baseline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m0 16H5V9h14v10M5 7V5h14v2H5m2 4h10v2H7v-2m0 4h7v2H7v-2Z" /></svg>',
      'account-voice': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 30 25"><path d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z"  fill="#A3BD36" /></svg>',
      'mdi-bell-success': '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" viewBox="0 0 24.099 29.37"><path id="mdi-bell" d="M20.049,34.37a3.012,3.012,0,0,0,3.012-3.012H17.037A3.012,3.012,0,0,0,20.049,34.37Zm9.037-9.037V17.8c0-4.631-2.463-8.495-6.778-9.519V7.259a2.259,2.259,0,0,0-4.519,0V8.283c-4.315,1.024-6.778,4.888-6.778,9.519v7.531L8,28.346v1.506H32.1V28.346Z" transform="translate(-8 -5)" fill="#A3BD36"/></svg>',
      'text-box-plus-outline-success': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,14H19V17H22V19H19V22H17V19H14V17H17V14M5,3H19C20.11,3 21,3.89 21,5V12.8C20.39,12.45 19.72,12.2 19,12.08V5H5V19H12.08C12.2,19.72 12.45,20.39 12.8,21H5C3.89,21 3,20.11 3,19V5C3,3.89 3.89,3 5,3M7,7H17V9H7V7M7,11H17V12.08C16.15,12.22 15.37,12.54 14.68,13H7V11M7,15H12V17H7V15Z" fill="currentColor" /></svg>'



    });
  }
}
