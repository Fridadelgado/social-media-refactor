import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme'; // Para manejar el cierre del modal.
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service'; // Servicio para manejar las publicaciones.
import { TranslateService } from '@ngx-translate/core'; // Para la internacionalización.
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; // Para la carga de archivos.

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: ['./modal-publicacion.component.scss']
})
export class ModalPublicacionComponent {
  publicacion: Publicacion = { redSocial: [], titulo: '', descripcion: '', imagen: '', link: '' };
  imagenPrevisualizacion: string | ArrayBuffer | null = '';
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

  submitted = false; // Controla la validación del formulario.
  dropZoneMessage: string = ""; // Mensaje de la zona de arrastre de archivos.
  isValidFile: boolean = false; // Controla si el archivo cargado es válido.


  constructor(
    protected ref: NbDialogRef<ModalPublicacionComponent>,
    private publicacionesService: PublicacionesService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    // Obtiene el mensaje predeterminado para la zona de arrastre.
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }
  onFileDrop(files: NgxFileDropEntry[]) {
    // Lógica para manejar la carga de archivos mediante arrastrar y soltar.
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
        this.processFile(file);
      }
    }
  }


  validateFile(fileName: string): boolean {
    // Valida la extensión del archivo cargado.
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    return allowedExtensions.exec(fileName) ? true : false;
  }

  processFile(file: File) {
    // Procesa el archivo cargado para su previsualización.
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagenPrevisualizacion = reader.result;
      this.publicacion.imagen = reader.result as string; // Actualiza la propiedad de la imagen de la publicación
    };
    reader.readAsDataURL(file);
  }

  definirAudiencia() {
    // Lógica para definir la audiencia de la publicación.
  }

  agregarPublicacion() {
    // Lógica para agregar la publicación utilizando PublicacionesService.
    this.submitted = true; // Activa la validación

    if (this.publicacion.redSocial.length === 0 || !this.publicacion.titulo || !this.publicacion.descripcion) {
      return; // No realiza la publicación si hay campos vacíos
    }

    // Antes de agregar, asegúrate de que la propiedad imagen contenga la URL base64 de la imagen
    this.publicacionesService.agregarPublicacion(this.publicacion);
    this.ref.close();
  }

  calendarizar() {
    // Lógica para calendarizar la publicación.
  }

  cancelar() {
    this.ref.close(); // Cierra el modal.
  }

  getSocialMediaIcon(red: string): string {
    const iconsMap: { [key: string]: string } = {
      facebook: 'facebook-icon', // Asume que 'facebook-icon' es el nombre del ícono en tu paquete
      twitter: 'twitter-icon',
      instagram: 'instagram-icon',
      linkedin: 'linkedin-icon',
      tiktok: 'tiktok-icon',
      pinterest: 'pinterest-icon',
      youtube: 'youtube-icon'
      // Asegúrate de que estos nombres de íconos correspondan a los de tu paquete de Nebular.
    };

    return iconsMap[red] || 'default-icon'; // 'default-icon' es un ícono predeterminado
  }

}
