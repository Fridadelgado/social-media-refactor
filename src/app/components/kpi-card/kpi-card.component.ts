// kpi-card.component.ts
import { Component, Input } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  @Input() socialMedia: any;

  // Ajusta la vista para que los gráficos sean del tamaño deseado
  view: [number,number] = [160, 160]; // Este tamaño puede necesitar ajustes
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  calculatePercentage(value: number, total: number): number {
    return (value / total) * 100;
  }
}
