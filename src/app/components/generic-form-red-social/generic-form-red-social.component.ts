import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NbTagComponent, NbTagInputAddEvent } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FacebookForm } from 'src/app/interfaces/red-social-form.interface';
import { FacebookPayload, InstagramPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from 'src/app/interfaces/red-social-payload.interface';
import { Root, SelectedRedesSociales, SocialMediaPayload } from 'src/app/interfaces/redes-sociales.interface';
import { StateformService } from 'src/app/services/stateform.service';

@Component({
  selector: 'app-generic-form-red-social',
  templateUrl: './generic-form-red-social.component.html',
  styleUrl: './generic-form-red-social.component.scss'
})
export class GenericFormRedSocialComponent {
  @Input() config: SelectedRedesSociales = {} as SelectedRedesSociales;
  @Output() formUpdate = new EventEmitter<Root>();
  root: Root = {
    selectedRedesSociales: []
  };
  formularioRedSocial: any = {};
  formType: string = '';
  submitted = false;
  isValidFile: boolean = false;
  fileType: string = "";
  dropZoneMessage: string = ""; // Mensaje de la zona de arrastre de archivos.
  tags: string[] = ['seekop', 'autos', 'mazda'];
  acceptedFileTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'video/mp4', 'video/avi', 'video/mkv'];
  filePreviewUrl: string | ArrayBuffer | null = null;
  imagenPrevisualizacion: string | ArrayBuffer | null = '';


  constructor(private translate: TranslateService, private stateformService: StateformService) { }

  ngOnInit() {
    this.initializeForm();
    this.stateformService.formData$.subscribe(data => {
      this.formularioRedSocial = data || {};
    });

  }

  initializeForm() {
   
      const formType = this.config.nombreRedSocial.toLowerCase();
      this.formType = formType;  
      switch (formType) {
        case 'facebook':
          this.config.formularioRedSocial = this.config.formularioRedSocial as FacebookPayload;
          break;
        case 'instagram':
          this.config.formularioRedSocial = this.config.formularioRedSocial as InstagramPayload;
          break;
        case 'twitter':
          this.config.formularioRedSocial = this.config.formularioRedSocial as TwitterPayload;
          break;
        case 'youtube':
          this.config.formularioRedSocial =  this.config.formularioRedSocial as YouTubePayload;
          break;
        case 'pinterest':
          this.config.formularioRedSocial =this.config.formularioRedSocial as FacebookPayload;
          break;
        case 'tiktok':
          this.config.formularioRedSocial = this.config.formularioRedSocial as TikTokPayload;
          break;
        default:
          console.error('Unknown form type:', formType);
      }
    
  
    console.log(this.config);
  }
  
  
  
 
  isFormValid() {
    // Valida los campos obligatorios según la red social
    /* switch (this.formType) {
       case 'facebook':
         return this.formularioRedSocial.text && this.formularioRedSocial.description && this.formularioRedSocial.mediaBase64;
       case 'instagram':
         return this.formularioRedSocial.text && this.formularioRedSocial.email;
       // Agrega más validaciones para otras redes sociales
       default:
         return false;
     }*/
  }

  onFormChange(): void {
    console.log(this.config)
  }

  removeTag(tag: any) {
    this.tags = this.tags.filter(t => t !== tag);
  }
  onTagAdd(event: NbTagInputAddEvent) {
    const tag = event.value.trim();
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }




  onFileSelect(event: any) {
    // Lógica para manejar la selección de archivos mediante el input de archivo.
    this.submitted = true;
    const file = event.target.files[0];
    if (file) {
      this.isValidFile = this.validateFile(file.name);
      // Decide qué mensaje mostrar basado en si el archivo es válido
      const translationKey = this.isValidFile ? 'components.modal-publicacion.dropZoneSuccess' : 'components.modal-publicacion.dropZoneValidacion';
      this.translate.get(translationKey).subscribe((res: string) => {
        this.dropZoneMessage = res;
      });

      if (this.isValidFile) {
        console.log("validFile");
        this.processFile(file);
      }
    }
  }


  validateFile(fileName: string): boolean {
    // Valida la extensión del archivo cargado.
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.mp4|\.avi|\.mov|\.mkv|\.flv|\.wmv)$/i;
    return allowedExtensions.exec(fileName) ? true : false;
  }

  detectFileType(dataUri: string | ArrayBuffer): string {
    //Detecta si es imagen o video
    const fileTypeRegex = /^data:(image|video)\/([a-zA-Z0-9]+);base64,/;
    const match = dataUri.toString().match(fileTypeRegex);
    if (match) {
      this.fileType = match[1];
      return this.fileType;
    } else {
      return 'unknown';
    }
  }


  processFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        this.detectFileType(reader.result);
        this.formularioRedSocial.mediaBase64 = reader.result.toString();
        this.filePreviewUrl = this.formularioRedSocial.mediaBase64;
        this.imagenPrevisualizacion = reader.result;
      } else {
        console.error('Error al leer el archivo');
      }
    };
    reader.onerror = (error) => {
      console.error('Error al cargar el archivo: ', error);
    };

    reader.readAsDataURL(file);
  }


}