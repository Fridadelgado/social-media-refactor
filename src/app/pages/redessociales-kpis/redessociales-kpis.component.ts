import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-redessociales-kpis',
  templateUrl: './redessociales-kpis.component.html',
  styleUrls: ['./redessociales-kpis.component.scss']
})
export class RedesSocialesKpisComponent implements OnInit {
  // Define the KPIs data structure here
  single?: any[];
  view: [number,number] = [700, 400]; // Set the dimensions for the chart

  // options for the chart
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };




  constructor() {
    // Object.assign(this, { single }) // if you have predefined data
  }

  onSelect(event:any) {
    console.log(event);
  }

  ngOnInit() {
    // Here you'd get your KPIs data
    // For now, let's just use some dummy data
    this.single = [
      {
        "name": "Facebook",
        "value": 8940000
      },
      {
        "name": "Instagram",
        "value": 5000000
      },
      {
        "name": "Twitter",
        "value": 7200000
      },
      {
        "name": "LinkedIn",
        "value": 5200000
      }
    ];
  }
}
