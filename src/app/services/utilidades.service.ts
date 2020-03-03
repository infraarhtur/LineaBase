import { Injectable, ChangeDetectorRef, isDevMode, OnInit } from '@angular/core';
import {
  NgForm,
  AbstractControl,
  FormControl,
  NgControl,
  FormArray,
  FormGroup
} from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

//#region Interfaces
import { PropiedadFecha } from '../interfaces/prop-fecha.interface';
//#endregion Interfaces

//#region Modelos
import { Lista } from '../models/lista';
import { ExpresionesRegulares } from '../models/expresiones-regulares';
import { Respuesta } from '../models/respuesta';
import { ErrorControlado } from '../models/error-controlado';
import { Menu } from '../models/menu';
//#endregion Modelos

//#region Servicios
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
//#endregion Servicios

//#region Bibliotecas
import * as _ from 'lodash';
import Swal from 'sweetalert2';

//#endregion Bibliotecas

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {
  public urlBase = '';
  public paises: Lista[] = [];
  public importadores: Lista[] = [];
  public basePrecio: Lista[] = [];
  

  constructor(
    private _HTTP: HttpClient,
    private decimalPipe: DecimalPipe,
    private toastr: ToastrService
  ) {
    this.urlBase = environment.urlBaseServicio;
  }



  obtenerJsonDeArchivo(path: string) {
    return this._HTTP.get(path);
  }

  /**
   * Comprueba que un formulario de clase `NgForm` o `NgForm` sea válido
   *
   * @param formulario Objeto que hace referencia al formulario a validar
   */
  esFormularioValido(formulario: NgForm | FormGroup): boolean {
    const formGroup = (formulario instanceof NgForm) ? formulario.form : formulario;

    Object.keys(formulario.controls).forEach(controlKey => {
      const control = formGroup.controls[controlKey] as AbstractControl;
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity({ onlySelf: true });
    });
    formGroup.updateValueAndValidity();
    const formularioValido: boolean = formGroup.valid;
    return formularioValido;
  }

  /**
   * Comprueba que el campo de un formulario sea válido
   *
   * @param campo Objeto que hace referencia al campo a validar
   */
  esCampoValido(campo: AbstractControl | NgControl): boolean {
    return (
      campo.valid && (campo.dirty || campo.touched || campo.value !== null)
    );
  }

  /**
   * Comprueba que el campo de un formulario sea inválido
   *
   * @param campo Objeto que hace referencia al campo a validar
   * @param errorClave Nombre clave o etiqueta que identifica el error generado por la función validadora
   */
  esCampoInvalido(campo: AbstractControl | NgControl, errorClave?: string): boolean {
    if (campo instanceof NgControl) {
      campo.control.updateValueAndValidity();
    } else {
      campo.updateValueAndValidity();
    }

    if (!_.isEmpty(errorClave)) {
      return (
        campo.invalid &&
        (campo.dirty || campo.touched || campo.value !== null) &&
        campo.errors[errorClave]
      );
    }
    return (
      campo.invalid && (campo.dirty || campo.touched || campo.value !== null)
    );
  }

  /**
   * Ejecuta una búsqueda en un arreglo de objetos presentado
   * como lista por un término ingresado por el usuario.
   *
   * @param lista Arreglo de objetos donde realizar la búsqueda
   * @param termino Término de búsqueda
   * @param [columnas] Nombres de las propiedades de cada objeto donde realizar la búsqueda.
   */
  buscarEnLista(
    lista: object[],
    termino: string,
    columnas?: string[]
  ): object[] {
    if (_.isEmpty(lista)) {
      return [];
    }
    const columnasTodas = Object.keys(lista[0]).filter(
      (propiedad: string) => !_.isFunction(lista[0][propiedad])
    );
    columnas = _.isEmpty(columnas) ? columnasTodas : columnas;

    return lista.filter((elementoLista: object) => {
      termino = _.toLower(termino);

      return columnas.some((columna: string) => {
        const valorColumna: string = _.isFinite(elementoLista[columna]) // ¿Es valor de columna numérico?
          ? elementoLista[columna].toString()
          : _.toLower(elementoLista[columna]);
        return valorColumna.includes(termino);
      });
    });
  }

  filtrarTabla(
    filtroTabla: FormControl,
    lista: object[],
    listaObservable$: Subject<object[]>,
    detectorCambios?: ChangeDetectorRef,
    columnas?: string[]
  ): Subscription {
    return filtroTabla.valueChanges
      .pipe(
        startWith(''),
        map(termino => this.buscarEnLista(lista, termino, columnas))
      )
      .subscribe((listaResultado: object[]) => {
        if (!_.isNil(listaObservable$) && !_.isEmpty(listaResultado)) {
          listaObservable$.next(listaResultado);

          if (!_.isNil(detectorCambios)) {
            detectorCambios.detectChanges();
          }
        }
      });
  }

  /**
   * Aplica una función para transformar la entrada del usuario y generar un nuevo valor
   *
   * @param event Evento de ingreso por teclado
   * @param transformer Función para transformadora
   */
  transformar(
    event: KeyboardEvent,
    transformer: (fieldValue: string) => string
  ) {
    const eventTarget = event.target as HTMLInputElement;

    eventTarget.value = transformer(eventTarget.value);
  }

  /**
   * Restringe o impide la entrada de teclado solamente a los valores que cumplan
   * con la expresión regular indicada.
   *
   * @param event Evento de ingreso por teclado
   * @param regex Expresión regular indicada para restringir entradas.
   * @param [transformer] Función adicional para transformar la entrada del usuario y generar un nuevo valor.
   */
  restringirTeclado(
    event: KeyboardEvent,
    regex: RegExp,
    transformer?: (fieldValue: string) => string
  ) {
    const eventTarget = event.target as HTMLInputElement;
    eventTarget.value = eventTarget.value.replace(regex, '');

    if (!_.isNil(transformer)) {
      eventTarget.value = transformer(eventTarget.value);
    }
  }

  /**
   * Inicia la descarga de un archivo de Microsoft Excel
   *
   * @param nombreArchivo Nombre del archivo sin la extensión
   * @param contenidoBase64 Contenido del archivo en formato base64 sin el prefijo `data:MIME_Type;base64,`
   * @param [extensionArchivo=xlsx] Extensión del archivo
   */
  descargarExcel(
    nombreArchivo: string,
    contenidoBase64: string,
    extensionArchivo = 'xlsx'
  ) {
    const mimeType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const enlaceFuente = `data:${mimeType};base64,${contenidoBase64}`;
    const descargaEnlace = document.createElement('a');
    const archivoNombre = `${nombreArchivo}.${extensionArchivo}`;

    descargaEnlace.href = enlaceFuente;
    descargaEnlace.download = archivoNombre;
    descargaEnlace.click();
  }

  /**
   * Convierte un objeto `Date` a `NgbDate`
   *
   * @param ngbFecha Objeto de la fecha de clase `Date`
   * @see https://ng-bootstrap.github.io/#/components/datepicker/api
   */
  convertirDateANgbDate(fecha: Date|string): NgbDate {
    if (typeof fecha === 'string') {
      fecha = new Date(fecha);
    }
    const anio = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const ngbFecha = new NgbDate(anio, mes, dia);
    return ngbFecha;
  }

  /**
   * Convierte una fecha de ng-boostrap `NgbDate` a `Date`
   *
   * @param ngbFecha Objeto de la fecha de clase `NgbDate`
   * @see https://ng-bootstrap.github.io/#/components/datepicker/api
   */
  convertirNgbADate(ngbFecha: NgbDate): Date {
    const fecha = new Date(ngbFecha.year, ngbFecha.month - 1, ngbFecha.day);
    return fecha;
  }



  /**
   * Ajusta la altura de una tabla con barra de desplazamiento
   *
   * @param selectorContenedor Selector CSS del elemento div que contiene la tabla
   * @param porcentajeAltura Porcentaje de altura para la tabla respecto a la de la ventana
   */
  ajustarAlturaTabla(selectorContenedor: string, porcentajeAltura: number) {
    const contenidoPagina = document.querySelector('div.content') as HTMLElement;
    const alturaTabla = contenidoPagina.scrollHeight * porcentajeAltura / 100;
    const contenedorTabla = document.querySelector(selectorContenedor) as HTMLElement;
    contenedorTabla.style.height = `${alturaTabla}px`;
  }

  /**
   * Actualiza las propiedades de un componente con los valores de controles de un
   * `FormGroup` con claves del mismo nombre
   */
  actualizarPropiedadesConFormGroup(
    componente: OnInit,
    formulario: FormGroup,
    lista: object[],
    camposAdicionales: string[] = []
  ) {
    formulario.valueChanges.subscribe(() => {
      // tslint:disable-next-line: forin
      for (const controlNombre in formulario.controls) {
        const control = formulario.get(controlNombre);

        if (control instanceof FormArray) {
          this.__iterarElementosFormArray(control as FormArray, lista);
        } else if (control instanceof FormControl) {
          if (camposAdicionales.includes(controlNombre)) {
            componente[controlNombre] = control.value;
          }
        }
      }
    });
  }

  private __iterarElementosFormArray(formArray: FormArray, lista: object[]) {
    for (let i = 0; i < formArray.controls.length; i++) {
      const fila = formArray.controls[i] as FormGroup;
      const campos = fila.controls;

      // tslint:disable-next-line: forin
      for (const nombreCampo in campos) {
        const controlCampo = fila.get(nombreCampo);

        if (lista.length > 0) {
          if (controlCampo.value instanceof NgbDate) {
            lista[i][nombreCampo] = this.convertirNgbADate(controlCampo.value);
          } else {
            lista[i][nombreCampo] = controlCampo.value;
          }
        }
      }
   }
  }


  obtenerMenuDatos(menuLista?: Menu[]): Menu[] {
    // if (_.isNil(menuLista)) {
      // menuLista = environment.menuSampleData;
    // }
    menuLista = menuLista.map((menu: Menu) => {
      menu = _.extend(new Menu(), menu);

      if (menu.tieneHijos) {
        menu.menuHijos = this.obtenerMenuDatos(menu.menuHijos);
      }
      return menu;
    });
    return menuLista;
  }


/**
   * Muestra los mensajes de error en notificaciones o ventanas
   *
   * @param error Objeto que contiene el mensaje de error.
   */
  mostrarError(error: HttpErrorResponse) {
    const tipoMensajes = {
      error: 'Error',
      info: 'Información',
      warning: 'Advertencia'
    };
    const tipoMensaje =
      !_.isNil(error.error) && error.error instanceof Respuesta
        ? error.error.tipoMensaje
        : 'error';
    const esAlerta =
      !_.isNil(error.error) && error.error instanceof Respuesta
        ? error.error.esAlerta
        : true;
    let mensajeError = '¡Ocurrió un error inesperado al tratar de ejecutar la operación!';
    if (
      !_.isNil(error.error) &&
      error.error instanceof Respuesta &&
      error.error.resultado instanceof ErrorControlado
    ) {
      if (!_.isEmpty(error.error.mensajeEstado)) {
        mensajeError = error.error.mensajeEstado;
      } else if (!_.isEmpty(error.error.resultado)) {
        mensajeError = error.error.resultado.mensaje;
      }
    }
    if (esAlerta) {
      Swal.fire({
        type: tipoMensaje,
        title: tipoMensajes[tipoMensaje],
        text: mensajeError,
        footer: ''
      });
    } else {
      this.toastr[tipoMensaje](mensajeError, tipoMensajes[tipoMensaje]);
    }
  }
  /**
   * Determina el tipo de mensaje para un objeto de error de solicitud
   * HTTP de Angular.
   *
   * @param error Objeto que contiene el mensaje de error.
   */
  configurarTipoMensaje(error: HttpErrorResponse) {
    const errorControladoProps = _.keys(new ErrorControlado());
    const esResultadoErrorControlado =
      _.isObjectLike(error.error.resultado) &&
      errorControladoProps.some(
        prop => prop in _.toPlainObject(error.error.resultado)
      );
    if (error.error instanceof Respuesta) {
      if (_.isString(error.error.resultado)) {
        error.error.tipoMensaje = 'error';
        error.error.esAlerta = true;
      } else if (esResultadoErrorControlado) {
        error.error.resultado = _.extend(
          new ErrorControlado(),
          error.error.resultado as ErrorControlado
        );
        error.error.tipoMensaje = _.isNil(error.error.tipoMensaje)
          ? 'info'
          : error.error.tipoMensaje;
        error.error.esAlerta = _.isNil(error.error.esAlerta)
          ? false
          : error.error.esAlerta;
      }
    }
  }
}


