import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FacebookPayload, InstagramPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from 'src/app/interfaces/red-social-payload.interface';
import { SelectedRedesSociales, SocialMediaPayload } from 'src/app/interfaces/redes-sociales.interface';

@Component({
  selector: 'app-generic-form-red-social',
  templateUrl: './generic-form-red-social.component.html',
  styleUrl: './generic-form-red-social.component.scss'
})
export class GenericFormRedSocialComponent {
  @Input() config: SelectedRedesSociales = {} as SelectedRedesSociales;
  formConfig: any = {};
  formType: string = '';
  submitted = false;
  isValidFile: boolean = false; 
  fileType: string = "";


  ngOnInit() {
    this.initializeForm();
  }

 
  initializeForm() {
    this.formConfig = this.config.formularioRedSocial;
    this.formType = this.config.nombreRedSocial.toLowerCase();
    switch (this.formType) {
      case 'facebook':
        this.formConfig = this.config.formularioRedSocial as FacebookPayload;
        break;
      case 'instagram':
        this.formConfig = this.config.formularioRedSocial as InstagramPayload;
        break;
      case 'twitter':
        this.formConfig = this.config.formularioRedSocial as TwitterPayload;
        break;
      case 'youtube':
        this.formConfig = this.config.formularioRedSocial as YouTubePayload;
        break;
      case 'pinterest':
        this.formConfig = this.config.formularioRedSocial as PinterestPayload;
        break;
      case 'tiktok':
        this.formConfig = this.config.formularioRedSocial as TikTokPayload;
        break;
      default:
        console.error('Unknown form type');
    }

  }
  onFormChange() {
    //this.formUpdate.emit(this.formConfig);
    console.log('Form Config:', this.formType,this.formConfig);
  }

  onFileSelect(event: any) {
    this.submitted = true;
    const file = event.target.files[0];
    /*/if (file) {
      this.isValidFile = this.validateFile(file.name);

      if (this.isValidFile) {
        this.processFile(file);
      }
    }*/
  }

  onFileDrop(files: NgxFileDropEntry[]) {
    // Lógica para manejar la carga de archivos mediante arrastrar y soltar.
    this.submitted = true;
    for (const droppedFile of files) {
      // Solo procesaremos el primer archivo en caso de múltiples archivos
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
        //  this.processFile(file);
        });
        break; // Salimos después de procesar el primer archivo
      }
    }
   // this.isValidFile = this.validateFile(files[0].fileEntry.name);
    // Actualiza el mensaje de zona de arrastre basado en si el archivo es válido o no

  }
 


}