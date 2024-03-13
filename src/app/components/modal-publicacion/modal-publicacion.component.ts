import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { PublicacionesService, Publicacion } from '../../services/publicaciones.service';

@Component({
  selector: 'app-modal-publicacion',
  templateUrl: './modal-publicacion.component.html',
  styleUrls: ['./modal-publicacion.component.scss']
})
export class ModalPublicacionComponent {
  publicacion: Publicacion = {redSocial: [], titulo: '', descripcion: '', imagen: '', link: ''};
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


  constructor(
    protected ref: NbDialogRef<ModalPublicacionComponent>,
    private publicacionesService: PublicacionesService
  ) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.imagenPrevisualizacion = reader.result;
        this.publicacion.imagen = reader.result as string; // Asegúrate de que también actualizas la propiedad imagen de la publicación
      };
      reader.readAsDataURL(file);
    }
  }

  definirAudiencia() {
    // Implementar lógica para definir la audiencia
  }

  agregarPublicacion() {
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
      facebook: '../../../assets/images/avatar-user.png', // Asegúrate de poner la ruta correcta a tus imágenes
      twitter: 'path/to/twitter-icon.png',
      instagram: 'path/to/instagram-icon.png',
      linkedin: 'path/to/linkedin-icon.png',
      tiktok: 'path/to/tiktok-icon.png',
      pinterest: 'path/to/pinterest-icon.png',
      // y así sucesivamente...
    };

    return iconsMap[red] || 'path/to/default-icon.png';
  }
}
