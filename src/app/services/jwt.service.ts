import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

//#region models
import { Sesion } from '../models/sesion';
//#endregion models

//#region services
import { LoginService } from './login.service';
import { SesionService } from './sesion.service';
//#endregion services

//#region libraries
import * as _ from 'lodash';
import { tap } from 'rxjs/operators';
//#endregion libraries


@Injectable({
  providedIn: 'root'
})
export class JwtService {
  public urlBase = '';
  public httpOptions = new HttpHeaders()
    .append('Content-Type', 'application/json; charset=UTF-8');

  constructor(
    // tslint:disable: variable-name
    private http: HttpClient,
    private router: Router,
    public loginService: LoginService,
    private sesionService: SesionService
  ) {
    this.urlBase = environment.urlBaseServicio;
  }

  regenerarToken() {
    const url = `${this.urlBase}/api/auth/refreshToken`;
    const sesion = this.sesionService.obtenerSesion();
    const body = {
      refreshToken: sesion.refreshToken
    };

    return this.http.post(url, body, { headers: this.httpOptions }).pipe(
      tap((res: Sesion) => {
        /*
         * Limpiar valores vacíos o en blanco del objeto respuesta:
         */
        _.keys(res).forEach(clave => _.isNil(res[clave]) && delete res[clave]);

        res = _.extend(new Sesion(), res);
        _.extend(sesion, res);

        localStorage.setItem(
          'sesion',
          JSON.stringify(sesion)
        );
      })
    );
  }
}
