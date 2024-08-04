import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { FacebookPayload, InstagramPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from 'src/app/interfaces/red-social-payload.interface';
import { ResponseRedesSociales, Root, SelectedRedesSociales, SocialMediaPayload } from 'src/app/interfaces/redes-sociales.interface';
import { RedesSocialesService } from 'src/app/services/redes-sociales.service';
import { StateformService } from 'src/app/services/stateform.service';

@Component({
  selector: 'app-modal-publicacion-red',
  templateUrl: './modal-publicacion-red.component.html',
  styleUrl: './modal-publicacion-red.component.scss'
})
export class ModalPublicacionRedComponent {

  dropZoneMessage: string = "";
  redesSociales: ResponseRedesSociales = [];
  selectedRedesSociales: SelectedRedesSociales[] = [];
  root: Root = {
    selectedRedesSociales: []
  };
  constructor(
    protected ref: NbDialogRef<ModalPublicacionRedComponent>,
    private translate: TranslateService,
    private redesSocialesService: RedesSocialesService,
    private stateformService: StateformService
  ) { }


  ngOnInit(): void {
    // Obtiene el mensaje predeterminado para la zona de arrastre.
    //this.fechaProgramada = this.ref;
    // this.getCampanias();
    console.log(this.selectedRedesSociales)
    this.getRedesSociales();
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }

  getRedesSociales() {
    this.redesSocialesService.getRedesSociales()
      .subscribe((redesSociales: ResponseRedesSociales) => {
        this.redesSociales = redesSociales;
      },
        (error) => {
          console.error('Error al obtener las redes sociales:', error);
          // HandleError
        }
      );
  }


  onRedSocialChange(selectedRedes: string[]): void {
    // Limpia las redes sociales que no están en la selección actual
    this.root.selectedRedesSociales = this.root.selectedRedesSociales.filter(item =>
      selectedRedes.includes(item.nombreRedSocial)
    );
  
    // Añade las nuevas redes sociales seleccionadas
    selectedRedes.forEach(red => {
      if (!this.root.selectedRedesSociales.some(item => item.nombreRedSocial === red)) {
        const newPayload = this.createPayload(red);
        this.root.selectedRedesSociales.push({
          nombreRedSocial: red.toLowerCase(),
          iconoRedSocial: 'icon', // Asegúrate de tener una función para obtener el icono
          formularioRedSocial: newPayload
        });
     
      }
    });
    console.log('Current selectedRedesSociales:', this.root.selectedRedesSociales);
  }
  
  
  onSubmit() {
    this.stateformService.formData$.subscribe(data => {
      if (data) {
       
        console.log('Datos del formulario recibidos:', data);
      }
    });  }

  createPayload(red: string): SocialMediaPayload {
    switch (red.toLowerCase()) {
      case 'facebook':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: '',
        } as FacebookPayload;
      case 'tikTok':
        return {
          text: '',
          email: '',
          distribuidor: ''
        } as TikTokPayload;
      case 'instagram':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: ''
        } as InstagramPayload;
      case 'twitter':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: ''
        } as TwitterPayload;
      case 'youtube':
        return {
          text: '',
          mediaBase64: '',
          email: '',
          distribuidor: ''
        } as YouTubePayload;
      case 'pinterest':
        return {
          title: '',
          alt_text: '',
          email: '',
          distribuidor: ''
        } as PinterestPayload;
      default:
        return {} as SocialMediaPayload;
    }
  }

  closeModal() {
    this.ref.close();
  }
}
