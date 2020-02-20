import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//#region Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
//#endregion Operators

//#region modelos
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private esUsuarioLogueado$ = new BehaviorSubject<boolean>(false);
  public urlBase = '';
  public user: Login;
  public infoUserTemporal = '../../assets/sesion.json'

  constructor(private _HTTP: HttpClient) {
    this.urlBase = environment.urlBaseServicio;


  }

  logIn(usuario: Login, catchErrors = true): Observable<any> {
    // const httpOptions = new HttpHeaders().append('Content-Type', 'application/json; charset=UTF-8');
    // const url = this.urlBase + `/api/Autenticacion/verificarConexion`;
    // const respuestaObservable = this._HTTP.post(url , usuario, { headers: httpOptions });

    // if (catchErrors) {
    //   return respuestaObservable.catch(this.errorHandler);
    // }
    // return respuestaObservable;

    const respuestaObservable =this._HTTP.get(this.infoUserTemporal);
    return respuestaObservable;

  }

  isIdentity() {
    if (localStorage.getItem('datosBasicos') !== undefined && localStorage.getItem('datosBasicos') !== null ) {
      return true;
    } else {
      return false;
    }

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
