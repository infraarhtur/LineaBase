import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { selectionValidator } from './validators/select-list.validator';

@Directive({
  selector: '[appSeleccionValida]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SelectionValidatorDirective,
      multi: true
    }
  ]
})
export class SelectionValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return selectionValidator()(control);
  }
}
