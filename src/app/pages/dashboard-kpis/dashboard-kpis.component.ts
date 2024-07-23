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
  labels = ['Nuevas conversaciones',
    'Conversaciones atentidas', 'Leads generados', 'Citas', 'Shows'];

  public polarAreaChartType: ChartType = 'polarArea';
  lineChartData = [
    {
      label: 'Dataset 1',
      data: this.generateNumbers({ count: 7, min: 0, max: 100 }),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    },
    {
      label: 'Dataset 2',
      data: this.generateNumbers({ count: 7, min: 0, max: 100 }),
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)'
    }
  ];
  data = [
    { group: 'Toluca', quantity: 115 },
    { group: 'Ecatepec de Morelos', quantity: 150 },
    { group: 'Naucalpan de Juárez', quantity: 200 },
    { group: 'Chalco', quantity: 180 },
    { group: 'Tlalnepantla de Baz', quantity: 220 },
    { group: 'Ecatepec de Morelos', quantity: 160 },
    { group: 'Naucalpan de Juárez', quantity: 210 },
    { group: 'Chalco', quantity: 190 },
    { group: 'Tlalnepantla de Baz', quantity: 230 },
  ];
  tableHeaders: string[] = ['Tipo', 'Fecha', 'Reacciones', 'Comentarios', 'Clics', 'Clins en el link', 
    'Impresiones','Alcance','Reproducciones','Tiempo visto','Engagement','Gasto'];
  tableRows: any[][] = [
    ['ADS', 'Jun', '2', '5',10,10,5,20,10,5,20,899],
    ['POST', 'Ago', '2', '5',10,10,5,20,10,5,20,899],
    ['POST', 'Sep', '2', '5',10,10,5,20,10,5,20,899],
  ];
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
  loadNext(card: any) {
    // Implementa la lógica para cargar más datos aquí
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

  selectRedSocial(red: any) {
    this.isSeekopSelected = false;
  }

}