import * as _ from 'lodash';
import { SesionService } from "./../services/sesion.service";

export function cargarArchivoTextoAjaxSync(
  rutaArchivo: string,
  mimeType: string
) {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('GET', rutaArchivo, false);

  if (!_.isNil(mimeType)) {
    if (xmlhttp.overrideMimeType) {
      xmlhttp.overrideMimeType(mimeType);
    }
  }
  xmlhttp.send();

  if (xmlhttp.status === 200) {
    return xmlhttp.responseText;
  } else {
    return null;
  }
}

export function cargarJSON(rutaArchivo: string) {
  const json = cargarArchivoTextoAjaxSync(rutaArchivo, 'application/json');
  return JSON.parse(json);
}

export function obtenerJwtToken() {
  const sesionService = new SesionService();
  const sesion = sesionService.obtenerSesion();

  return sesion.accessToken;
 }

 export function obtenerJwtTokentype(){
  const sesionService = new SesionService();
  const sesion = sesionService.obtenerSesion();
  return sesion.tokenType+' ';
 }
