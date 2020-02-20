import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//#region components
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
//#endregion components

//#region guards
import { LoginGuard } from 'src/app/guards/login.guard';
import { AuthGuard } from 'src/app/guards/auth.guard';
//#endregion guards

//#region models
import { Vista } from 'src/app/models/vista';
//#endregion models

const vistas = {
  Usuarios: new Vista('Ejemplos'),
};

const EjemploRoutes: Routes = [{
  path: 'Ejemplos', component: MainComponent,
  canActivate: [
    LoginGuard,
    AuthGuard
  ],
  canActivateChild: [
    LoginGuard,
    AuthGuard
  ],
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { vista: vistas.Usuarios } },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(EjemploRoutes)],
  exports: [RouterModule]
})
export class EjemploRoutingModule { }
