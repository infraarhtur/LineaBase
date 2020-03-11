import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// import { MessagesUtils } from '../utils/messagesUtils';
@Injectable({
  providedIn: "root"
})
export class tokenValidateUtils {

  errorStorage: number = 0;

  constructor(
    private router: Router,
    // public messages: MessagesUtils
  ) { }

  /**
   * @author Camilo soler
   * @description Guardar el token de la sesión en el LocalStorage
   * @param token Token a guardar en el servidor
   */
  public saveToken(token) {
    localStorage.setItem("sesion", token);
  }



  /**
   *@author Camilo soler
   *@description limpiar localStorage
   *@memberof tokenValidateUtils
   */
  public cleanStorage() {
    localStorage.clear();
  }

  /**
   * @author Camilo soler
   * @description Función encargada de guardar valores en LocalStorage para su uso en la aplicación
   * @param title titulo con el cual se guardara en el localStorage los valores
   * @param  param parametro a almacenar en la aplicación
   */
  public saveLocalStorage(title, param) {
    localStorage.setItem(title, btoa(JSON.stringify(param)));
  }
}
