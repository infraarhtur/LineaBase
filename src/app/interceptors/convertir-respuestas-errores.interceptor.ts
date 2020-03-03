import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

//#region interfaces
import { HttpErrorResponseInit } from '../interfaces/http-error-response-init.interface';
//#endregion interfaces

//#region models
import { ErrorControlado } from '../models/error-controlado';
import { ErrorNoControlado } from '../models/error-no-controlado';
import { Pagina } from '../models/pagina';
import { Respuesta } from '../models/respuesta';
//#endregion models

//#region services
import { UtilidadesService } from '../services/utilidades.service';
//#endregion services

//#region bibliotecas
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as _ from 'lodash';
//#endregion bibliotecas


@Injectable({
  providedIn: 'root'
})
export class ConvertirRespuestasErroresInterceptor implements HttpInterceptor {
  // tslint:disable: variable-name
  private static pag$ = new Subject<Pagina>();

  public static get pagina$(): Observable<Pagina> {
    return ConvertirRespuestasErroresInterceptor.pag$.asObservable();
  }

  private __mostrarAlerta = false;

  constructor(private __utilidadesService: UtilidadesService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          const respuesta = this.obtenerRespuesta(event);
          const codigoEstado = this.obtenerCodigoEstado(event);

          if (
            codigoEstado >= 200 &&
            codigoEstado < 300 &&
            respuesta instanceof Respuesta &&
            respuesta.mensajeEstado.toUpperCase() === 'OK' &&
            req.headers.get('Paginacion') === 'true'
          ) {
            event = this.procesarPosiblePagina(event, respuesta);
          } else if (
            codigoEstado >= 400 &&
            req.headers.get('Errores-Manejo-Manual') !== 'true'
          ) {
            this.arrojarError(event, respuesta, codigoEstado);
          } else if (
            _.isNil(respuesta) &&
            req.headers.get('Comprobar-Blanco') !== 'false'
          ) {
            this.arrojarErrorServidorRespondioBlanco(event);
          }
        }
        return event;
      }),
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse) {
          this.__utilidadesService.configurarTipoMensaje(error);
          this.__utilidadesService.mostrarError(error);
        }
        throw error;
      })
    );
  }

  arrojarErrorServidorRespondioBlanco(event: HttpResponse<any>) {
    const respuesta = new Respuesta();
    respuesta.tipoMensaje = 'error';
    respuesta.esAlerta = true;

    const error = new ErrorControlado();
    error.codigo = 404;
    error.error = 'Not Found';
    error.mensaje = 'No se recibió respuesta alguna del servidor o en blanco';

    respuesta.mensajeEstado = error.mensaje;
    respuesta.resultado = error;

    throw new HttpErrorResponse(
      _.extend({}, event, {
        error: respuesta,
        status: error.codigo,
        statusText: error.error
      })
    );
  }

  obtenerCodigoEstado(event: HttpResponse<any>): number {
    const respuesta = this.obtenerRespuesta(event);
    // instanceof Devuelve trues si el objeto 
    //pertenece a la Class o una clase que hereda de ella
    if (respuesta instanceof Respuesta) {
      return _.toNumber(respuesta.codigoEstado);
    } else if (respuesta instanceof ErrorNoControlado) {
      return respuesta.status;
    } else {
      return event.status;
    }
  }

  obtenerRespuesta(event: HttpResponse<any>): Respuesta | ErrorNoControlado {
    let respuesta: Respuesta | ErrorNoControlado;

    if (_.has(event.body, 'codigoEstado')) {
      respuesta = _.extend(new Respuesta(), event.body as Respuesta);
    } else if (_.has(event.body, 'status')) {
      respuesta = _.extend(
        new ErrorNoControlado(),
        event.body as ErrorNoControlado
      );
    } else {
      respuesta = event.body;
    }
    return respuesta;
  }

  arrojarError(
    event: HttpResponse<any>,
    respuesta: Respuesta | ErrorNoControlado,
    codigoEstado: number
  ) {
    let error: HttpErrorResponse;
    const errorResponseProps: HttpErrorResponseInit = {
      status: codigoEstado,
      error: respuesta
    };

    if (respuesta instanceof Respuesta) {
      errorResponseProps.statusText = respuesta.mensajeEstado;
    } else if (respuesta instanceof ErrorNoControlado) {
      errorResponseProps.statusText = respuesta.error;
    }
    error = new HttpErrorResponse(_.extend({}, event, errorResponseProps));
    throw error;
  }

  procesarPosiblePagina(
    event: HttpResponse<any>, 
    respuesta: Respuesta
  ): HttpResponse<any> {
    let eventModificado: HttpResponse<any>;
    let resultado = respuesta.resultado;
    const propsPagina = _.keys(new Pagina());

    if (
      _.isObjectLike(resultado) &&
      propsPagina.some(propiedad => propiedad in _.toPlainObject(resultado))
    ) {
      resultado = _.extend(new Pagina(), _.toPlainObject(resultado) as Pagina);

      ConvertirRespuestasErroresInterceptor.pag$.next(resultado as Pagina);

      eventModificado = event.clone({ body: resultado });
      return eventModificado;
    } else if (_.isArray(resultado) && resultado.every(item => _.isObjectLike(item))) {
      const pagina = new Pagina();
      pagina.lista = resultado;
      pagina.total = pagina.lista.length;

      ConvertirRespuestasErroresInterceptor.pag$.next(pagina);

      eventModificado = event.clone({ body: pagina });
      return eventModificado;
    }
    return event;
  }
}
