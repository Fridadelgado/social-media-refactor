import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Publicacion {
  redSocial: string[];
  titulo: string;
  descripcion: string;
  imagen: string; // Esta propiedad contendrá la imagen codificada en base64
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
    if (publicacion.redSocial.includes('twitter')) {
      // Elimina el prefijo 'data:image/jpeg;base64,' antes de enviar
      let imageBase64 = publicacion.imagen;
      const base64ImagePattern = /^data:image\/[a-z]+;base64,/;
      if (base64ImagePattern.test(imageBase64)) {
        imageBase64 = imageBase64.split(',')[1]; // Extrae solo la parte base64 de la cadena
      }

      const payload = {
        text: publicacion.titulo + ' - ' + publicacion.descripcion,
        imageBase64: imageBase64 // Envía solo la cadena base64 de la imagen
      };

      console.log("Payload a enviar:", payload); // Para depuración, se recomienda eliminar en producción

      this.http.post(`${this.baseUrl}publicarentwitter`, payload).subscribe({
        next: (response) => {
          console.log('Publicación exitosa', response);
          this.actualizarPublicaciones(publicacion); // Actualiza el estado de las publicaciones
        },
        error: (error) => console.error('Error al publicar en Twitter', error)
      });
    } else {
      // Maneja otras redes sociales o actualiza el estado directamente
      this.actualizarPublicaciones(publicacion);
    }
  }

  private actualizarPublicaciones(publicacion: Publicacion) {
    const currentValue = this._publicaciones.value;
    this._publicaciones.next([...currentValue, publicacion]);
  }
}
