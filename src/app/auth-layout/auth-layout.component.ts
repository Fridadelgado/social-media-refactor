import { Component } from '@angular/core';
import { SidebarService } from '../../app/services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {
  title = 'BI-ADMIN-INTERFACES-PADRE';
  public logoUrl = '../assets/images/logo-blanco.png';
  public logoUrl2 = '../assets/images/seekop-imagotipo.png';

  public isCollapsed = true;

  constructor(
    private sidebarService: SidebarService,
    // Otros servicios...
  ) {
    this.sidebarService.isCollapsed$.subscribe(value => {
      this.isCollapsed = true;
    });
  }

  // En tu AppComponent
  public toggleSidebar(): void {
    this.sidebarService.toggleCollapsed();
  }

}
