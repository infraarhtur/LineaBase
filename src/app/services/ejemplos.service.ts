import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class EjemplosService {
  public urlBase = '';
  public jsonUsuarios = '../../assets/ejemplosJson/UsuariosPrueba.json';
  public obtenerListasFake = '../../assets/ejemplosJson/obtenerListas.json';
  constructor(
    private http: HttpClient,
  ) {
    this.urlBase = environment.urlBaseServicio;
  }

  obtenerUsuarios() {
    const url = `${this.urlBase}/api/Usuarios/ObtenerUsuarios`;
    return this.http.get(this.jsonUsuarios);
  }
  obtenerListas() {
    const url = `${this.urlBase}/api/Usuarios/ObtenerListas`;
    return this.http.get(this.obtenerListasFake);
  }

  crearUsuario(usuario: Usuario) {
    const httpOptions = new HttpHeaders().append('Content-Type', 'application/json; charset=UTF-8');
    const url = `${this.urlBase}/api/Usuarios/CrearUsuario`;
    usuario.fechaCreacion = new Date().toISOString();
    return this.http.post(url, usuario, { headers: httpOptions });
  }

  actualizarUsuario(usuario: Usuario) {
    const httpOptions = new HttpHeaders().append('Content-Type', 'application/json; charset=UTF-8');
    const url = `${this.urlBase}/api/Usuarios/ActualizarUsuario`;
    return this.http.post(url, usuario, { headers: httpOptions });
  }

 obtenerRoles() {    const url = `${this.urlBase}/api/role`;
                     return this.http.get(this.jsonUsuarios);
  }
}
