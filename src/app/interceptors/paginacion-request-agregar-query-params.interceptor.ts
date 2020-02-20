import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

//#region bibliotecas
import { Observable } from 'rxjs';
import * as _ from 'lodash';
//#endregion bibliotecas


@Injectable({
  providedIn: 'root'
})
export class PaginacionRequestAgregarQueryParamsInterceptor implements HttpInterceptor {
  constructor(
    private rutaActiva: ActivatedRoute
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let $httpEvent: Observable<HttpEvent<any>>;

    if (req.method === 'GET' && req.headers.get('Paginacion') === 'true') {
      const paginacionNumero = this.obtenerRutaActivaQueryParam('pag',
        _.toString(environment.paginacionNumero));
      const paginacionTamanyo = this.obtenerRutaActivaQueryParam('tam',
        _.toString(environment.paginacionTamanyo));

      const queryParams = req.params
        .set('num', paginacionNumero)
        .set('tam', paginacionTamanyo);
      const reqModificada = req.clone({ params: queryParams });

      $httpEvent = next.handle(reqModificada);
    } else {
      $httpEvent = next.handle(req);
    }
    return $httpEvent;
  }

  obtenerRutaActivaQueryParam(nombrePropiedad: string, valorDefecto?: any) {
    if (_.has(this.rutaActiva.snapshot.queryParams, nombrePropiedad)) {
      return this.rutaActiva.snapshot.queryParams[nombrePropiedad];
    }

    if (!_.isNil(valorDefecto)) {
      return valorDefecto;
    }
  }
}
