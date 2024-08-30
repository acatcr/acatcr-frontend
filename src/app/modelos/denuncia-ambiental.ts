export interface DenunciaAmbiental {
    id: string,
    sitadaId: string,
    informePolicialId: string,    
    coordenadaX: number,
    coordenadaY: number,
    nombreAsp: string,
    nombreSector: string,
    nombreFuncionarioResponsable: string,    
    fechaInfraccion: Date,
    nombreImputado: string,
    tipoDelito: string
}