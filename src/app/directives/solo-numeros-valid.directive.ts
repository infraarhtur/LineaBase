import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { SoloNumerosValidator } from './validators/solo-numeros.validator';

@Directive({
  selector: '[appSoloNumeros]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SoloNumerosValidatorDirective,
      multi: true
    }
  ]
})
export class SoloNumerosValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return SoloNumerosValidator()(control);
  }

  constructor() { }
}
