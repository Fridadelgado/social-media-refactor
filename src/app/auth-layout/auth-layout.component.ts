import { Component } from '@angular/core';
import { SidebarService } from '../../app/services/sidebar.service';
import { LanguageService } from '../../app/services/translate-service.service';

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

  public selectedLanguage: string;

  public languageNames: any = {
    'es': 'Español',
    'en': 'English',
    // Añade más idiomas según sea necesario
  };

  constructor(
    private sidebarService: SidebarService,
    private languageService: LanguageService // Inyecta el servicio de idioma aquí
  ) {
    this.sidebarService.isCollapsed$.subscribe(value => {
      this.isCollapsed = true;
    });
    this.selectedLanguage = 'es'; // Establece español como seleccionado por defecto
    this.languageService.changeLanguage(this.selectedLanguage); // Asegura que el servicio de idioma también use 'es' al inicio
  }

  // En tu AppComponent
  public toggleSidebar(): void {
    this.sidebarService.toggleCollapsed();
  }

  // Puedes usar esta función en tu template para cambiar el idioma
  changeLanguage() {
    this.languageService.changeLanguage(this.selectedLanguage);
  }


  getCurrentLanguage() {
    return this.languageService.getCurrentLanguage();
  }

}
