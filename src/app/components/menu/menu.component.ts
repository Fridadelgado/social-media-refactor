import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  menuItems = [
    {
      title: 'Home',
      link: '/home',
      icon: 'home-outline',
    },
    {
      title: 'Users',
      link: '/users',
      icon: 'people-outline',
    },
    {
      title: 'calendariopublicaciones',
      link: '/calendariopublicaciones',
      icon: 'home-outline',
    },
    {
      title: 'pulicacioes',
      link: '/publicaciones',
      icon: 'home-outline',
    },
    
    // Añade más elementos de menú según sea necesario
  ];
}
