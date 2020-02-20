import { RouterLinkActive, Router } from '@angular/router';

//#region interfaces
import { AnimacionAbrirCerrarEstado } from 'src/app/interfaces/animacion-abrir-cerrar-estado.interface';
//#endregion interfaces

//#region models
import { Menu } from 'src/app/models/menu';
//#endregion models

//#region libraries
import * as _ from 'lodash';
//#endregion libraries


export abstract class MenuComponent {
  public abstract menuData: Menu[];
  public abstract estadoActual: AnimacionAbrirCerrarEstado;

  public _: _.LoDashStatic;

  constructor() {
    this._ = _;
  }

  alternarSubMenu(evt: Event) {
    let eventTarget = evt.target as HTMLElement;

    eventTarget
      .closest('ul.menu')
      .querySelectorAll('li')
      .forEach((menuOption: any) => {
        menuOption.classList.remove('active');
      });
    if (eventTarget.tagName === 'I') {
      // Es posible que el evento click sea generado por el icono de la opción
      eventTarget = eventTarget.parentElement;
    }
    eventTarget.parentElement.classList.add('active');

    if (
      eventTarget.parentElement.classList.contains('menu-padre') &&
      eventTarget.classList.contains('opcion-padre')
    ) {
      evt.preventDefault();
      evt.stopPropagation();

      const submenu = eventTarget.parentElement.querySelector(
        'ul.list-unstyled'
      );
      const submenuName = submenu.id;
      const chevronIconElement = eventTarget.querySelector('.icono.right');
      chevronIconElement.classList.toggle('fa-chevron-circle-down');
      chevronIconElement.classList.toggle('fa-chevron-circle-right');

      // Cambiar estados de submenús 'abierto' <=> 'cerrado' cuando se hace clic en un menú padre
      this.estadoActual[submenuName] =
        this.estadoActual[submenuName] === 'cerrado' ? 'abierto' : 'cerrado';
    }
  }

  obtenerEstadoActual(submenuName: string) {
    return this.estadoActual[submenuName];
  }
}
