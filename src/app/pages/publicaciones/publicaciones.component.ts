import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service';
import { ModalPublicacionComponent } from '../../components/modal-publicacion/modal-publicacion.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent implements OnInit {
  publicaciones: Publicacion[] = [];

  constructor(
    private publicacionesService: PublicacionesService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.publicacionesService.publicaciones.subscribe(publicaciones => {
      this.publicaciones = publicaciones;
    });
  }

  openModal() {
    this.dialogService.open(ModalPublicacionComponent, {
      context: {}, // Contexto y datos adicionales
      dialogClass: 'custom-modal-full', // Usar esto para ajustar el tamaño
    });
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
