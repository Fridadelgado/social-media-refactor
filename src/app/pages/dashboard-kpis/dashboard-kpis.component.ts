import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Chart, ChartConfiguration, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import { RedesSocialesService } from 'src/app/services/redes-sociales.service';

@Component({
  selector: 'app-dashboard-kpis',
  templateUrl: './dashboard-kpis.component.html',
  styleUrl: './dashboard-kpis.component.scss',
})
export class DashboardKpisComponent implements OnInit {
  redesSociales: ResponseRedesSociales | null = null;
  isSeekopSelected = false;
  private readonly STORAGE_KEY = 'redesSociales';
  selectedTab: string = 'vision-general';
  /**chart temporal de seekop */
  public polarAreaChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return ` ${tooltipItem.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      r: {
        pointLabels: {
          centerPointLabels: true
        }
      }
    }
  };
  public polarAreaChartLabels: string[] = ['Nuevas conversaciones', 
    'Conversaciones atentidas', 'Leads generados', 'Citas', 'Shows'];
  public polarAreaChartType: ChartType = 'polarArea';
  public polarAreaChartData: ChartConfiguration['data'] = {
    labels: this.polarAreaChartLabels,
    datasets: [
      {
        data: this.generateNumbers({ count: 5, min: 0, max: 100 }),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1,
      }
    ]
  };

  constructor(private redesSocialesService: RedesSocialesService, private sidebarService: NbSidebarService) { }

  ngOnInit(): void {

    this.redesSocialesService.getRedesSocialesFromSessionStorage().subscribe(
      data => {
        this.redesSociales = data;
      },
      error => {
        console.error('Error al obtener redes sociales', error);
      }
    );
    console.log(this.redesSociales);
  }
  private generateNumbers(config: { count: number, min: number, max: number }): number[] {
    const { count, min, max } = config;
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }

  onClickSeekop() {
    this.isSeekopSelected = true;
    console.log(this.isSeekopSelected);
  }


  selectTab(tab: string) {
    this.selectedTab = tab;
    this.isSeekopSelected = false;
  }

  selectRedSocial() {
    this.isSeekopSelected = false;
  }

}