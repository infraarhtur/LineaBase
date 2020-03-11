import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { parametrosGenerales } from '../models/ParametrosGenerales';
import { parametrosProveedor } from '../models/parametros';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class parametrosService {
  public urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = environment.urlBaseServicio; //'http://172.17.5.51:8081';
  }

  AgregarDatosGenerales(parametrosGenerales: parametrosGenerales) {
    const httpOptions = new HttpHeaders().append(
      "Content-Type",
      "application/json; charset=UTF-8"
    );
    const url = `${this.urlBase}/parametros/agregarG`;
    return this.http.post(url, parametrosGenerales, { headers: httpOptions });
  }



  AgregarDatosproveedor(parametrosProv: parametrosProveedor) {
    const httpOptions = new HttpHeaders().append(
      "Content-Type",
      "application/json; charset=UTF-8"
    );
    const url = `${this.urlBase}/parametros/agregarP`;
    return this.http.post(url, parametrosProv, { headers: httpOptions });
  }

}
