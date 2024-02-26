// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthResult } from '@nebular/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private nbAuthService: NbAuthService) {}

  login(email: string, password: string): Observable<NbAuthResult> {
    // Retornamos el Observable aquí para que el componente pueda suscribirse a él
    return this.nbAuthService.authenticate('email', { email, password });
  }
}
