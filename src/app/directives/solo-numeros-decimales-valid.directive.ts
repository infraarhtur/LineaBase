import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { soloNumerosDecimalesValidator } from './validators/solo-numeros-decimales.validator';

@Directive({
  selector: '[appSoloNumerosDecimales]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: SoloNumerosDecimalesValidatorDirective,
      multi: true
    }
  ]
})
export class SoloNumerosDecimalesValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return soloNumerosDecimalesValidator()(control);
  }

  constructor() {}
}
