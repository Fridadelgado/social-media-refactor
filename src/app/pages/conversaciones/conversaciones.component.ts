import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-conversaciones',
  templateUrl: './conversaciones.component.html',
  styleUrls: ['./conversaciones.component.scss']
})
export class ConversacionesComponent {
  urlSegura: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const url = "https://socialmedia.sicopweb.net/?tab=conversaciones";
    this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
