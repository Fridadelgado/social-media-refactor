import { Component, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme'; // Para manejar el cierre del modal.
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service'; // Servicio para manejar las publicaciones.
import { TranslateService } from '@ngx-translate/core'; // Para la internacionalización.
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; // Para la carga de archivos.
import { Campanias, CampaniasBody, GenericResponse } from 'src/app/interfaces/campanias.interface';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: ['./modal-publicacion.component.scss']
})
export class ModalPublicacionComponent {
  // En tu componente ModalPublicacionComponent

  esProgramada: boolean = false;
  // Cambia la inicialización de `fechaProgramada` a `null`
  fechaProgramada: Date | null = null; // Define una propiedad para almacenar la fecha

  esFechaValidaFlag: boolean = true;
  tipoArchivo: string = ''; //Define el formato de la imagen o video 
  imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
  videoExtensions = /\.(mp4|avi|mov|mkv|flv|wmv)$/i;
  campanias: Campanias[] = [];

  publicacionDefault = {
    titulo: 'Título Predeterminado',
    descripcion: 'Descripción predeterminada... Este coche no es solo un medio de transporte; es tu próximo compañero de aventuras. Con su elegante diseño, confort inigualable y rendimiento excepcional, está listo para convertirse en parte de tu vida y llevarte a nuevos destinos.',
    redSocial: ['facebook', 'twitter'], // Asume que estos valores están en tu array de `redesSocialesDisponibles`
  };

  public defaultPreviewImage: string = '../../../assets/images/defaultcar.png'; // Asegúrate de tener esta imagen en tus activos

  publicacion: Publicacion = { redSocial: [], titulo: '', descripcion: '', subcampanas: [], imagen: '', link: '', video: '' };

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
  minDate: Date;
  fileType: string = "";

  constructor(
    protected ref: NbDialogRef<ModalPublicacionComponent>,
    private publicacionesService: PublicacionesService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

  }

  ngOnInit(): void {
    // Obtiene el mensaje predeterminado para la zona de arrastre.
    //this.fechaProgramada = this.ref;
    console.log('hahahahahahahah', this.ref);
    this.getCampanias();
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }

  esFechaValida(): boolean {
    if (!this.fechaProgramada) {
      // Si no hay fecha seleccionada, considera la validación como exitosa
      this.esFechaValidaFlag = true;
      return true;
    }

    // Tu lógica existente de validación de fecha
    const fechaHoy = new Date();
    fechaHoy.setHours(0, 0, 0, 0); // Ignora la hora actual para solo comparar la fecha

    // Comprueba si la fechaProgramada es válida y no es anterior a hoy
    this.esFechaValidaFlag = this.fechaProgramada >= fechaHoy;
    return this.esFechaValidaFlag;
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
      // Asegúrate de que reader.result no sea null antes de usarlo
      if (reader.result) {
        this.detectFileType(reader.result);
        this.publicacion.imagen = reader.result.toString();
        this.publicacion.video = reader.result.toString();
        this.imagenPrevisualizacion = reader.result;
      } else {
        console.error('Error al leer el archivo');
        // Manejar adecuadamente el error, por ejemplo, mostrando un mensaje al usuario
      }
    };

    reader.onerror = (error) => {
      console.error('Error al cargar el archivo: ', error);
      // También es importante manejar los errores que puedan ocurrir durante la lectura del archivo
    };

    reader.readAsDataURL(file);
  }

  definirAudiencia() {
    // Lógica para definir la audiencia de la publicación.
  }


  agregarPublicacion() {
    this.submitted = true; // Marca el intento de envío del formulario para activar la validación de la UI.

    // Comprobaciones de validación para campos obligatorios.
    if (this.publicacion.redSocial.length === 0 || !this.publicacion.titulo || !this.publicacion.descripcion || !this.imagenPrevisualizacion) {
      console.error('Hay campos obligatorios que están vacíos.');
      return; // Detiene la ejecución si algún campo obligatorio está vacío.
    }

    // Comprueba si se ha seleccionado una fecha.
    if (this.fechaProgramada && this.fechaProgramada instanceof Date) {
      // Si se ha seleccionado una fecha, verifica si es válida.
      if (!this.esFechaValida()) {
        console.error('La fecha programada no es válida.');
        this.submitted = true; // Asegura que se muestren los mensajes de error.
        return; // Detiene la ejecución si la fecha no es válida.
      }
      // Si la fecha es válida o no se ha seleccionado ninguna fecha, procede con la publicación.
    }

    // Si llega hasta aquí, todo está bien para proceder con la publicación.
    console.log('Publicación agregada con éxito.');
    this.publicacionesService.agregarPublicacion(this.publicacion);
    this.ref.close(); // Cierra el modal después de la publicación.
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

  //Metodo get para obtener campanias desde BD
  getCampanias(): void {
    this.publicacionesService.getCampanias()
      .subscribe((response: GenericResponse<CampaniasBody>) => {
        if (response)
          this.campanias = response.body.data;
        console.log('Respuesta de campanias:', this.campanias);
      },
        (error) => {
          console.error('Error al obtener las campañas:', error);
          // HandleError
        }
      );
  }
  agregarNuevaCampania(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const nuevaSubcampania = inputElement.value.trim();
    let nuevaCampania: Campanias = { idsubcampanas: 0, nombrecampana: '', status: 0, idredsocial: 0, idpublicacion: 0, idusuario: 0, iddistribuidor: 0, fechainicio: '', fechafin: '' };
    nuevaCampania.nombrecampana = nuevaSubcampania;
    this.publicacionesService.setNuevaCampania(nuevaCampania).subscribe((response: GenericResponse<string>) => {
      if (response)
        console.log(response);
        inputElement.value = ''; 
      this.getCampanias();
    },
      (error) => {
        console.error('Error al obtener las campañas:', error);
        // HandleError
      }
    );
  }

  closeModal() {
    this.ref.close();
  }

}
