import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-distribuidores-asignados',
  templateUrl: './distribuidores-asignados.component.html',
  styleUrl: './distribuidores-asignados.component.scss'
})
export class DistribuidoresAsignadosComponent {
  urlSegura: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const url = "https://socialmedia.sicopweb.net/?tab=distribuidores";
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
