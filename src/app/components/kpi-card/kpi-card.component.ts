import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartData, ChartOptions, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Registra los elementos necesarios y el plugin
Chart.register(DoughnutController, ArcElement, Tooltip, Legend, ChartDataLabels);

@Component({
  selector: 'app-kpi-card',
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent implements AfterViewInit {
  @Input() socialMedia: any;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  initializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      // Define la configuración del gráfico
      const data: ChartData<'doughnut'> = {
        labels: ['Value', 'Remaining'],
        datasets: [{
          label: this.socialMedia.name,
          data: [this.socialMedia.value, this.socialMedia.total - this.socialMedia.value],
          backgroundColor: ['#D2F16E', '#E2E2E2'],
          hoverBackgroundColor: ['#D2F16E', '#E2E2E2'],
          borderWidth: 1,
          borderColor: '#ffffff',
          hoverBorderColor: '#ffffff',
          hoverBorderWidth: 1,
          datalabels: {
            display: 'auto',
            opacity: 1,
            color: '#1E1E1E',
            font: {
              family: 'Montserrat',
              size: 18
            },
            offset: 60,
            anchor: 'end',
            align: 'start',
            formatter: function (value, context) {
              if (context.dataIndex === 0) {
                return value.toFixed(1) + '%';
              }
              else {
                return null;
              }
            }
          }
        }]
      };

      // Opciones del gráfico
      const options: ChartOptions<'doughnut'> = {
        cutout: '73%',
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        responsive: true,
        layout: {
          padding: 1
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label = Number(context.raw).toFixed(1) + '%';
                }
                return label;
              }
            }
          }
        },
        // Asegúrate de que esta propiedad coincida con la versión de Chart.js que estás utilizando
      };

      // Crea el gráfico con la configuración definida
      new Chart(ctx, {
        type: 'doughnut',
        data,
        options,
      });
    }
  }

  calculatePercentage(value: number, total: number): number {
    return (value / total) * 100;
  }
}
