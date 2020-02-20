import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//#region Directives
import { SoloNumerosValidatorDirective } from 'src/app/directives/solo-numeros-valid.directive';
import { SelectionValidatorDirective } from 'src/app/directives/selection-valid.directive';
import { SoloNumerosDecimalesValidatorDirective } from 'src/app/directives/solo-numeros-decimales-valid.directive';
import { SoloLetrasValidDirective } from 'src/app/directives/solo-letras-valid.directive';
import { NgControlEstadoValidacionDirective } from '../../directives/ng-control-estado-validacion.directive';
import { ExpresionRegularDirective } from 'src/app/directives/expresion-regular.directive';
import { SoloNumerosDirective } from '../../directives/solo-numeros.directive';
//#endregion Directives

const directives = [
  SoloNumerosValidatorDirective,
  SelectionValidatorDirective,
  SoloNumerosDecimalesValidatorDirective,
  SoloLetrasValidDirective,
  NgControlEstadoValidacionDirective,
  ExpresionRegularDirective,
  SoloNumerosDirective
];

@NgModule({
  declarations: directives,
  imports: [CommonModule],
  exports: directives
})
export class DirectivesModule {}
