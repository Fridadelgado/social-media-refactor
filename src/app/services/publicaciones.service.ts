// Autor: Gilberto García (gilberto.garcia@seekop.com)
// publicaciones.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define la estructura de datos para una publicación, incluyendo los campos necesarios
// como redSocial (un arreglo de nombres de redes sociales), título, descripción, imagen y link.
export interface Publicacion {
  redSocial: string[];
  titulo: string;
  descripcion: string;
  imagen: string;
  link: string;
}

// El decorador @Injectable marca la clase como disponible para ser provista e inyectada como dependencia.
// providedIn: 'root' indica que el servicio es global y disponible en toda la aplicación.
@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  // _publicaciones es un BehaviorSubject que mantiene un estado reactivo de la lista de publicaciones.
  // Se inicializa como un arreglo vacío de Publicacion.
  private _publicaciones = new BehaviorSubject<Publicacion[]>([]);

  constructor() { }

  // Método público para acceder al estado actual de las publicaciones de manera reactiva.
  // Devuelve un Observable que permite a los suscriptores reaccionar a cambios en la lista de publicaciones.
  get publicaciones(): Observable<Publicacion[]> {
    return this._publicaciones.asObservable();
  }

  // Método para agregar una nueva publicación al estado actual.
  // Recibe un objeto Publicacion, lo agrega al arreglo existente y actualiza el BehaviorSubject.
  agregarPublicacion(publicacion: Publicacion) {
    const currentValue = this._publicaciones.value; // Obtiene el valor actual del BehaviorSubject.
    this._publicaciones.next([...currentValue, publicacion]); // Añade la nueva publicación y emite el nuevo estado.
  }
}
