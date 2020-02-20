import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

// Servicios
import { TablaPaginacionComponent } from './components/tabla-paginacion/tabla-paginacion.component';
import { TablaFiltroBuscarComponent } from './components/tabla-filtro-buscar/tabla-filtro-buscar.component';

// Modulos
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const components = [
  TablaPaginacionComponent,
  TablaFiltroBuscarComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: components
})
export class TablasModule {}
