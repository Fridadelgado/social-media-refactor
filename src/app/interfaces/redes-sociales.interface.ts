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
