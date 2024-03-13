import { Component } from '@angular/core';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {
  menuItems = [
    {
      title: 'Users',
      link: '/#',
      icon: 'mdi-megamenu',
    },
    {
      title: 'Home',
      link: '/home',
      icon: 'mdi-home-outline',
    },
    {
      title: 'calendariopublicaciones',
      link: '/calendariopublicaciones',
      icon: 'calendar-text-outline',
    },
    {
      title: 'pulicacioes',
      link: '/publicaciones',
      icon: 'text-box-plus-outline-success',
    },

    // Añade más elementos de menú según sea necesario
  ];

  constructor(private iconLibraries: NbIconLibraries) {}

  ngOnInit() {
   this.iconLibraries.setDefaultPack('seekop');
  }


}
