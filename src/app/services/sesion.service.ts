import { Injectable } from '@angular/core';

//#region modelos
import { Menu } from '../models/menu';
import { Role } from '../models/role';
import { Sesion } from '../models/sesion';
import { Usuario } from '../models/usuario';
//#endregion modelos

//#region bibliotecas
import * as _ from 'lodash';
//#endregion bibliotecas


@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }

  obtenerSesion(): Sesion {
    const sesion = _.extend(
      new Sesion(),
      JSON.parse(localStorage.getItem('sesion')) as Sesion
    );
    sesion.user = _.extend(new Usuario(), sesion.user);

    sesion.listMenu = sesion.listMenu.map(menu => {
      menu = _.extendWith(new Menu(), menu, (valorDestino, valorOrigen) => {
        return _.isNil(valorOrigen) ? valorDestino : valorOrigen;
      });

      if (menu.tieneHijos) {
        menu.menuHijos = menu.menuHijos.map(menuHijo => {
          return _.extend(new Menu(), menuHijo);
        });
      }
      return menu;
    });

    sesion.listRole = sesion.listRole.map(role => {
      return _.extend(new Role(), role);
    });

    return sesion;
  }

  obtenerListMenu(): Menu[] {
    const sesion = this.obtenerSesion();
    return sesion.listMenu;
  }
}
