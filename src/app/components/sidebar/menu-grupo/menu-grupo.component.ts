import { Component, OnInit, Input, ViewChild, QueryList, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

//#region animations
import { abrirCerrarGrupoMenu } from 'src/app/animation/menu';
//#endregion animations

//#region components
import { MenuComponent } from '../menu/menu.component';
//#endregion components

//#region interfaces
import { AnimacionAbrirCerrarEstado } from '../../../interfaces/animacion-abrir-cerrar-estado.interface';
//#endregion interfaces

//#region models
import { Menu } from 'src/app/models/menu';
//#endregion models

//#region libraries
import * as _ from 'lodash';
//#endregion libraries


@Component({
  selector: 'app-menu-grupo',
  templateUrl: './menu-grupo.component.html',
  styleUrls: ['./menu-grupo.component.css'],
  animations: [abrirCerrarGrupoMenu]
})
export class MenuGrupoComponent extends MenuComponent
  implements OnInit, AfterViewInit {

  public readonly claseCssLinkActivo = 'active';

  @Input() public menuData: Menu[];
  @Input() public estadoActual: AnimacionAbrirCerrarEstado = {};

  @ViewChildren('rla', { read: ElementRef }) rlas: QueryList<ElementRef>;

  constructor() {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.comprobarEstadoGrupoMenuLinkActivo();
    });
  }

  comprobarEstadoGrupoMenuLinkActivo() {
    const linkActivo = this.rlas.find((rla: ElementRef) => {
      const rlaEl = rla.nativeElement as HTMLElement;
      return rlaEl.classList.contains(this.claseCssLinkActivo);
    });

    if (!_.isNil(linkActivo)) {
      const linkActivoEl = linkActivo.nativeElement as HTMLElement;
      const grupoMenuAlias = linkActivoEl
        .closest('ul.lista-links')
        .getAttribute('id');
      this.estadoActual[grupoMenuAlias] = 'abierto';
    }
  }
}
