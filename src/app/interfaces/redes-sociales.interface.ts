import { FacebookPayload, InstagramPayload, PinterestPayload, TikTokPayload, TwitterPayload, YouTubePayload } from "./red-social-payload.interface"

export type ResponseRedesSociales = RedesSociales[]

export interface RedesSociales {
  idred: number
  nombre: string
  endpointapi: string
  client_id: string
  client_secret: string
  icon: string
  selected?: boolean;
}

export interface Root {
  selectedRedesSociales: SelectedRedesSociales[];
}

export type SocialMediaPayload = FacebookPayload | TikTokPayload | InstagramPayload | TwitterPayload | YouTubePayload | PinterestPayload;

export interface SelectedRedesSociales {
  nombreRedSocial: string
  iconoRedSocial: string
  formularioRedSocial: SocialMediaPayload
}
export interface PinterestPublicacion{
    email: string;
    distribuidor: string;
    title: string;
    description: string;
    alt_text: string;
}