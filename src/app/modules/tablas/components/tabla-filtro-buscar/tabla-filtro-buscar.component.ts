import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

//#region Servicios
import { PaginacionService } from '../../../../services/paginacion.service';
//#endregion Servicios

import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tabla-filtro-buscar',
  templateUrl: './tabla-filtro-buscar.component.html',
  styleUrls: ['./tabla-filtro-buscar.component.css']
})
export class TablaFiltroBuscarComponent implements OnInit, OnChanges {
  @Input() public paginacionService: PaginacionService;

  /**
   * Columnas en las cuales buscar con el filtro de la tabla
   * Nombres de propiedades del modelo usado para los datos.
   */
  @Input() public columnasBusqueda: string[];

  @Input() public lista: any[];

  //#region Two-way bindings con sintaxis banana-in-a-box [()]
  @Input() public $listaObservable: Subject<any[]>;
  @Output() public $listaObservableChange = new EventEmitter();
  //#endregion Two-way bindings con sintaxis banana-in-a-box [()]

  public filtroTabla = new FormControl('');

  constructor(
    public detectorCambios: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.detectarCambiosLista(changes);
  }

  detectarCambiosLista(changes: SimpleChanges) {
    const ocurrieronCambios =
      'lista' in changes &&
      !_.isNil(changes.lista) &&
      changes.lista.previousValue !== changes.lista.currentValue;

    if (ocurrieronCambios && this.lista.length > 0) {
      this.paginacionService.params.cantidadColeccion = this.lista.length;
      this.aplicarFiltroTabla();
    }
  }

  aplicarFiltroTabla() {
    this.paginacionService.filtrarTabla(
      this.filtroTabla,
      this.lista,
      this.$listaObservable,
      this.columnasBusqueda,
      () => {
        this.$listaObservableChange.emit(this.$listaObservable);
      }
    );
  }

}
