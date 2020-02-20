import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { expresionRegularValidator } from './validators/expresion-regular.validator';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[expresionRegular]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ExpresionRegularDirective,
      multi: true
    }
  ]
})
export class ExpresionRegularDirective implements Validator {
  @Input() expresionRegular: RegExp | string;
  @Input() expresionRegularFlags?: string;

  validate(control: AbstractControl): ValidationErrors | null {
    return expresionRegularValidator(
      this.expresionRegular,
      this.expresionRegularFlags
    )(control);
  }

  constructor() {}
}