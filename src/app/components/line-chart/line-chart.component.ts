import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; 

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent {

  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLabels: string[] = labels;
  public lineChartType: ChartType = 'line';
  public lineChartLegend = true;
  public lineChartPlugins = [];

  public lineChartData: ChartDataset[] = [
    {
      label: 'Dataset 1',
      data: this.generateNumbers(NUMBER_CFG),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: this.generateNumbers(NUMBER_CFG),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }
  ];

  private generateNumbers(config: { count: number, min: number, max: number }): number[] {
    const { count, min, max } = config;
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }
}
