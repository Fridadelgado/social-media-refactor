import { Component } from '@angular/core';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss']
})
export class PublicacionesComponent {
  selectedPreview = [];
  // Agregamos la nueva propiedad para manejar las redes sociales seleccionadas
  selectedSocialMedia = [];

  previewOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Twitter', label: 'Twitter' },
    // otros valores según sea necesario
  ];

  socialMedias = [
    { value: 'facebook', label: 'Facebook', icon: 'path/to/facebook-icon.png' },
    { value: 'twitter', label: 'Twitter', icon: 'path/to/twitter-icon.png' },
    // Agrega las demás redes sociales aquí
  ];

  publicaciones = [
    {
      redSocial: 'Facebook',
      titulo: 'Kia Coacalco',
      descripcion: 'Conoce la nueva Kia Sportage 2024 desde $580,000.00 MXN',
      imagen: '../../../assets/images/avatar-user.png',
      link: 'https://www.facebook.com/KiaCoacalco'
    },
    // ... más publicaciones
  ];

  // Aquí puedes agregar más lógica según sea necesario
}
