import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of, tap } from 'rxjs';
import { Campanias, CampaniasBody, GenericResponse } from '../interfaces/campanias.interface';
import { GlobalConstants } from '../common/global-constants';
import { BasePayload, FacebookPayload, InstagramPayload, MediaPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from '../interfaces/red-social-payload.interface';
import { Root, SelectedRedesSociales, SocialMediaPayload } from '../interfaces/redes-sociales.interface';

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

  private getPayloadAndUrl(red:SelectedRedesSociales): { payload: BasePayload | MediaPayload, url: string } {
    console.log(red);
  
    const basePayload: BasePayload = {
      email: 'default.pruebas@seekop.com',
      distribuidor: '104425'
    };
  
    switch (red.nombreRedSocial.toLowerCase()) {
      case 'twitter':
        return {
          payload: { ...basePayload, text: red.formularioRedSocial.text, mediaBase64:  red.formularioRedSocial.mediaBase64 } as TwitterPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarentwitter`
        };
      case 'facebook':
        return {
          payload: { ...basePayload, text:  red.formularioRedSocial.text, mediaBase64:  red.formularioRedSocial.mediaBase64 } as FacebookPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenfacebook`
        };
      case 'youtube':
        return {
          payload: { ...basePayload, text:  red.formularioRedSocial.text, mediaBase64:  red.formularioRedSocial.mediaBase64 } as YouTubePayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenyoutube`
        };
      case 'instagram':
        return {
          payload: { ...basePayload, text:  red.formularioRedSocial.text, mediaBase64:  red.formularioRedSocial.mediaBase64 } as InstagramPayload,
          url: `${GlobalConstants.urlApiPublicar}publicareninstagram`
        };
      case 'tiktok':
        return {
          payload: { ...basePayload, text:  red.formularioRedSocial.text, mediaBase64:  red.formularioRedSocial.mediaBase64 } as TikTokPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarentiktok`
        };
      case 'pinterest':
        return {
          payload: { ...basePayload, title:  red.formularioRedSocial.text, alt_text:  red.formularioRedSocial.text, mediaBase64:  red.formularioRedSocial.mediaBase64 } as PinterestPayload,
          url: `${GlobalConstants.urlApiPublicar}publicarenpinterest`
        };
      default:
        throw new Error(`Red social no soportada: ${red}`);
    }
  }
  
  
  private async publicarEnRedSocial(red: SelectedRedesSociales): Promise<any> {
    const { payload, url } = this.getPayloadAndUrl(red);
    try {
      const response = await this.http.post(url, payload).toPromise();
      return response;
    } catch (error) {
      console.error(`Error al publicar en ${red.nombreRedSocial}:`, error);
      throw error;
    }
  }


  // Función principal para agregar una publicación en varias redes sociales
  agregarPublicacion(root: Root): Observable<any> {
    const requests = root.selectedRedesSociales.map(red => this.publicarEnRedSocial(red));
    return from(Promise.all(requests));
  }

   /* return new Observable(observer => {
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
    });*/  

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
