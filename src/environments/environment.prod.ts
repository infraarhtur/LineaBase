import { cargarJSON } from '../app/functions/utilidades';

const environmentConfig = cargarJSON('assets/environment-config.json');

const environment = {
  production: true,
  urlBaseServikom: 'http://172.168.10.46/SALServikom',
  // urlBaseServikom: 'http://cobogap02:212/Servicios',
  urlBaseServicio: 'http://localhost:52654',
  DTLenguajeES: 'assets/DT-language-ES.json',
  esAutorizacionesActivadas: false,
  listaNegra: [],
  comprobarSiLogeado:true,
  paginacionNumero: 1,
 paginacionTamanyo: 10,
};

// Asignación masiva de las propiedades del objeto environmentConfig a las propiedades del objeto environment
// Actualiza environment antes de exportar
Object.assign(environment, environmentConfig);

export { environment };
