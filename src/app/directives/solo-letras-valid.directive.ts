import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { soloLetrasValidator } from './validators/solo-letras.validator';

@Directive({
  selector: '[appSoloLetras]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SoloLetrasValidDirective,
      multi: true
    }
  ]
})
export class SoloLetrasValidDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return soloLetrasValidator()(control);
  }

  constructor() {}
}
