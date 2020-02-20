import { Injectable, isDevMode, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

//#region Interfaces
import { PaginacionParams } from '../interfaces/paginacion-params.interface';
//#endregion Interfaces

//#region Servicios
import { UtilidadesService } from './utilidades.service';
//#endregion Servicios

import { Subject, Subscription } from 'rxjs';
import { startWith, map, delay } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable()
export class PaginacionService {
  // tslint:disable: variable-name
  private readonly __parametrosDefecto: PaginacionParams = {
    cantidadColeccion: 0,
    pagina: 1,
    paginaTamanyo: 10
  };
  private __parametros: PaginacionParams;

  public get params() {
    return this.__parametros;
  }

  public set params(parametros: PaginacionParams) {
    this.__parametros = parametros;
  }

  constructor(
    public utilsService: UtilidadesService,
    public detectorCambios: ChangeDetectorRef
  ) {
    this.__parametros = _.clone(this.__parametrosDefecto);
  }

  cargarPagina(pagina: number, listaObservable$: Subject<any[]>, lista: any[]) {
    const paginaCambio = pagina !== this.params.paginaPrevia;

    if (paginaCambio) {
      this.__parametros.paginaPrevia = pagina;
      this.mostrarFilasPagina(listaObservable$, lista);
    }
  }

  mostrarFilasPagina(listaObservable$: Subject<any[]>, lista: any[]) {
    let listaSiguientePagina: any[];

    if (_.isNil(lista)) {
      return;
    }

    if (lista.length < this.params.paginaTamanyo) {
      listaSiguientePagina = _.clone(lista);
    } else {
      listaSiguientePagina = lista.slice(
        (this.params.pagina - 1) * this.params.paginaTamanyo,
        (this.params.pagina - 1) * this.params.paginaTamanyo +
          this.params.paginaTamanyo
      );
    }

    if (!_.isNil(listaObservable$) && !_.isNil(listaSiguientePagina)) {
      listaObservable$.next(listaSiguientePagina);
      this.detectorCambios.detectChanges();
    }
  }

  filtrarTabla(
    filtroTabla: FormControl,
    lista: object[],
    listaObservable$: Subject<object[]>,
    columnas?: string[],
    callback?: () => void
  ): Subscription {
    return filtroTabla.valueChanges
      .pipe(
        startWith(''),
        delay(0),
        map((termino: string) => {
          return this.utilsService.buscarEnLista(lista, termino, columnas);
        })
      )
      .subscribe((listaResultado: object[]) => {
        this.mostrarFilasPagina(listaObservable$, listaResultado);

        if (!_.isNil(callback)) {
          callback();
        }
      });
  }

  reiniciarParametros() {
    this.__parametros = _.clone(this.__parametrosDefecto);
  }
}
