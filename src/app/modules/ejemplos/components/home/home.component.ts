import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

//#region animaciones
import { fundido } from 'src/app/animation/animation';
//#endregion animaciones

//#region modelos
import { Lista } from 'src/app/models/lista';
import { Usuario } from 'src/app/models/usuario';
//#endregion modelos

//#region servicios
import { PaginacionService } from '../../../../services/paginacion.service';
import { EjemplosService } from '../../../../services/ejemplos.service';
import { UtilidadesService } from '../../../../services/utilidades.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
//#endregion servicios

//#region bibliotecas
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { debug } from 'util';
//#endregion bibliotecas

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fundido],
  providers: [PaginacionService]
})
export class HomeComponent implements OnInit {
  public usuarioFiltro$: Subject<Usuario[]> = new Subject<Usuario[]>();

  public usuario: Usuario;
  public usuarios: Usuario[] = [];
  public listas: Lista[][];
  public tipoDocIds: Lista[] = [];
  public roles: Lista[] = [];
  public esUsuarioCreadoOModificado = false;
  public listaUsuarios: Usuario[];
  pagina = 1;
  paginaTamano = 5;
  cantidadColeccion: number;
  paginaPrevia: any;

  public filtroTabla = new FormControl('');
  constructor(
    public utilidadesService: UtilidadesService,
    public paginacionService: PaginacionService,
    private ejemploService: EjemplosService,
    private SpinnerService: Ng4LoadingSpinnerService
  ) {
    this.obtenerRoles();
  }

  ngOnInit() {

    this.cargarListas();
    this.inicializarEventos();
  }

  inicializarEventos() {
    $('#editarUsuarioModal').on('hidden.bs.modal', (evt) => {
      if (this.esUsuarioCreadoOModificado) {
        this.esUsuarioCreadoOModificado = false;
        this.cargarListas();
      }
    });
  }

  cargarListas() {
    this.SpinnerService.show();
    this.ejemploService
      .obtenerListas()
      .pipe(
        finalize(() => this.SpinnerService.hide())  // Solicitud completada con éxito o fallo
      )
      .subscribe(
        (res: { Item1: Lista[]; Item2: Lista[] }) => {
          this.tipoDocIds = res.Item1.filter((item: Lista) => item); // Array limpio de elementos vacíos;
          this.roles = res.Item2.filter((item: Lista) => item); // Array limpio de elementos vacíos;
          this.listas = [this.tipoDocIds, this.roles];
          this.cargarUsuarios();
        }
      );
  }

  cargarUsuarios() {
    this.SpinnerService.show();
    this.ejemploService
      .obtenerUsuarios()
      .pipe(
        finalize(() => this.SpinnerService.hide()) // Solicitud completada con éxito o fallo
      )
      .subscribe(
        (usuarios: Usuario[]) => {
          this.usuarios = usuarios;
          // this.paginacionService.params.cantidadColeccion = this.usuarios.length;
          this.aplicarFiltroTabla();
          this.mostrarFilasPagina();
        }
      );
  }

  abrirModalEditar(usuario: Usuario = new Usuario()) {
    if (!usuario.id) {
      usuario.id = 'new';
    }
    this.usuario = _.cloneDeep(usuario);
  }

  aplicarFiltroTabla() {
    this.utilidadesService.filtrarTabla(
      this.filtroTabla,
      this.usuarios,
      this.usuarioFiltro$
    );
  }

  cargarPagina(pagina: number) {
    this.paginacionService.cargarPagina(
      pagina,
      this.usuarioFiltro$,
      this.usuarios
    );
  }

  mostrarFilasPagina() {
    this.paginacionService.mostrarFilasPagina(
      this.usuarioFiltro$,
      this.usuarios
    );
  }


  obtenerRoles(){
    this.ejemploService.obtenerRoles().subscribe((res: any) => {
    
      // console.log('roles',res.resultado.lista);

    }

    );
  }
}
