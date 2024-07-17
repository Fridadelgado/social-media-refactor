import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Chart, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import { RedesSocialesService } from 'src/app/services/redes-sociales.service';

@Component({
  selector: 'app-dashboard-kpis',
  templateUrl: './dashboard-kpis.component.html',
  styleUrl: './dashboard-kpis.component.scss',
})
export class DashboardKpisComponent implements OnInit {
  redesSociales: ResponseRedesSociales | null = null;
  private readonly STORAGE_KEY = 'redesSociales';
  selectedTab: string = 'vision-general';

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



  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  
  selectRedSocial(){
    
  }

}