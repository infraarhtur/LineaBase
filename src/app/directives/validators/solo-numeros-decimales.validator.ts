import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';

export function soloNumerosDecimalesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const etiquetaError = 'numeroNoEsDecimal';
    const invalid = !_.isFinite(control.value);

    return invalid ? { [etiquetaError]: { value: control.value } } : null;
  };
}
