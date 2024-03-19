import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
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
    private dialogService: NbDialogService // Inyección del servicio NbDialogService para manejo de diálogos/modales.
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
    // Mapa de nombres de redes sociales a URLs de sus íconos.
    const iconsMap: { [key: string]: string } = {
      // Ejemplos de mapeo.
      // Asegúrate de que las URLs sean accesibles y permisibles para su uso.
      facebook: 'https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-0.png', // Asegúrate de poner la ruta correcta a tus imágenes
      twitter: 'https://img.freepik.com/vector-gratis/nuevo-diseno-icono-x-logotipo-twitter-2023_1017-45418.jpg?size=338&ext=jpg&ga=GA1.1.1546980028.1710288000&semt=ais',
      instagram: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png',
      linkedin: 'https://cdn-icons-png.flaticon.com/256/174/174857.png',
      tiktok: 'https://cdn.pixabay.com/photo/2021/01/30/06/42/tiktok-5962992_640.png',
      pinterest: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
      youtube: 'https://w7.pngwing.com/pngs/982/799/png-transparent-youtube-logo-youtube-logo-internet-marketing-subscribe-television-label-text.png'
      // Agregar más redes sociales según sea necesario.
    };
    // Retorna la URL del ícono para la red proporcionada o un ícono por defecto si no se encuentra.
    return iconsMap[red] || 'path/to/default-icon.png';
  }
}
