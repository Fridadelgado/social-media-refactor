import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { AuthRedsocialService } from '../../services/auth-redsocial.service';
import { RedesSociales, ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';

@Component({
  selector: 'app-social-auth-modal',
  templateUrl: './social-auth-modal.component.html',
  styleUrls: ['./social-auth-modal.component.scss']
})
export class SocialAuthModalComponent implements OnInit, OnDestroy {
  @Input() redesSociales: ResponseRedesSociales = [];
  selectedRedSocial: number = 0;
  selectedDistribuidor: string = '';
  email: string = '';
  nombreCuenta: string = ''; // Nuevo campo
  distribuidores: any[] = [];
  submitted: boolean = false;
  alreadyAuthenticated: boolean = false; // Nueva variable de estado
  authWindow: Window | null = null;
  checkAuthInterval: any;

  constructor(
    protected ref: NbDialogRef<SocialAuthModalComponent>,
    private authRedsocialService: AuthRedsocialService
  ) { }

  ngOnInit(): void {
    this.getRedesSociales();
    this.getDistribuidores();
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo cuando el componente se destruya
    if (this.checkAuthInterval) {
      clearInterval(this.checkAuthInterval);
    }
  }

  getRedesSociales(): void {
    // Obtener redes sociales desde el servicio
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
    // Obtener distribuidores desde el servicio
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
    if (!this.email || !this.selectedRedSocial || !this.selectedDistribuidor || !this.nombreCuenta) {
      console.error('Todos los campos son obligatorios.');
      return;
    }

    // Verificar si ya está autenticado
    this.authRedsocialService.obtenerLogueos(this.email, this.selectedRedSocial, this.selectedDistribuidor)
      .subscribe((logins: any[]) => {
        if (logins.length > 0) {
          this.alreadyAuthenticated = true; // Actualizar variable de estado
          console.log('El usuario ya está autenticado.');
        } else {
          // Iniciar el proceso de autenticación
          this.authRedsocialService.iniciarAutenticacion(this.email, this.selectedRedSocial, this.selectedDistribuidor, this.nombreCuenta)
            .subscribe(response => {
              if (response.statusCode === 302) {
                const redirectUrl = response.headers.Location;
                this.authWindow = window.open(redirectUrl, 'authWindow', 'width=600,height=400');

                // Inicia el chequeo periódico de la autenticación
                this.checkAuthInterval = setInterval(() => {
                  this.verificarAutenticacion();
                }, 3000);
              }
            }, error => {
              console.error('Error en la autenticación:', error);
            });
        }
      }, error => {
        console.error('Error al verificar la autenticación:', error);
      });
  }

  verificarAutenticacion() {
    // Verificar si el usuario ya está autenticado
    this.authRedsocialService.obtenerLogueos(this.email, this.selectedRedSocial, this.selectedDistribuidor)
      .subscribe((logins: any[]) => {
        if (logins.length > 0) {
          this.alreadyAuthenticated = true;
          console.log('Autenticación detectada.');

          // Cierra la ventana emergente si está abierta
          if (this.authWindow) {
            this.authWindow.close();
            this.authWindow = null;
          }

          // Detiene el chequeo periódico
          clearInterval(this.checkAuthInterval);

          // Cierra el modal
          this.ref.close();
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
