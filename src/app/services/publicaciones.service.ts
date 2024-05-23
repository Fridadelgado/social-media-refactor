import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Campanias, CampaniasBody, GenericResponse } from '../interfaces/campanias.interface';
import { GlobalConstants } from '../common/global-constants';
import { ResponseRedesSociales } from '../interfaces/redes-sociales.interface';

export interface Publicacion {
  redSocial: string[];
  titulo: string;
  descripcion: string;
  subcampanas: string[];
  imagen: string;
  video: string;
  link: string;
  thumbnail?: string;
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

  agregarPublicacion(publicacion: Publicacion): Observable<any> {
    let imageBase64 = publicacion.imagen;
    const base64ImagePattern = /^data:image\/[a-z]+;base64,/;

    if (base64ImagePattern.test(imageBase64)) {
      imageBase64 = imageBase64.split(',')[1];
    }

    const payload = {
      text: publicacion.titulo + ' - ' + publicacion.descripcion,
      imageBase64: imageBase64,
      videoBase64: publicacion.video ? publicacion.video.split(',')[1] : null,
      title: publicacion.titulo,
      description: publicacion.descripcion
    };

    const requests = publicacion.redSocial.map(red => {
      switch (red) {
        case 'twitter':
          return this.publicarEnTwitter(payload);
        case 'facebook':
          return this.publicarEnFacebook(payload);
        case 'youtube':
          return this.publicarEnYouTube(payload);
        default:
          return Promise.reject(`Red social no soportada: ${red}`);
      }
    });

    return new Observable(observer => {
      Promise.all(requests).then(responses => {
        console.log("este es el response ",responses);

        // Filtrar las respuestas exitosas de YouTube
        const youtubeResponse = responses.find(response =>
          response.statusCode === 200 && response.body && response.body.data && response.body.data.kind === 'youtube#video'
        );

        if (youtubeResponse && youtubeResponse.body.data.snippet.thumbnails) {
          publicacion.thumbnail = youtubeResponse.body.data.snippet.thumbnails.high.url;
          publicacion.link = `https://www.youtube.com/watch?v=${youtubeResponse.body.data.id}`;
        }

        this.actualizarPublicaciones(publicacion);
        observer.next(responses);
        observer.complete();
      }).catch(error => {
        console.error('Error al publicar en redes sociales', error);
        observer.error(error);
      });
    });
  }

  private publicarEnTwitter(payload: any): Promise<any> {
    return this.http.post(`${this.baseUrl}publicarentwitter`, payload).toPromise();
  }

  private publicarEnFacebook(payload: any): Promise<any> {
    return this.http.post(`${this.baseUrl}publicarenfacebook`, payload).toPromise();
  }

  private publicarEnYouTube(payload: any): Promise<any> {
    return this.http.post(`${this.baseUrl}publicarenyoutube`, payload).toPromise();
  }

  private actualizarPublicaciones(publicacion: Publicacion) {
    const currentValue = this._publicaciones.value;
    this._publicaciones.next([...currentValue, publicacion]);
  }

  getCampanias(): Observable<GenericResponse<CampaniasBody>> {
    return this.http.get<GenericResponse<CampaniasBody>>(GlobalConstants.urlApiCampanias);
  }

  setNuevaCampania(registroNuevaCampania: Campanias): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(GlobalConstants.urlApiCampanias, registroNuevaCampania);
  }

  getRedesSociales(): Observable<ResponseRedesSociales> {
    return this.http.get<ResponseRedesSociales>(GlobalConstants.urlApiRedesSociales);
  }
}
