import { ErrorControlado } from './error-controlado';
import { Pagina } from './pagina';

export class Respuesta {
  public codigoEstado: string;
  public mensajeEstado: string;
  public resultado: string | ErrorControlado | Pagina | object | object[];
  public tipoMensaje?: 'error' | 'info' | 'warning';

  /**
   * `true`: Muestra el mensaje en una ventana de alerta Swal.
   * `false`: Muestra el mensaje en una notificación toast.
   */
  public esAlerta = true;

  constructor() {}
}
