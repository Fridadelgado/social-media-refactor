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
  public logoUrl2 = '../assets/images/cropped-op1-192x192.png';

  public isCollapsed = false;

  constructor(
    private sidebarService: SidebarService,
    // Otros servicios...
  ) {
    this.sidebarService.isCollapsed$.subscribe(value => {
      this.isCollapsed = value;
    });
  }

  // En tu AppComponent
  public toggleSidebar(): void {
    this.sidebarService.toggleCollapsed();
  }

}
