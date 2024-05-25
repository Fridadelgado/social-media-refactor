import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthRedsocialService } from '../../services/auth-redsocial.service';
import { RedesSociales, ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';

@Component({
  selector: 'app-social-auth-modal',
  templateUrl: './social-auth-modal.component.html',
  styleUrls: ['./social-auth-modal.component.scss']
})
export class SocialAuthModalComponent implements OnInit {
  @Input() redesSociales: ResponseRedesSociales = [];

  selectedRedSocial: number = 0;
  selectedDistribuidor: string = '';
  email: string = '';
  distribuidores: any[] = [];
  submitted: boolean = false;

  constructor(
    protected ref: NbDialogRef<SocialAuthModalComponent>,
    private authRedsocialService: AuthRedsocialService
  ) { }

  ngOnInit(): void {
    this.getRedesSociales();
    this.getDistribuidores();
  }

  getRedesSociales(): void {
    this.authRedsocialService.getRedesSociales()
      .subscribe((redesSociales: ResponseRedesSociales) => {
        if (redesSociales && redesSociales.length > 0)
          this.redesSociales = redesSociales;
      },
        (error) => {
          console.error('Error al obtener las redes sociales:', error);
        }
      );
  }

  getDistribuidores(): void {
    this.authRedsocialService.getDistribuidores()
      .subscribe((distribuidores: any[]) => {
        if (distribuidores && distribuidores.length > 0)
          this.distribuidores = distribuidores;
      },
        (error) => {
          console.error('Error al obtener los distribuidores:', error);
        }
      );
  }

  iniciarAutenticacion() {
    this.submitted = true;
    if (!this.email || !this.selectedRedSocial || !this.selectedDistribuidor) {
      console.error('Todos los campos son obligatorios.');
      return;
    }

    // Verificar si ya está autenticado
    this.authRedsocialService.obtenerLogueos(this.email, this.selectedRedSocial, this.selectedDistribuidor)
      .subscribe((logins: any[]) => {
        if (logins.length > 0) {
          console.log('El usuario ya está autenticado.');
        } else {
          this.authRedsocialService.iniciarAutenticacion(this.email, this.selectedRedSocial, this.selectedDistribuidor)
            .subscribe(response => {
              if (response.status === 302) {
                const redirectUrl = response.headers.get('Location');
                window.location.href = redirectUrl;
              }
            }, error => {
              console.error('Error en la autenticación:', error);
            });
        }
      }, error => {
        console.error('Error al verificar la autenticación:', error);
      });
  }

  cancelar() {
    this.ref.close();
  }

  closeModal() {
    this.ref.close();
  }
}
