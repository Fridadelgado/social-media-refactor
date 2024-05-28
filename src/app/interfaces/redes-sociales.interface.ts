export type ResponseRedesSociales = RedesSociales[]

export interface RedesSociales {
  idred: number
  nombre: string
  endpointapi: string
  apikey: string
  secretkey: string
  icon: string
  selected?: boolean;
}
