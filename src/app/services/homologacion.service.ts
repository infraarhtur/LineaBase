import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { homologacion } from '../models/homologacion';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
// tslint:disable-next-line: class-name
export class homologacionService {
  public urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = environment.urlBaseServicio; //'http://172.17.5.51:8081';
  }

  obtenerLista() {
    const url = `${this.urlBase}/homologacion/opciones`;
    return this.http.get(url);
  }

  obtenerHomologacionElegida(id: number) {
    const url = `${this.urlBase}/homologacion/lista?id=${id}`;
    return this.http.get(url);

  }
  eliminar(id: number) {
    const url = `${this.urlBase}/homologacion/eliminar?id=${id}`;
    return this.http.delete(url);


  }


  insertarHomologacion(homologacion: homologacion) {
    const httpOptions = new HttpHeaders().append(
      "Content-Type",
      "application/json; charset=UTF-8"
    );
    const url = `${this.urlBase}/homologacion/crear`;
    return this.http.post(url, homologacion, { headers: httpOptions });
  }

  obtenerOpcionPorId(id: number) {
    const url = `${this.urlBase}/homologacion/lista?id=${id}`;
    return this.http.get(url);
  }

  editarHomologacion(homologacion: homologacion) {
    const httpOptions = new HttpHeaders().append(
      "Content-Type",
      "application/json; charset=UTF-8"
    );

    let objConfiguracion = new Object({
      fuente: homologacion.fuente,
      original: homologacion.original,
      homologado: homologacion.homologado,
      descripcion: homologacion.descripcion,
    });


    const url = `${this.urlBase}/homologacion/actualizar?id=${homologacion.id}`;
    return this.http.put(url, objConfiguracion, { headers: httpOptions });
  }
}
