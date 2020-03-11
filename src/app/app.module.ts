
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  HashLocationStrategy,
  LocationStrategy,
  DecimalPipe,
  DatePipe
} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//#region routing
import { routing, appRoutingProviders } from '../app/app.routing';
//#endregion routing

//#region agregar componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MenuGrupoComponent } from './components/sidebar/menu-grupo/menu-grupo.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
//#endregion agregar componentes

//#region importar modulos


import { LoginJwtModule } from './modules/login-jwt/login-jwt.module';
import { EjemplosModule } from './modules/ejemplos/ejemplos.module'
import { TablasModule } from './modules/tablas/tablas.module';
// import { ConfiguracionModule } from './modules/configuracion/configuracion.module';

//#endregion importar modulos

//#region modulos externos
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting
//#endregion modulos externos

//#region Guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
//#endregion Guards

//#region Servicios
import { UtilidadesService } from './services/utilidades.service';
import { obtenerJwtToken } from './functions/utilidades';
import { obtenerJwtTokentype } from './functions/utilidades';

//#endregion Servicios
import { environment } from 'src/environments/environment';


const urlBaseServicio = environment.urlBaseServicio.replace('http://', '');
const tipoTokenJwt = 'Bearer '; //obtenerJwtTokentype();

//interceptors
import { httpInterceptorProviders } from './interceptors';
import { homologacionService } from './services/homologacion.service';
// import { ModalModule } from 'ngx-bootstrap/modal/public_api';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    HomeComponent,
    MenuGrupoComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    NgbModule,
    FormsModule,
    LoginJwtModule,
    EjemplosModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule
    NgxSpinnerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TablasModule,

    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    NgIdleKeepaliveModule.forRoot(),
    // MomentModule, ModalModule.forRoot(),
    // ,
    // ConfiguracionModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    appRoutingProviders,
    LoginGuard,
    AuthGuard,
    UtilidadesService,
    DecimalPipe,
    DatePipe,
    httpInterceptorProviders,
    homologacionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

