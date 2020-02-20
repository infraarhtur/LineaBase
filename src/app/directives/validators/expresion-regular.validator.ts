import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';

export function expresionRegularValidator(
  expresionRegular: RegExp | string,
  flags?: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const etiquetaError = 'expresionRegular';

    if (typeof expresionRegular === 'string') {
      expresionRegular = new RegExp(expresionRegular, flags);
    }
    const invalid =
      !_.isNil(control.value) && expresionRegular instanceof RegExp && !expresionRegular.test(control.value);

    return invalid
      ? {
          [etiquetaError]: {
            value: control.value,
            message: 'El valor ingresado no es válido'
          }
        }
      : null;
  };
}
