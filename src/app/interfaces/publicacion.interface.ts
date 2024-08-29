import { Publicacion } from "../services/publicaciones.service";

type PickPublicacion = Pick<Publicacion, "titulo" | "descripcion" | "subcampanas">;

export interface IPublicacion extends PickPublicacion {
    redSocial: string;
    fecha: Date;
    archivo: File;
}