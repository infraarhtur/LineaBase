import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { ModalEditarComponent } from './components/modal-editar/modal-editar.component';

// Módulos externos
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Módulos internos
import { DirectivesModule } from '../directives/directives.module';
import {EjemploRoutingModule } from './ejemplos.routing';
import { TablasModule } from '../tablas/tablas.module';

// Services
import { EjemplosService } from '../../services/ejemplos.service';

@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    ModalEditarComponent
  ],
  imports: [
    CommonModule,
    EjemploRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DirectivesModule,
    NgbModule,
    ReactiveFormsModule,
    TablasModule
  ],
  providers: [
    EjemplosService,
    Ng4LoadingSpinnerService,
  ]
})
export class EjemplosModule { }
