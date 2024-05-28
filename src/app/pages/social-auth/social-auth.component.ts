import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AuthRedsocialService } from '../../services/auth-redsocial.service';
import { SocialAuthModalComponent } from '../../components/social-auth-modal/social-auth-modal.component';
import { ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import { RedSocialLogin } from 'src/app/interfaces/red-social-login.interface';
import { DynamicComponentService } from '../../services/dynamic-component-service.service'; // Asegúrate de importar el servicio de componentes dinámicos

@Component({
  selector: 'app-social-auth',
  templateUrl: './social-auth.component.html',
  styleUrls: ['./social-auth.component.scss']
})
export class SocialAuthComponent implements OnInit {

  logins: RedSocialLogin[] = [];
  redesSociales: ResponseRedesSociales = [];

  constructor(
    private authRedsocialService: AuthRedsocialService,
    private dialogService: NbDialogService,
    private dynamicComponentService: DynamicComponentService
  ) { }

  ngOnInit(): void {
    this.obtenerLogueos();
    this.getRedesSociales();
  }

  obtenerLogueos() {
    this.authRedsocialService.obtenerLogueos().subscribe((data: RedSocialLogin[]) => {
      this.logins = data;
    }, error => {
      console.error('Error al obtener los logueos:', error);
    });
  }

  getRedesSociales(): void {
    this.authRedsocialService.getRedesSociales()
      .subscribe((redesSociales: ResponseRedesSociales) => {
        if (redesSociales && redesSociales.length > 0) {
          this.redesSociales = redesSociales;
        }
      }, (error) => {
        console.error('Error al obtener las redes sociales:', error);
      });
  }

  openModal() {
    this.dialogService.open(SocialAuthModalComponent, {
      context: {
        redesSociales: this.redesSociales
      },
      dialogClass: 'custom-modal-full',
    }).onClose.subscribe(() => {
      this.obtenerLogueos(); // Actualiza la lista de logueos después de cerrar el modal
    });
  }

  getSocialMediaIcon(idred: number): string {
    const iconsMap: { [key: number]: string } = {
      12: 'facebook-icon',
      // Agrega otros íconos aquí con el idred correspondiente
    };
    return iconsMap[idred] || 'default-icon';
  }

  desvincularCuenta(login: RedSocialLogin) {
    this.dynamicComponentService.showBodyLoading();

    this.authRedsocialService.desvincularCuenta(login.email, login.idred, login.distribuidor)
      .subscribe(() => {
        this.dynamicComponentService.destroyBodyLoading();
        this.obtenerLogueos(); // Actualiza la lista de logueos después de desvincular una cuenta
      }, error => {
        this.dynamicComponentService.destroyBodyLoading();
        console.error('Error al desvincular la cuenta:', error);
      });
  }
}
