export interface PaginacionParams {
    pagina: number;
    paginaTamanyo: 5 | 10 | 25 | 50;
    cantidadColeccion?: number;
    paginaPrevia?: any;
}
