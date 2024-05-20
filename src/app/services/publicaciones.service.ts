import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Campanias, CampaniasBody, GenericResponse } from '../interfaces/campanias.interface';
import { GlobalConstants } from '../common/global-constants';

export interface Publicacion {
  redSocial: string[];
  titulo: string;
  descripcion: string;
  subcampanas: string[];
  imagen: string; // Esta propiedad contendrá la imagen codificada en base64
  video: string;
  link: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  private _publicaciones = new BehaviorSubject<Publicacion[]>([]);
  private baseUrl = 'https://fzq9t36ec9.execute-api.us-west-1.amazonaws.com/dev/';

  constructor(private http: HttpClient) { }

  get publicaciones(): Observable<Publicacion[]> {
    return this._publicaciones.asObservable();
  }

  agregarPublicacion(publicacion: Publicacion) {
    let imageBase64 = publicacion.imagen;
    const base64ImagePattern = /^data:image\/[a-z]+;base64,/;

    if (base64ImagePattern.test(imageBase64)) {
      imageBase64 = imageBase64.split(',')[1]; // Extrae solo la parte base64 de la cadena
    }

    const payload = {
      text: publicacion.titulo + ' - ' + publicacion.descripcion,
      imageBase64: imageBase64
    };

    const requests = publicacion.redSocial.map(red => {
      switch (red) {
        case 'twitter':
          return this.publicarEnTwitter(payload);
        case 'facebook':
          return this.publicarEnFacebook(payload);
        default:
          return Promise.reject(`Red social no soportada: ${red}`);
      }
    });

    Promise.all(requests).then(() => {
      this.actualizarPublicaciones(publicacion); // Actualiza una vez que todas las publicaciones han sido exitosas
    }).catch(error => console.error('Error al publicar en redes sociales', error));
  }


  private publicarEnTwitter(payload: any): Promise<any> {
    return this.http.post(`${this.baseUrl}publicarentwitter`, payload).toPromise();
  }

  private publicarEnFacebook(payload: any): Promise<any> {
    return this.http.post(`${this.baseUrl}publicarenfacebook`, payload).toPromise();
  }


  private actualizarPublicaciones(publicacion: Publicacion) {
    const currentValue = this._publicaciones.value;
    this._publicaciones.next([...currentValue, publicacion]);
  }

  getCampanias(): Observable<GenericResponse<CampaniasBody>> {
    return this.http.get<GenericResponse<CampaniasBody>>(GlobalConstants.urlApiCampanias)
  }

  setNuevaCampania(registroNuevaCampania: Campanias): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(GlobalConstants.urlApiCampanias, registroNuevaCampania);
  }
}

