import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

//#region operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
//#endregion operators

//#region modelos
import { Login } from '../models/login';
//#endregion modelos

//#region bibliotecas
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
//#endregion bibliotecas


@Injectable({
  providedIn: 'root'
})
export class LoginJwtService {
  private esUsuarioLogueado$ = new BehaviorSubject<boolean>(false);
  public urlBase = '';
  public user: Login;
  public infoUserTemporal = '../../assets/sesionFake.json';
  public httpOptions = new HttpHeaders()
    .append('Content-Type', 'application/json; charset=UTF-8');

  constructor(
    // tslint:disable: variable-name
    private http: HttpClient,
    private router: Router
  ) {
    this.urlBase = environment.urlBaseServicio;
    this.establecerLogueado(this.esLogeado());
  }

  logIn(credencialesUsuario: Login, catchErrors = true): Observable<any> {
    // const url = `${this.urlBase}/api/auth/signin`;

    // const headers = this.httpOptions
    //   .append('Errores-Manejo-Manual', 'true');
    // const httpOptions = new HttpHeaders().append('Content-Type', 'application/json; charset=UTF-8');

    // var login = {
    //   // password: "123",
    //   // userName: "Admin"
    //   password: credencialesUsuario.contrasena,
    //   userName: credencialesUsuario.usuario
    // }
    // debugger;
    // const respuestaObservable = this.http
    //   .post(url, login, { headers: httpOptions });

    // if (catchErrors) {
    //   debugger;
    //   return respuestaObservable.catch(this.errorHandler);
    // }

    // return respuestaObservable;

      return this.http .get(this.infoUserTemporal);


  }

  private finalizarSesion = () => {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  logOut() {
    const url = `${this.urlBase}/api/auth/logout`;
    const headers = this.httpOptions.append('Comprobar-Blanco', 'false');

    this.http.post(url, undefined, { headers }).pipe(
      finalize(this.finalizarSesion)
    ).subscribe();
  }

  isIdentity() {



    var resultado =
      (
        !environment.comprobarSiLogeado ||
        !_.isEmpty(localStorage.getItem('sesion')) ||
        JSON.parse(localStorage.getItem('IsIdentity')) === true
      );

    return resultado;

  }

  esLogeado(): boolean {
    return this.isIdentity();
  }

  errorHandler(error: HttpErrorResponse) {
    const errMsg = error.message || error.statusText || 'Server Error';
    return Observable.throwError(errMsg);
  }

  establecerLogueado(esUsuarioLogueado$: boolean) {
    this.esUsuarioLogueado$.next(esUsuarioLogueado$);
  }

  obtenerLogueado(): Observable<boolean> {
    return this.esUsuarioLogueado$.asObservable();
  }
}
