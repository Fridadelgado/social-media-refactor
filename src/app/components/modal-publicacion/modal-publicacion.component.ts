import { Component, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme'; // Para manejar el cierre del modal.
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service'; // Servicio para manejar las publicaciones.
import { TranslateService } from '@ngx-translate/core'; // Para la internacionalización.
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop'; // Para la carga de archivos.
import { Campanias, CampaniasBody, GenericResponse } from 'src/app/interfaces/campanias.interface';
import { DynamicComponentService } from '../../services/dynamic-component-service.service';
import { GenericOptionsSelect, RedesSociales, ResponseRedesSociales } from 'src/app/interfaces/redes-sociales.interface';
import { RedesSocialesService } from 'src/app/services/redes-sociales.service';
import { IPublicacion } from 'src/app/interfaces/publicacion.interface';

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

  tipoArchivo: string = ''; //Define el formato de la imagen o video
  imageExtensions = /\.(jpg|jpeg|png|gif|bmp)$/i;
  videoExtensions = /\.(mp4|avi|mov|mkv|flv|wmv)$/i;
  campanias: Campanias[] = [];
  redesSociales: ResponseRedesSociales = [];
  publicacionRedes = {
    redSocial: []
  };

  publicacionDefault = {
    titulo: 'Título Predeterminado',
    descripcion: 'Descripción predeterminada... Este coche no es solo un medio de transporte; es tu próximo compañero de aventuras. Con su elegante diseño, confort inigualable y rendimiento excepcional, está listo para convertirse en parte de tu vida y llevarte a nuevos destinos.',
    redSocial: ['facebook', 'twitter'], // Asume que estos valores están en tu array de `redesSocialesDisponibles`
  };

  public defaultPreviewImage: string = '../../../assets/images/defaultcar.png'; // Asegúrate de tener esta imagen en tus activos

  publicacion: Publicacion = { redSocial: [], titulo: '', descripcion: '', subcampanas: [], imagen: '', link: '', video: '' };

  imagenPrevisualizacion: string | ArrayBuffer | null = '';

  submitted = false; // Controla la validación del formulario.
  dropZoneMessage: string = ""; // Mensaje de la zona de arrastre de archivos.
  isValidFile: boolean = false; // Controla si el archivo cargado es válido.
  minDate: Date;
  fileType: string = "";

  formPublicacion!: IPublicacion;

  constructor(
    protected ref: NbDialogRef<ModalPublicacionComponent>,
    private publicacionesService: PublicacionesService,
    private translate: TranslateService,
    private redesSocialesService:RedesSocialesService,
    private cdr: ChangeDetectorRef,
    private dynamicComponentService: DynamicComponentService // Inyecta el servicio aquí
  ) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit(): void {
    // Obtiene el mensaje predeterminado para la zona de arrastre.
    //this.fechaProgramada = this.ref;
    this.getCampanias();
    this.getRedesSociales();
    this.translate.get('components.modal-publicacion.dropZoneDefault').subscribe((res: string) => {
      this.dropZoneMessage = res;
    });
  }

  getRedesSociales(): void {
    this.redesSocialesService.getRedesSociales()
      .subscribe((redesSociales: ResponseRedesSociales) => {
        if (redesSociales && redesSociales.length > 0)
          this.redesSociales = redesSociales.map(redSocial => {
            switch (redSocial.nombre.toLowerCase()) {
              case 'facebook':
              case 'twitter':
                return { ...redSocial, fileType: 'both' };
              case 'instagram':
              case 'pinterest':
                return { ...redSocial, fileType: 'imagen' };
              case 'youtube':
              case 'tik tok':
                return { ...redSocial, fileType: 'video' };
              default:
                return { ...redSocial, fileType: 'both' };
            }
          });
        console.log(this.redesSociales);
      },
        (error) => {
          console.error('Error al obtener las redes sociales:', error);
          // HandleError
        }
      );
  }

  onRedSocialChange(event: any) {
    console.log('ngModelChange event:', event);
    this.updateDropZoneMessage(event);
  }

  updateDropZoneMessage(event: string[]) {
    const selectedRedSocialName = event[0]; // Asumimos que solo seleccionas una red social a la vez.
    const selectedRedSocial = this.redesSociales.find(rs => rs.nombre === selectedRedSocialName);
    
    /*if (selectedRedSocial) {
      console.log(selectedRedSocial);
      switch (selectedRedSocial.fileType) {
        case 'imagen':
          this.dropZoneMessage = 'Arrastra tu imagen aquí o haz clic para seleccionar';
          break;
        case 'video':
          this.dropZoneMessage = 'Arrastra tu video aquí o haz clic para seleccionar';
          break;
        case 'both':
        default:
          this.dropZoneMessage = 'Arrastra tu imagen o video aquí o haz clic para seleccionar';
          break;
      }
    } else {
      this.dropZoneMessage = 'Arrastra y suelta tu archivo aquí';
    }
  */
  }
  


  //Metodo para obtener campañas
  getCampanias(): void {
    this.publicacionesService.getCampanias()
      .subscribe((response: GenericResponse<CampaniasBody>) => {
        if (response)
          this.campanias = response.body.data;
      },
        (error) => {
          console.error('Error al obtener las campañas:', error);
          // HandleError
        }
      );
  }

  onFileDrop(files: NgxFileDropEntry[]) {
    console.log("onfileDrop",files);
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
      console.log(this.isValidFile);
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

/*
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

    // Muestra el modal de carga
    this.dynamicComponentService.showBodyLoading();

    // Llama al servicio para agregar la publicación
    this.publicacionesService.agregarPublicacion(this.publicacion).subscribe(
      () => {
        console.log('Publicación agregada con éxito.');
        this.dynamicComponentService.destroyBodyLoading(); // Destruye el modal de carga
        this.ref.close(); // Cierra el modal
      },
      (error: any) => {
        console.error('Error al agregar la publicación:', error);
        this.dynamicComponentService.destroyBodyLoading(); // Destruye el modal de carga en caso de error
      }
    );
  }
*/
  calendarizar() {
    // Lógica para calendarizar la publicación.
  }

  cancelar() {
    this.ref.close(); // Cierra el modal.
  }

  // Funcion disparada por el boton submit en el footer
  publicar(): void {
    console.log(this.formPublicacion);
  }

  getSocialMediaIcon(red: string): string {
    if (this.publicacion.redSocial && this.publicacion.redSocial.length > 0) {
      const socialMedia = this.redesSociales.find(media => media.nombre.toLowerCase() === red.toLowerCase());
      return socialMedia ? socialMedia.icon : 'default-icon';
    }
    return '';
  }


  //Metodo get para obtener campanias desde BD

  agregarNuevaCampania(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const nuevaSubcampania = inputElement.value.trim();
    let nuevaCampania: Campanias = { idsubcampanas: 0, nombrecampana: '', status: 0, idredsocial: 0, idpublicacion: 0, idusuario: 0, iddistribuidor: 0, fechainicio: '', fechafin: '' };
    nuevaCampania.nombrecampana = nuevaSubcampania;
    this.publicacionesService.setNuevaCampania(nuevaCampania).subscribe((response: GenericResponse<string>) => {
      if (response)
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

  // getter para obtener los valores de Redes Sociales a pasar al input tipo select correspondiente
  get optionsRedesSociales(): GenericOptionsSelect[] {
    return this.redesSociales.map(option => this.toOptionsRedes(option));
  }
  // Funcion para el objeto de valores para el array de Redes Sociales
  toOptionsRedes(item: RedesSociales): GenericOptionsSelect {
    return {
      label: item.nombre,
      value: item.nombre,
    }
  }

  // getter para obtener los valores de Campañas a pasar al input tipo select correspondiente
  get optionsCampanias(): GenericOptionsSelect[] {
    return this.campanias.map(option => this.toOptionsCampanias(option));
  }
  // Funcion para el objeto de valores para el array de Campañas
  toOptionsCampanias(item: Campanias): GenericOptionsSelect {
    return {
      label: item.nombrecampana,
      value: item.idsubcampanas,
    }
  }

  //Función que obtiene el objeto lleno en el formulario
  onFormValuesChange(values: IPublicacion) {
    this.formPublicacion = values;
  }
}
