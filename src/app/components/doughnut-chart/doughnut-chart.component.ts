import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent {
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLabels: string[] = ['Mexico'];
  public lineChartType: ChartType = 'doughnut';
  public lineChartLegend = true;
  public lineChartPlugins = [];

  public lineChartData: ChartDataset[] = [
    { data: [ 45], label: 'Seguidores por pais' },
  ];

}
