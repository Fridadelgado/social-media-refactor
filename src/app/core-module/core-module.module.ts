import { NgModule } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@NgModule({
  // Aunque este módulo no importa o exporta otros módulos Angular,
  // puede contener proveedores o declaraciones si fuera necesario.
  imports: [],
  exports: [],
  providers: [],
})
export class CoreModule {
  // El constructor inyecta NbIconLibraries, un servicio de Nebular para manejar bibliotecas de íconos.
  constructor(private iconLibraries: NbIconLibraries) {
    // Registra un paquete de íconos SVG personalizados bajo el nombre 'seekop'.
    // Aquí se definen varios íconos con su respectivo SVG.
    // Cada ícono se identifica por una clave (p.ej., 'custom-home', 'account-alert-primary') y su valor es el SVG correspondiente.
    this.iconLibraries.registerSvgPack('seekop', {
      'custom-home': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14C14.42 14 18 15.79 18 18V20H2V18C2 15.79 5.58 14 10 14M20 12V7H22V13H20M20 17V15H22V17H20Z" fill="#FFFF" /></svg>',
      'account-alert-primary': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10 4A4 4 0 0 1 14 8A4 4 0 0 1 10 12A4 4 0 0 1 6 8A4 4 0 0 1 10 4M10 14C14.42 14 18 15.79 18 18V20H2V18C2 15.79 5.58 14 10 14M20 12V7H22V13H20M20 17V15H22V17H20Z" fill="#8095BF" /></svg>',
      'mdi-megamenu': '<svg id="mdi-megamenu" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path id="Trazado_408" data-name="Trazado 408" d="M22.02,2.02a20,20,0,1,0,20,20,20,20,0,0,0-20-20Zm0,35.992A15.992,15.992,0,1,1,38.012,22.02,16.011,16.011,0,0,1,22.02,38.012Zm1.5-30.02L14.5,25.026H20.8V36.048l8.737-17.034H23.523Z" transform="translate(-2.02 -2.02)" fill="#a3bd36"/></svg>',
      'mdi-home-outline': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 40 35"><path id="mdi-home-outline" d="M22,8.538,32,17.8V33.882H28V21.529H16V33.882H12V17.8L22,8.538ZM22,3,2,21.529H8V38H20V25.647h4V38H36V21.529h6Z" transform="translate(-2 -3)" fill="currentColor"/></svg>',
      'calendar-text-outline': '<svg style="vertical-align: baseline" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m0 16H5V9h14v10M5 7V5h14v2H5m2 4h10v2H7v-2m0 4h7v2H7v-2Z" /></svg>',
      'account-voice': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 30 25"><path d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z"  fill="#A3BD36" /></svg>',
      'mdi-bell-success': '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="35" viewBox="0 0 24.099 29.37"><path id="mdi-bell" d="M20.049,34.37a3.012,3.012,0,0,0,3.012-3.012H17.037A3.012,3.012,0,0,0,20.049,34.37Zm9.037-9.037V17.8c0-4.631-2.463-8.495-6.778-9.519V7.259a2.259,2.259,0,0,0-4.519,0V8.283c-4.315,1.024-6.778,4.888-6.778,9.519v7.531L8,28.346v1.506H32.1V28.346Z" transform="translate(-8 -5)" fill="#A3BD36"/></svg>',
      'text-box-plus-outline-success': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17,14H19V17H22V19H19V22H17V19H14V17H17V14M5,3H19C20.11,3 21,3.89 21,5V12.8C20.39,12.45 19.72,12.2 19,12.08V5H5V19H12.08C12.2,19.72 12.45,20.39 12.8,21H5C3.89,21 3,20.11 3,19V5C3,3.89 3.89,3 5,3M7,7H17V9H7V7M7,11H17V12.08C16.15,12.22 15.37,12.54 14.68,13H7V11M7,15H12V17H7V15Z" fill="currentColor" /></svg>',
      'comment-send': '<svg xmlns="http://www.w3.org/2000/svg" width="41.25" height="30" viewBox="0 0 41.25 30"><path id="comment-send" d="M16.875,5a3.761,3.761,0,0,0-3.75,3.75V35l7.5-7.5H37.5a3.761,3.761,0,0,0,3.75-3.75v-15A3.761,3.761,0,0,0,37.5,5H16.875M5.625,8.75A1.771,1.771,0,0,0,3.75,10.625,1.771,1.771,0,0,0,5.625,12.5h3.75V8.75H5.625m15,1.875h15v3.75h-15v-3.75M3.75,16.25a1.771,1.771,0,0,0-1.875,1.875A1.771,1.771,0,0,0,3.75,20H9.375V16.25H3.75m16.875,1.875H30v3.75H20.625v-3.75M1.875,23.75a1.875,1.875,0,0,0,0,3.75h7.5V23.75Z" transform="translate(0 -5)" fill="currentColor"/></svg>',
      'mdi-cloud-upload-outline': '<svg id="mdi-cloud-upload-outline" xmlns="http://www.w3.org/2000/svg" width="45" height="30" viewBox="0 0 45 30"><path id="Trazado_3853" data-name="Trazado 3853" d="M36.281,15.325a14.048,14.048,0,0,0-26.25-3.75A11.245,11.245,0,0,0,11.25,34H35.625a9.348,9.348,0,0,0,.656-18.675ZM35.625,30.25H11.25a7.494,7.494,0,0,1-.825-14.944l2.006-.206.938-1.781a10.288,10.288,0,0,1,19.237,2.738l.563,2.813,2.869.206a5.594,5.594,0,0,1-.412,11.175ZM15,20.875h4.781V26.5h5.438V20.875H30l-7.5-7.5Z" transform="translate(0 -4)" fill="currentColor"/></svg>',
      'mdi-account-group-primary': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="24.167" viewBox="0 0 40 24.167"><path id="mdi-account-group" d="M20,5.5a5.833,5.833,0,1,1-5.833,5.833A5.833,5.833,0,0,1,20,5.5M8.333,9.667a4.92,4.92,0,0,1,2.55.7,9.227,9.227,0,0,0,1.883,6.6,5,5,0,1,1-4.433-7.3m23.333,0a5,5,0,1,1-4.433,7.3,9.227,9.227,0,0,0,1.883-6.6,4.92,4.92,0,0,1,2.55-.7M9.167,26.75c0-3.45,4.85-6.25,10.833-6.25s10.833,2.8,10.833,6.25v2.917H9.167V26.75M0,29.667v-2.5C0,24.85,3.15,22.9,7.417,22.333A6.74,6.74,0,0,0,5.833,26.75v2.917H0m40,0H34.167V26.75a6.74,6.74,0,0,0-1.583-4.417C36.85,22.9,40,24.85,40,27.167Z" transform="translate(0 -5.5)" fill="currentColor" /></svg>'
      // ... más íconos definidos aquí ...
      // Es importante asegurarse de que las URLs de imágenes o los datos SVG incrustados sean correctos
      // y que los íconos se muestren según lo esperado en la aplicación.
    });
  }
}
