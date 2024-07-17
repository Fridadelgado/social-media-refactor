import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Campanias, CampaniasBody, GenericResponse } from '../interfaces/campanias.interface';
import { GlobalConstants } from '../common/global-constants';
import { BasePayload, FacebookPayload, InstagramPayload, MediaPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from '../interfaces/red-social-payload.interface';

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
  
  constructor(private http: HttpClient) { }

  get publicaciones(): Observable<Publicacion[]> {
    return this._publicaciones.asObservable();
  }

  private getPayloadAndUrl(publicacion: Publicacion, red: string): { payload: BasePayload | MediaPayload, url: string } {
    console.log(red);

    const basePayload: BasePayload = {
      email: 'default.pruebas@seekop.com',
      distribuidor: '104425'
    };

    switch (red.toLowerCase()) {
      case 'twitter':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen } as TwitterPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarentwitter`
        };
      case 'facebook':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen } as FacebookPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenfacebook`
        };
      case 'youtube':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen } as YouTubePayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenyoutube`
        };
      case 'instagram':
        return {
          payload: { ...basePayload, text: publicacion.titulo, mediaBase64: publicacion.imagen } as InstagramPayload,
          url: `${GlobalConstants.urlApiPublicar}publicareninstagram`
        };
      case 'tiktok':
        return {
          payload: { ...basePayload, text: publicacion.titulo } as TikTokPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarentiktok`
        };
      case 'pinterest':
        return {
          payload: { ...basePayload, title: publicacion.titulo, alt_text: publicacion.titulo, description: publicacion.descripcion } as PinterestPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenpinterest`
        };
      default:
        throw new Error(`Red social no soportada: ${red}`);
    }
  }

  private async publicarEnRedSocial(publicacion: Publicacion, red: string): Promise<any> {
    const { payload, url } = this.getPayloadAndUrl(publicacion, red);
    console.log(payload);
    /*
      if (payload.hasOwnProperty('mediaBase64') && payload.mediaBase64 && /^data:image\/[a-z]+;base64,/.test(payload.mediaBase64)) {
        payload.mediaBase64 = payload.mediaBase64.split(',')[1];
      }*/

    try {
      const response = await this.http.post(url, payload).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al publicar en ${red}:`, error);
      throw error;
    }
  }


  // Función principal para agregar una publicación en varias redes sociales
  agregarPublicacion(publicacion: Publicacion): Observable<any> {
    const requests = publicacion.redSocial.map(red => this.publicarEnRedSocial(publicacion, red));

    return new Observable(observer => {
      Promise.all(requests)
        .then(responses => {
          console.log("Este es el response:", responses);


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
        })
        .catch(error => {
          console.error('Error al publicar en redes sociales:', error);
          observer.error(error);
        });
    });
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

 

 
}
