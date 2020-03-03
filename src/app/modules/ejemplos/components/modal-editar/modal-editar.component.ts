import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';

//#region modelos
import { Usuario } from 'src/app/models/usuario';
import { Lista } from 'src/app/models/lista';
import { Role } from 'src/app/models/role';
import { ExpresionesRegulares } from '../../../../models/expresiones-regulares';
//#endregion modelos
import { FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from "@angular/forms";
//#region servicios
import { EjemplosService } from 'src/app/services/ejemplos.service';
import { UtilidadesService } from '../../../../services/utilidades.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { stringify } from 'querystring';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
//#region bibliotecas


@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit, OnChanges {
  @Input() public usuario: Usuario;
  @Input() public listas: Lista[][];

  @Input() public esUsuarioCreadoOModificado: boolean;
  @Output() public esUsuarioCreadoOModificadoChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('ngEditarUsuario', { static: false }) public ngEditarUsuario: NgForm;
  public tipoDocIds: Lista[];
  public roles: Lista[];
  public usuarioSesion: Usuario;
  public esUsuarioRolesValido: boolean;
  public ExpresionesRegulares: typeof ExpresionesRegulares;
  public _: _.LoDashStatic;
  public frmEditarBase: FormGroup;
  public ngbFechaInicio: NgbDate;
  public ngbFechaFin: NgbDate;
  public model;
  submitted = false;

  constructor(
    private ejemplosService: EjemplosService,
    private SpinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService,
    public utilsService: UtilidadesService,
    public formBuilder: FormBuilder,
  ) {
    this.ExpresionesRegulares = ExpresionesRegulares;
    this._ = _;
  }

  ngOnInit() {
    this.inicializarValores();
    this.inicializarEventos();
    this.validacionesFormulario();
  }

  inicializarEventos() {
    $('#editarUsuarioModal').on('hidden.bs.modal', () => {  // Cuando se cierre el modal de edición:
      this.ngEditarUsuario.form.reset();  // Limpiar formulario
      this.usuario = new Usuario();
      this.esUsuarioRolesValido = null;
    });
  }

  inicializarValores() {
    if (!this.usuario) {
      this.usuario = new Usuario();
    }

    this.usuarioSesion = JSON.parse(localStorage.getItem('datosBasicos')) as Usuario;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.detectarCambiosListas();
    this.detectarCambiosUsuario();
  }

  detectarCambiosUsuario() {
    /*
     * Solo abrir el modal si se va a crear o a actualizar un usuario
     */
    if (this.usuario && this.usuario.id) {
      this.comprobarValidezUsuarioRoles();
      $('#editarUsuarioModal').modal('show');
    }
  }

  detectarCambiosListas() {
    if (this.listas && this.listas.length > 0) {

      this.tipoDocIds = this.listas[0];

      this.roles = this.listas[1];
      // console.log(this.roles);
    }
  }

  onDateSelection(){
    alert('sdsdsd')
  }

  marcarUsuarioCreadoOModificado = (): void => {
    this.esUsuarioCreadoOModificado = true;
    this.esUsuarioCreadoOModificadoChange.emit(this.esUsuarioCreadoOModificado);
  }

  comprobarValidezUsuarioRoles() {
    this.esUsuarioRolesValido = this.usuario.roles.length > 0;
  }

  /**
   * Mapea cada uno de roles del usuario seleccionado de string a modelo Role
   * si todos los elementos del arreglo son de tipo string.
   */
  mapearUsuarioRoles() {
    if (this.usuario.roles.every((role: any) => typeof role === 'string')) {
      this.usuario.roles = this.usuario.roles.map((roleId: string) => {
        const rol = new Role();
        rol.id = roleId;
        return rol;
      });
    }
  }

  editarUsuario() {
    this.comprobarValidezUsuarioRoles();

    if (
      !(
        this.utilsService.esFormularioValido(this.ngEditarUsuario) &&
        this.esUsuarioRolesValido
      )
    ) {
      return;
    }
    this.mapearUsuarioRoles();
    this.SpinnerService.show();
    // tslint:disable-next-line: max-line-length
    this.usuario.nombreUsuarioCreacion = 'administrador';// this.usuarioSesion.nombreUsuario ? this.usuarioSesion.nombreUsuario : 'administrador';

    if (this.usuario.id === 'new') {
      this.crearUsuario();
    } else {
      this.actualizarUsuario();
    }
  }


  actualizarUsuario() {
    $('#editarUsuarioModal').modal('hide');
    // Cerrar formulario
    this.toastr.success(
      `¡Usuario ${this.usuario.nombreUsuario} actualizado con éxito!`
    );

    // this.usuariosService
    //   .actualizarUsuario(this.usuario)
    //   .pipe(
    //     finalize(this.edicionCompletada)  // Solicitud completada con éxito o fallo
    //   )
    //   .subscribe(
    //     () => {
    //       $('#editarUsuarioModal').modal('hide');  // Cerrar formulario
    //       this.toastr.success(
    //         `¡Usuario ${this.usuario.nombreUsuario} actualizado con éxito!`
    //       );
    //     },
    //     (error: HttpErrorResponse) => {
    //       this.utilsService.mostrarError(error, false);
    //     }
    //   );
  }

  crearUsuario() {



    $('#editarUsuarioModal').modal('hide');  // Cerrar formulario
    this.toastr.success(
      `¡Usuario ${this.usuario.nombreUsuario} creado con éxito!`
    );

    // this.usuariosService
    //   .crearUsuario(this.usuario)
    //   .pipe(
    //     finalize(this.edicionCompletada)  // Solicitud completada con éxito o fallo
    //   )
    //   .subscribe(
    //     () => {
    //       $('#editarUsuarioModal').modal('hide');  // Cerrar formulario
    //       this.toastr.success(
    //         `¡Usuario ${this.usuario.nombreUsuario} creado con éxito!`
    //       );
    //     },
    //     (error: HttpErrorResponse) => {
    //       this.utilsService.mostrarError(error, false);
    //     }
    //   );
  }

  edicionCompletada = (): void => {
    this.marcarUsuarioCreadoOModificado();
    this.SpinnerService.hide();
  }

  /**
   * Función para usar con la directiva compareWith y transformar opciones de la
   * lista de selección en valores válidos para la propiedad usuario.roles
   *
   * @param rolOpcion Una opción de la lista de selección
   * @param rolSeleccion La selección del usuario
   */
  compararRolesFn(rolOpcion: string, rolSeleccion: Role) {
    return rolOpcion && rolSeleccion && rolOpcion === rolSeleccion.id;
  }

  esRolSeleccionado(rolId: string): boolean {
    const esSeleccionado = this.usuario.roles.some((role: Role) => {
      return role.id.toLowerCase() === rolId.toLowerCase();
    });
    return esSeleccionado;
  }

  agregarOQuitarRol(event: Event, rolId: string) {
    const eventTarget = event.target as HTMLInputElement;

    if (eventTarget.checked) {  // Casilla o checkbox marcada
      const role = new Role(rolId);
      this.usuario.roles.push(role);  // Agregar rol al usuario
    } else {  // Casilla o checkbox sin marcar
      this.usuario.roles = this.usuario.roles.filter((role: Role) => {
        return role.id.toLowerCase() !== rolId.toLowerCase();
      });  // Quitar rol(es) del usuario
    }
    this.comprobarValidezUsuarioRoles();
  }

  validacionesFormulario() {

    this.frmEditarBase = this.formBuilder.group({
      txtTipoDoc: this.formBuilder.control('', [Validators.required]),
      txtIdentificacion: this.formBuilder.control('', [Validators.required]),
      txtNombre: this.formBuilder.control('', [Validators.required, Validators.minLength(12)]),
      txtApellido: this.formBuilder.control('', [Validators.required]),
      txtUsuario: this.formBuilder.control('', [Validators.required]),
      txtCorreo: this.formBuilder.control('', [Validators.required, Validators.email]),
      txtRoles: this.formBuilder.control(false, Validators.requiredTrue),
      txtFecha: this.formBuilder.control(false, Validators.required),
    });
  }


}
