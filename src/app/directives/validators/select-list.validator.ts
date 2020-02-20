import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import * as _ from 'lodash';
import { isNumeric } from 'rxjs/util/isNumeric';

export function selectionValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const etiquetaError = 'opcionInvalida';
    let invalid: boolean;

    if (_.isObjectLike(control.value) || _.isString(control.value)) {
      invalid = _.isEmpty(control.value);
    } else if (isNumeric(control.value)) {
      invalid = control.value <= 0;
    } else {
      invalid = _.isNil(control.value);
    }
    return invalid ? { [etiquetaError]: { value: control.value } } : null;
  };
}
