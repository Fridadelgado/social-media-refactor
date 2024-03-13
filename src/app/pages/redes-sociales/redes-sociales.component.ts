import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrl: './redes-sociales.component.scss'
})
export class RedesSocialesComponent {
  urlSegura: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const url = "https://socialmedia.sicopweb.net/?tab=redes-sociales";
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
