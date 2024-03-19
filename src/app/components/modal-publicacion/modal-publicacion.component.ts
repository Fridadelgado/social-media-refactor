import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: ['./modal-publicacion.component.scss']
})
export class ModalPublicacionComponent {
  publicacion: Publicacion = { redSocial: [], titulo: '', descripcion: '', imagen: '', link: '' };
  imagenPrevisualizacion: string | ArrayBuffer | null = ''; // Agregamos una propiedad para almacenar la previsualización

  redesSocialesDisponibles = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'pinterest', label: 'Pinterest' },
    { value: 'youtube', label: 'YouTube' },
    // y así sucesivamente para otras redes sociales...
  ];

  submitted = false;
  dropZoneMessage: string = "";
  isValidFile: boolean = false;

  constructor(
    protected ref: NbDialogRef<ModalPublicacionComponent>,
    private publicacionesService: PublicacionesService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }
  onFileDrop(files: NgxFileDropEntry[]) {
    this.submitted = true;
    for (const droppedFile of files) {
      // Solo procesaremos el primer archivo en caso de múltiples archivos
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.processFile(file);
        });
        break; // Salimos después de procesar el primer archivo
      }
    }
    this.isValidFile = this.validateFile(files[0].fileEntry.name);
    // Actualiza el mensaje de zona de arrastre basado en si el archivo es válido o no
    if (this.isValidFile) {
      this.translate.get('components.modal-publicacion.dropZoneSuccess').subscribe((res: string) => {
        this.dropZoneMessage = res;
      });
    } else {
      this.translate.get('components.modal-publicacion.dropZoneValidacion').subscribe((res: string) => {
        this.dropZoneMessage = res;
      });
    }
  }

  onFileSelect(event: any) {
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
        this.processFile(file);
      }
    }
  }


  validateFile(fileName: string): boolean {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    return allowedExtensions.exec(fileName) ? true : false;
  }

  processFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagenPrevisualizacion = reader.result;
      this.publicacion.imagen = reader.result as string; // Actualiza la propiedad de la imagen de la publicación
    };
    reader.readAsDataURL(file);
  }

  definirAudiencia() {
    // Implementar lógica para definir la audiencia
  }

  agregarPublicacion() {
    this.submitted = true; // Activa la validación

    if (this.publicacion.redSocial.length === 0 || !this.publicacion.titulo || !this.publicacion.descripcion) {
      return; // No realiza la publicación si hay campos vacíos
    }

    // Antes de agregar, asegúrate de que la propiedad imagen contenga la URL base64 de la imagen
    this.publicacionesService.agregarPublicacion(this.publicacion);
    this.ref.close();
  }

  calendarizar() {
    // Implementar lógica para calendarizar la publicación
  }

  cancelar() {
    this.ref.close();
  }

  getSocialMediaIcon(red: string): string {
    const iconsMap: { [key: string]: string } = {
      facebook: 'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-0.png', // Asegúrate de poner la ruta correcta a tus imágenes
      twitter: 'https://img.freepik.com/vector-gratis/nuevo-diseno-icono-x-logotipo-twitter-2023_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1710288000&semt=ais',
      instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png',
      linkedin: 'https://cdn-icons-png.flaticon.com/256/174/174857.png',
      tiktok: 'https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_640.png',
      pinterest: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
      youtube: 'https://w7.pngwing.com/pngs/982/799/png-transparent-youtube-logo-youtube-logo-internet-marketing-subscribe-television-label-text.png'
      // y así sucesivamente...
    };

    return iconsMap[red] || 'path/to/default-icon.png';
  }
}
