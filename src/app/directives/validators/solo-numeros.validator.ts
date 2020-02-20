import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { isNumeric } from 'rxjs/util/isNumeric';
import * as _ from 'lodash';

export function SoloNumerosValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const etiquetaError = 'SoloNumeros';
    const invalid = !_.isNil(control.value) && !isNumeric(control.value);

    return invalid ? { [etiquetaError]: { value: control.value } } : null;
  };
}
