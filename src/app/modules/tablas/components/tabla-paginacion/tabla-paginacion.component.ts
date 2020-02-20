import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';

//#region Servicios
import { PaginacionService } from 'src/app/services/paginacion.service';
//#endregion Servicios

import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tabla-paginacion',
  templateUrl: './tabla-paginacion.component.html',
  styleUrls: ['./tabla-paginacion.component.css'],
  providers: [PaginacionService]
})
export class TablaPaginacionComponent implements OnInit, OnChanges {
  @Input() public lista: any[];

  //#region Vinculación de dos sentidos (Two-way binding) con sintaxis banana-in-a-box [()]
  @Input() public $listaObservable: Subject<any[]>;
  @Output() public $listaObservableChange = new EventEmitter();
  //#endregion

  constructor(
    public paginacionService: PaginacionService
  ) { }

  ngOnInit() {
    this.paginacionService.reiniciarParametros();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.detectarCambiosLista(changes);
  }

  detectarCambiosLista(changes: SimpleChanges) {
    const ocurrieronCambios =
      'lista' in changes &&
      !_.isNil(changes.lista) &&
      changes.lista.previousValue !== changes.lista.currentValue;

    if (ocurrieronCambios) {
      setTimeout(() => {
        this.paginacionService.params.cantidadColeccion = this.lista.length;
        this.mostrarFilasPagina();
      });
    }
  }

  cargarPagina(pagina: number) {
    this.paginacionService.cargarPagina(
      pagina,
      this.$listaObservable,
      this.lista
    );
    this.$listaObservableChange.emit(this.$listaObservable);
  }

  mostrarFilasPagina() {
    this.paginacionService.mostrarFilasPagina(
      this.$listaObservable,
      this.lista
    );
    this.$listaObservableChange.emit(this.$listaObservable);
  }

}
