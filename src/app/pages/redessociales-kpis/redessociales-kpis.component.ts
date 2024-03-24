import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redessociales-kpis',
  templateUrl: './redessociales-kpis.component.html',
  styleUrls: ['./redessociales-kpis.component.scss']
})
export class RedesSocialesKpisComponent implements OnInit {
  // La propiedad ahora llamada 'kpisData' contendrá los datos de los KPI
  kpisData?: any[];

  constructor() {}

  ngOnInit() {
    // Aquí obtendrías los datos de KPIs de tu API o servicio
    this.kpisData = [
      { "name": "Facebook", "value": 8940000, "total": 10000000 },
      { "name": "Instagram", "value": 5000000, "total": 10000000 },
      { "name": "Twitter", "value": 7200000, "total": 10000000 },
      { "name": "LinkedIn", "value": 5200000, "total": 10000000 }
      // Asegúrate de incluir la propiedad 'total' si va a ser utilizada para calcular el porcentaje
    ];
  }
}
