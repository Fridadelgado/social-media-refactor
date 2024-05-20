import { Component, OnInit } from '@angular/core';
import { NbDialogService  } from '@nebular/theme';
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service';
import { ModalPublicacionComponent } from '../../components/modal-publicacion/modal-publicacion.component';

// Decorador Component que define metadatos para el componente PublicacionesComponent.
@Component({
  selector: 'app-publicaciones', // Selector CSS del componente.
  templateUrl: './publicaciones.component.html', // Ruta al archivo HTML que define la vista del componente.
  styleUrls: ['./publicaciones.component.scss'] // Ruta a los estilos específicos del componente.
})
export class PublicacionesComponent implements OnInit {
  // Arreglo para almacenar las publicaciones obtenidas del servicio PublicacionesService.
  publicaciones: Publicacion[] = [];

  constructor(
    private publicacionesService: PublicacionesService, // Inyección del servicio PublicacionesService.
    private dialogService: NbDialogService, // Inyección del servicio NbDialogService para manejo de diálogos/modales.

    ) { }

  // Hook ngOnInit que se ejecuta después de la inicialización del componente.
  ngOnInit() {
    // Se suscribe al observable de publicaciones del servicio PublicacionesService
    // para obtener las publicaciones y asignarlas a la propiedad local.
    this.publicacionesService.publicaciones.subscribe(publicaciones => {
      this.publicaciones = publicaciones;
    });
  }

  // Método para abrir un modal de publicación.
  openModal() {
    this.dialogService.open(ModalPublicacionComponent, {
      context: {}, // Contexto y datos adicionales para pasar al modal.
      dialogClass: 'custom-modal-full', // Clase CSS para personalizar el modal, p.ej., ajustar su tamaño.
    });
  }

  // Método para obtener el ícono de una red social específica.
  // `red` es el nombre de la red social.
  // Retorna la URL del ícono correspondiente o un ícono por defecto si la red no está en el mapa.
  getSocialMediaIcon(red: string): string {
    const iconsMap: { [key: string]: string } = {
      facebook: 'facebook-icon', // Asume que estos son los nombres de los íconos en tu paquete
      twitter: 'twitter-icon',
      instagram: 'instagram-icon',
      linkedin: 'linkedin-icon',
      tiktok: 'tiktok-icon',
      pinterest: 'pinterest-icon',
      youtube: 'youtube-icon'
      // Asegúrate de que estos nombres coincidan con tu configuración.
    };

    return iconsMap[red] || 'default-icon'; // Retorna el nombre del ícono o un valor predeterminado
  }

  isVideo(url: string): boolean {
    // Lógica para determinar si la URL apunta a un video
    const videoExtensions = /\.(mp4|avi|mov|mkv|flv|wmv)$/i;
    return videoExtensions.test(url);
  }
}
