import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild,
    UrlTree,
    Data
} from '@angular/router';
import { environment } from '../../environments/environment';

//#region modelos
import { Vista } from '../models/vista';
import { Role } from '../models/role';
import { Usuario } from '../models/usuario';
//#endregion modelos

//#region bibliotecas
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
//#endregion bibliotecas


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  comprobarSiAutorizado(routeData: Data): boolean {
    if (!environment.esAutorizacionesActivadas) {
      return true;
    }
    const datosBasicos: Usuario = JSON.parse(
      localStorage.getItem('datosBasicos')
    );
    let vistaActual: Vista = JSON.parse(localStorage.getItem('vistaActual'));

    const isAutorizado: boolean = datosBasicos.roles.some((rol: Role) => {
      // Iterar los roles del usuario en la sesión actual
      return rol.vistas.some((vista: Vista) => {
        // Iterar las vistas de cada rol para obtener las rutas permitidas
        const vistasVacias = [null, undefined, {}, new Vista()];
        const vistaInRouteData: boolean =
          'vista' in routeData && ((Array.isArray(routeData.vista) && routeData.vista.every(item => {
            return item instanceof Vista;
          })) || routeData.vista instanceof Vista);
        vistaActual = !vistasVacias.includes(vistaActual)
          ? vistaActual
          : vistaInRouteData
          ? routeData.vista
          : new Vista();
        return (Array.isArray(vistaActual) && vistaActual.some(item => {
          return item.nombre === vista.nombre;
        })) || vistaActual.nombre === vista.nombre;
      });
    });
    return isAutorizado;
  }

  mostrarMensajeNoAutorizado() {
    Swal.fire({
      type: 'error',
      title: 'No autorizado',
      text: 'Usted no se encuentra autorizado para ingresar a este enlace',
      footer: ''
    });
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isAutorizado = this.comprobarSiAutorizado(childRoute.data);

    if (!isAutorizado) {
      this.mostrarMensajeNoAutorizado();
    }
    return isAutorizado;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const isAutorizado = this.comprobarSiAutorizado(route.firstChild.data);

    if (!isAutorizado) {
      this.mostrarMensajeNoAutorizado();
    }
    return isAutorizado;
  }
}
