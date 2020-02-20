import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';

export function soloLetrasValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const etiquetaError = 'soloLetras';
    let invalid = true;

    if (_.isString(control.value)) {
      const valorSinAcentos = control.value
        .normalize('NFD')                    // Eliminar los acentos y caracteres diacríticos
        .replace(/[\u0300-\u036f]/g, '');    // del valor como string (ej.: ´, `, ¨, ~, ^, etc.)
      invalid = !(
        _.isString(control.value) && /[a-zA-Z]+/.test(valorSinAcentos)
      );
    }
    return invalid ? { [etiquetaError]: { value: control.value } } : null;
  };
}
