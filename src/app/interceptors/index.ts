import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';

//#region interceptores
import { ConvertirRespuestasErroresInterceptor } from './convertir-respuestas-errores.interceptor';
import { MostrarOcultarSpinnerInterceptor } from './mostrar-ocultar-spinner.interceptor';
import { PaginacionRequestAgregarQueryParamsInterceptor } from './paginacion-request-agregar-query-params.interceptor';
import { AgregarHeadersInterceptor } from './agregar-headers.interceptor';
//#endregion interceptores


/** Proveedores para interceptores HTTP en el orden del arreglo */
export const httpInterceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ConvertirRespuestasErroresInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MostrarOcultarSpinnerInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: PaginacionRequestAgregarQueryParamsInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AgregarHeadersInterceptor,
    multi: true
  }
];
