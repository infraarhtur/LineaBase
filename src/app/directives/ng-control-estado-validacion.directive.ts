import { Directive, Self, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UtilidadesService } from '../services/utilidades.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ngModel], [formControlName], [formControl]'
})
export class NgControlEstadoValidacionDirective {

  constructor(
    @Self() private ngControl: NgControl,
    public utilsService: UtilidadesService,
  ) { }

  // @HostBinding('class.is-valid') get valid() {
  //   return this.utilsService.esCampoValido(this.ngControl);
  // }
  @HostBinding('class.is-invalid') get invalid() {
    return this.utilsService.esCampoInvalido(this.ngControl);
  }
}
