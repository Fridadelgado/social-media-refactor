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
      'mdi-account-group-primary': '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="24.167" viewBox="0 0 40 24.167"><path id="mdi-account-group" d="M20,5.5a5.833,5.833,0,1,1-5.833,5.833A5.833,5.833,0,0,1,20,5.5M8.333,9.667a4.92,4.92,0,0,1,2.55.7,9.227,9.227,0,0,0,1.883,6.6,5,5,0,1,1-4.433-7.3m23.333,0a5,5,0,1,1-4.433,7.3,9.227,9.227,0,0,0,1.883-6.6,4.92,4.92,0,0,1,2.55-.7M9.167,26.75c0-3.45,4.85-6.25,10.833-6.25s10.833,2.8,10.833,6.25v2.917H9.167V26.75M0,29.667v-2.5C0,24.85,3.15,22.9,7.417,22.333A6.74,6.74,0,0,0,5.833,26.75v2.917H0m40,0H34.167V26.75a6.74,6.74,0,0,0-1.583-4.417C36.85,22.9,40,24.85,40,27.167Z" transform="translate(0 -5.5)" fill="currentColor" /></svg>',
      'finance-primary': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,16.5L3,19.44V11H6M11,14.66L9.43,13.32L8,14.64V7H11M16,13L13,16V3H16M18.81,12.81L17,11H22V16L20.21,14.21L13,21.36L9.53,18.34L5.75,22H3L9.47,15.66L13,18.64" fill="currentColor" /></svg>',
      'calendar-day': '<svg id="calendar-day" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 30 33.333"><text id="_1" data-name="1" transform="translate(12.5 27.333)" fill="#002a7f" font-size="12" font-family="Montserrat-Black, Montserrat" font-weight="800"><tspan x="0" y="0">1</tspan></text><g id="Grupo_2463" data-name="Grupo 2463"><path id="Trazado_3877" data-name="Trazado 3877" d="M5,5H29.078V7.238H5Z" transform="translate(-2.031 1.703)" fill="#002a7f" opacity="0.3"/><path id="Trazado_3878" data-name="Trazado 3878" d="M29.667,4.333H28V1H24.667V4.333H11.333V1H8V4.333H6.333A3.343,3.343,0,0,0,3,7.667V31a3.343,3.343,0,0,0,3.333,3.333H29.667A3.343,3.343,0,0,0,33,31V7.667A3.343,3.343,0,0,0,29.667,4.333Zm0,26.667H6.333V14.333H29.667Zm0-20H6.333V7.667H29.667Z" transform="translate(-3 -1)" fill="#002a7f"/></g></svg>',
      'calendar-month': '<svg id="calendar-month" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 30 33.333"><text id="_30" data-name="30" transform="translate(7.636 27.333)" fill="#002a7f" font-size="12" font-family="Montserrat-Black, Montserrat" font-weight="800"><tspan x="0" y="0">30</tspan></text><g id="Grupo_2465" data-name="Grupo 2465"><path id="Trazado_3877" data-name="Trazado 3877" d="M5,5H29.031V7.253H5Z" transform="translate(-2.031 1.686)" fill="#002a7f" opacity="0.3"/><path id="Trazado_3878" data-name="Trazado 3878" d="M29.667,4.333H28V1H24.667V4.333H11.333V1H8V4.333H6.333A3.343,3.343,0,0,0,3,7.667V31a3.343,3.343,0,0,0,3.333,3.333H29.667A3.343,3.343,0,0,0,33,31V7.667A3.343,3.343,0,0,0,29.667,4.333Zm0,26.667H6.333V14.333H29.667Zm0-20H6.333V7.667H29.667Z" transform="translate(-3 -1)" fill="#002a7f"/></g></svg>',
      'calendar-week': '<svg id="calendar-week" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 30 33.333"><text id="_7" data-name="7" transform="translate(11.579 27.333)" fill="#002a7f" font-size="12" font-family="Montserrat-Black, Montserrat" font-weight="800"><tspan x="0" y="0">7</tspan></text><g id="Grupo_2464" data-name="Grupo 2464"><path id="Trazado_3877" data-name="Trazado 3877" d="M5,5H29.016V7.238H5Z" transform="translate(-2 1.703)" fill="#002a7f" opacity="0.3"/><path id="Trazado_3878" data-name="Trazado 3878" d="M29.667,4.333H28V1H24.667V4.333H11.333V1H8V4.333H6.333A3.343,3.343,0,0,0,3,7.667V31a3.343,3.343,0,0,0,3.333,3.333H29.667A3.343,3.343,0,0,0,33,31V7.667A3.343,3.343,0,0,0,29.667,4.333Zm0,26.667H6.333V14.333H29.667Zm0-20H6.333V7.667H29.667Z" transform="translate(-3 -1)" fill="#002a7f"/></g></svg>',
      'facebook-icon': '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"/></svg>',
      'tiktok-icon': '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"/></svg>',
      'instagram-icon': '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"/></svg>',
      'youtube-icon': '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M 9 4 C 6.24 4 4 6.24 4 9 L 4 41 C 4 43.76 6.24 46 9 46 L 41 46 C 43.76 46 46 43.76 46 41 L 46 9 C 46 6.24 43.76 4 41 4 L 9 4 z M 15 8 L 17.400391 8 L 19 12 L 20.599609 8 L 23 8 L 20 15 L 20 19 L 18 19 L 18 14.990234 C 17.4 13.380234 15.41 9.01 15 8 z M 25 11 C 25.89 11 26.770078 11.269219 27.330078 11.949219 C 27.760078 12.439219 28 13.229531 28 14.269531 L 28 15.730469 C 28 16.770469 27.800859 17.490469 27.380859 17.980469 C 26.820859 18.650469 25.89 19 25 19 C 24.11 19 23.200625 18.650469 22.640625 17.980469 C 22.210625 17.490469 22 16.770469 22 15.730469 L 22 14.279297 C 22 13.239297 22.229922 12.439219 22.669922 11.949219 C 23.229922 11.269219 23.99 11 25 11 z M 29 11 L 31 11 L 31 17 C 31.05 17.27 31.339375 17.390625 31.609375 17.390625 C 32.019375 17.390625 32.54 16.910859 33 16.380859 L 33 11 L 35 11 L 35 19 L 33 19 L 33 17.619141 C 32.19 18.409141 31.499844 19.000703 30.589844 18.970703 C 29.929844 18.950703 29.470234 18.710469 29.240234 18.230469 C 29.100234 17.950469 29 17.499844 29 16.839844 L 29 11 z M 25 12.619141 C 24.8625 12.619141 24.730859 12.649297 24.611328 12.701172 C 24.491797 12.753047 24.383594 12.827422 24.292969 12.919922 C 24.202344 13.012422 24.128906 13.122266 24.078125 13.244141 C 24.027344 13.366016 24 13.500625 24 13.640625 L 24 16.449219 C 24 16.729219 24.111719 16.984922 24.292969 17.169922 C 24.383594 17.262422 24.491797 17.336797 24.611328 17.388672 C 24.730859 17.440547 24.8625 17.470703 25 17.470703 C 25.1375 17.470703 25.269141 17.440547 25.388672 17.388672 C 25.747266 17.233047 26 16.869219 26 16.449219 L 26 13.640625 C 26 13.080625 25.55 12.619141 25 12.619141 z M 24.990234 22 L 25.009766 22 C 25.009766 22 31.719219 22.000312 36.199219 22.320312 C 36.829219 22.390313 38.190156 22.400391 39.410156 23.650391 C 40.370156 24.590391 40.679688 26.75 40.679688 26.75 C 40.679688 26.75 41 28.280547 41 30.810547 L 41 33.179688 C 41 35.709688 40.679688 37.240234 40.679688 37.240234 C 40.679688 37.240234 40.370156 39.399844 39.410156 40.339844 C 38.190156 41.589844 36.829219 41.599922 36.199219 41.669922 C 31.719219 41.989922 25 42 25 42 C 25 42 16.679141 41.919688 14.119141 41.679688 C 13.409141 41.549687 11.809844 41.589609 10.589844 40.349609 C 9.6298437 39.399609 9.3203125 37.240234 9.3203125 37.240234 C 9.3203125 37.240234 9 35.709688 9 33.179688 L 9 30.810547 C 9 28.280547 9.3203125 26.75 9.3203125 26.75 C 9.3203125 26.75 9.6298438 24.590391 10.589844 23.650391 C 11.809844 22.400391 13.170781 22.390312 13.800781 22.320312 C 18.280781 22.000312 24.990234 22 24.990234 22 z M 12 26 L 12 27.978516 L 14 27.978516 L 14 38 L 16 38 L 16 27.978516 L 18 27.978516 L 18 26 L 12 26 z M 25 26 L 25 38 L 27 38 L 27 36.75 C 27.631 37.531 28.453 38 29.125 38 C 29.877 38 30.533156 37.595313 30.785156 36.820312 C 30.904156 36.401313 30.992 36.01 31 35.125 L 31 32.375 C 31 31.387 30.866234 30.642656 30.740234 30.222656 C 30.488234 29.441656 29.878 29.005 29.125 29 C 28.145 28.993 27.75 29.5 27 30.375 L 27 26 L 25 26 z M 18 29 L 18 35.685547 C 18 36.407547 18.100469 36.891984 18.230469 37.208984 C 18.450469 37.722984 18.899062 38 19.539062 38 C 20.269062 38 21.21 37.485766 22 36.634766 L 22 38 L 24 38 L 24 29 L 22 29 L 22 35.269531 C 21.56 35.853531 20.919531 36.289062 20.519531 36.289062 C 20.259531 36.289062 20.05 36.179578 20 35.892578 L 20 29 L 18 29 z M 35.029297 29 C 34.021297 29 33.234063 29.317016 32.664062 29.916016 C 32.244062 30.358016 32 31.080578 32 32.017578 L 32 35.083984 C 32 36.014984 32.2685 36.666516 32.6875 37.103516 C 33.2585 37.702516 34.044172 38 35.076172 38 C 36.107172 38 36.918844 37.686781 37.464844 37.050781 C 37.704844 36.769781 37.858781 36.453563 37.925781 36.101562 C 37.943781 35.942563 38 35.511 38 35 L 36 35 L 36 35.798828 C 36 36.262828 35.552 36.638672 35 36.638672 C 34.448 36.638672 34 36.261828 34 35.798828 L 34 34 L 38 34 L 38 33.423828 L 38 31.978516 C 38 31.043516 37.770422 30.359016 37.357422 29.916016 C 36.804422 29.317016 36.019297 29 35.029297 29 z M 35 30.447266 C 35.552 30.447266 36 30.824109 36 31.287109 L 36 32.615234 L 34 32.615234 L 34 31.287109 C 34 30.823109 34.448 30.447266 35 30.447266 z M 28.220703 30.746094 C 28.765703 30.746094 29 31.081 29 32.125 L 29 34.875 C 29 35.919 28.765703 36.279297 28.220703 36.279297 C 27.909703 36.279297 27.316 36.066 27 35.75 L 27 31.375 C 27.316 31.063 27.909703 30.746094 28.220703 30.746094 z"/></svg>',
      'twitter-icon': '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/></svg>',
      'linkedin-icon': '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px">    <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/></svg>',
      'pinterest-icon': '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M25,2C12.3178711,2,2,12.3178711,2,25c0,9.8841553,6.2675781,18.3302612,15.036377,21.5769653	c-0.2525635-2.2515869-0.2129517-5.9390259,0.2037964-7.7243652c0.3902588-1.677002,2.5212402-10.6871338,2.5212402-10.6871338	s-0.6433105-1.2883301-0.6433105-3.1911011c0-2.9901733,1.7324219-5.2211914,3.8898315-5.2211914	c1.8349609,0,2.7197876,1.3776245,2.7197876,3.0281982c0,1.8457031-1.1734619,4.6026611-1.78125,7.1578369	c-0.506897,2.1409302,1.0733643,3.8865356,3.1836548,3.8865356c3.821228,0,6.7584839-4.0296021,6.7584839-9.8453369	c0-5.147583-3.697998-8.7471924-8.9795532-8.7471924c-6.1167603,0-9.7072754,4.588562-9.7072754,9.3309937	c0,1.8473511,0.7111816,3.8286743,1.6000977,4.9069824c0.175293,0.2133179,0.2009277,0.3994141,0.1488647,0.6160278	c-0.1629028,0.678894-0.5250854,2.1392822-0.5970459,2.4385986c-0.0934448,0.3944702-0.3117676,0.4763184-0.7186279,0.2869263	c-2.685791-1.2503052-4.364502-5.1756592-4.364502-8.3295898c0-6.7815552,4.9268188-13.0108032,14.206543-13.0108032	c7.4588623,0,13.2547607,5.3138428,13.2547607,12.4179077c0,7.4100342-4.6729126,13.3729858-11.1568604,13.3729858	c-2.178894,0-4.2263794-1.132019-4.9267578-2.4691772c0,0-1.0783081,4.1048584-1.3404541,5.1112061	c-0.4524536,1.7404175-2.3892822,5.3460083-3.3615723,6.9837036C20.1704712,47.6074829,22.5397949,48,25,48	c12.6826172,0,23-10.3173828,23-23C48,12.3178711,37.6826172,2,25,2z"/></svg>',
      'mdi-alert-outline': '<svg id="mdi-alert-outline" xmlns="http://www.w3.org/2000/svg" width="30" height="26" viewBox="0 0 30 26"><path id="Trazado_3860" data-name="Trazado 3860" d="M1,28H31L16,2Zm4.732-2.737L16,7.46l10.268,17.8Zm8.9-4.105h2.727v2.737H14.636Zm0-8.211h2.727v5.474H14.636Z" transform="translate(-1 -2)" fill="#fdd835"/></svg>',
      'mdi-contact-info': '<svg id="mdi-contact-info" xmlns="http://www.w3.org/2000/svg" width="27" height="30" viewBox="0 0 27 30"><path id="Trazado_3897" data-name="Trazado 3897" d="M29.76,5.83a3.316,3.316,0,0,0-.27-.51,2.973,2.973,0,0,0-.81-.81,3.317,3.317,0,0,0-.51-.27A3.019,3.019,0,0,0,27,4H25.5V1h-3V4h-12V1h-3V4H6a3.042,3.042,0,0,0-1.68.51,2.973,2.973,0,0,0-.81.81,3.317,3.317,0,0,0-.27.51A3.019,3.019,0,0,0,3,7V28a3,3,0,0,0,3,3H27a3.019,3.019,0,0,0,1.17-.24,3.317,3.317,0,0,0,.51-.27,2.973,2.973,0,0,0,.81-.81A3.08,3.08,0,0,0,30,28V7a3.019,3.019,0,0,0-.24-1.17ZM6,28V7H27V28Zm10.5-9.18c-3.045,0-9,1.62-9,5.37V26.5h18V24.2C25.5,20.44,19.545,18.82,16.5,18.82ZM10.965,23.5A10.517,10.517,0,0,1,16.5,21.82a10.473,10.473,0,0,1,5.535,1.68Zm5.535-6A4.5,4.5,0,1,0,12,13,4.513,4.513,0,0,0,16.5,17.5Zm0-6A1.5,1.5,0,1,1,15,13,1.5,1.5,0,0,1,16.5,11.5Z" transform="translate(-3 -1)" fill="#002a7f"/></svg>',
      'mdi-car': '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="26.667" viewBox="0 0 30 26.667"><path id="mdi-car" d="M29.533,6.683A2.49,2.49,0,0,0,27.167,5H8.833A2.506,2.506,0,0,0,6.467,6.683L3,16.667V30a1.672,1.672,0,0,0,1.667,1.667H6.333A1.672,1.672,0,0,0,8,30V28.333H28V30a1.672,1.672,0,0,0,1.667,1.667h1.667A1.672,1.672,0,0,0,33,30V16.667Zm-20.7,16.65a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,8.833,23.333Zm18.333,0a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,27.167,23.333ZM6.333,15l2.5-7.5H27.167l2.5,7.5Z" transform="translate(-3 -5)" fill="#002a7f"/></svg>',
      // ... más íconos definidos aquí ...
      // Es importante asegurarse de que las URLs de imágenes o los datos SVG incrustados sean correctos
      // y que los íconos se muestren según lo esperado en la aplicación.
    });
  }
}
