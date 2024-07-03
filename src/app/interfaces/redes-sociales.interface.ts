export type ResponseRedesSociales = RedesSociales[]

export interface RedesSociales {
  idred: number
  nombre: string
  endpointapi: string
  client_id: string
  client_secret: string
  icon: string
  fileType: string
  selected?: boolean;
}

export interface PinterestPublicacion{
    email: string;
    distribuidor: string;
    title: string;
    description: string;
    alt_text: string;
}