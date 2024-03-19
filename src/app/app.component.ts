import { Component } from '@angular/core';
import { LanguageService } from './services/translate-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private languageService: LanguageService) { }
}
