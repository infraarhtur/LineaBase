import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterContentChecked
} from '@angular/core';

//#region Animaciones
import { abrirCerrarGrupoMenu } from 'src/app/animation/menu';
//#endregion Animaciones

//#region Componentes
import { MenuComponent } from './menu/menu.component';
//#endregion Componentes

//#region Modelos
import { Menu } from 'src/app/models/menu';
import { Usuario } from 'src/app/models/usuario';
//#endregion Modelos

//#region Servicios
import { SesionService } from '../../services/sesion.service';
import { UtilidadesService } from '../../services/utilidades.service';
//#endregion Servicios

//#region Interfaces
import { AnimacionAbrirCerrarEstado } from '../../interfaces/animacion-abrir-cerrar-estado.interface';
//#endregion Interfaces

//#region Bibliotecas

//#endregion Bibliotecas

// import { menuActualizado } from 'src/environments/environment';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.new.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [abrirCerrarGrupoMenu]
})
export class SidebarComponent extends MenuComponent
  implements OnInit, AfterContentChecked {
  @ViewChild('menuPrincipal', { static: true })
  public menuPrincipal: ElementRef;
  public menuData: Menu[];
  public usuarioSesion: Usuario;
  public estadoActual: AnimacionAbrirCerrarEstado = {};

  constructor(
    public utilidadesService: UtilidadesService,
    private sesionService: SesionService
  ) {
    super();
  }

  ngOnInit(): void {
    const listMenu = this.sesionService.obtenerListMenu();
    this.menuData = this.utilidadesService.obtenerMenuDatos(listMenu);

    // menuActualizado.then(() => {
    //   this.menuData = this.utilidadesService.obtenerMenuDatos();
    // });
  }

  ngAfterContentChecked(): void {
    this.menuPrincipal.nativeElement
      .querySelectorAll('li.menu-padre ul')
      .forEach((submenu: any) => {
        if (!(submenu.id in this.estadoActual)) {
          this.estadoActual[submenu.id] = 'cerrado'; // Aplicar estado inicial de 'cerrado' para los grupos de menú
        }
      });
  }
}
