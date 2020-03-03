//#region bibliotecas
import * as _ from 'lodash';
//#endregion bibliotecas


export class Menu {
  public menuMenu: number;
  public menuAlias?: string;
  public menuTitulo: string;
  public menuPadre?: number;
  public menuUrl?: string;
  public menuIcono?: string;
  public menuHijos: Menu[] = [];
  public ronuPermisos?: (boolean | 0 | 1 | null)[] = [false, false, false];

  // tslint:disable-next-line: variable-name
  private __esAbierto = false;

  public get esAbierto(): boolean {
    return this.__esAbierto;
  }

  public set esAbierto(esAbierto: boolean) {
    this.__esAbierto = esAbierto;
  }

  constructor(
    tieneHijos = false
  ) {

    if (tieneHijos) {
      this.ronuPermisos = [];
    }
  }

  get tieneHijos(): boolean {
    return !_.isNil(this.menuHijos) && this.menuHijos.length > 0;
  }

 get tienePadre(): boolean{
   return !_.isNil(this.menuPadre);
 }


}
