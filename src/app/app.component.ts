import { Component, OnInit, OnChanges, DoCheck, ViewChild } from '@angular/core';
import { environment } from './../environments/environment';

//librerias externas
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-bootstrap/modal';


import { LoginJwtService } from './services/login-jwt.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import * as utilidades from '../app/functions/utilidades';


// declare var $: any;
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

import { JwtService } from './services/jwt.service';
import * as jwt_decode from 'jwt-decode';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent implements OnInit, OnChanges, DoCheck {
  public mostrarMenus: boolean;
  public isDentity: boolean;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  public modalOptions = {
    backdrop: 'static',
    ignoreBackdropClick: true
  };

  // public modalRef: BsModalRef;

  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(
    // tslint:disable-next-line: variable-name
    private loginService: LoginJwtService,
    private jwtService: JwtService,
    private idle: Idle,
    private keepalive: Keepalive,
    private router: Router,
    
    // private modalService: BsModalService
  ) {
    this.ConfigurarInactividad();


  }

  ngOnInit() {
    this.inicializarJQuery();
    this.mostrarUocultarMenus();
    this.verificarSesion();
  }

 /**
  * @author Camilo Soler
  * @description Metodo el cual permite validar si el usuario inicio sesion  e inyectar el tiempo de expiracion tokenJwt
  */
  verificarSesion() {
    const sesion = JSON.parse(localStorage.getItem('sesion'));
    if (sesion !== null || sesion !== undefined) {
      this.jwtService.decodificarToken();
    }
  }


  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    // this.reset();
    // this.jwtService.regenerarToken();
    this.childModal.hide();

  }

  stay() {
    this.reset();
    this.childModal.hide();
    this.jwtService.regenerarToken();
  }


  logout() {
    this.loginService.establecerLogueado(false);
    this.router.navigate(['/']);
    this.loginService.logOut();
    // this.childModal.hide();
    localStorage.clear();

  }

  noHayAtras() {
    window.history.forward();
  }

  inicializarJQuery() {
    jQuery(() => {
      $('[data-toggle="tooltip"]').tooltip();

      window.history.forward();
      window.onload = this.noHayAtras;
      window.onpageshow = (event: PageTransitionEvent) => {
        if (event.persisted) {
          this.noHayAtras();
        }
      };
      window.onunload = undefined;
    });
  }

  ngDoCheck() {
    this.mostrarUocultarMenus();
  }

  ngOnChanges() { }

  mostrarUocultarMenus() {


    if (this.loginService.esLogeado()) {

      this.mostrarMenus = true;
    } else {
      this.mostrarMenus = false;
    }
  }

  ConfigurarInactividad() {
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(180);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(180);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      // this.idleState = 'Sesión actualizada';
      this.reset();
      this.jwtService.regenerarToken();
      //this.childModal.hide();
    });
    this.idle.onTimeout.subscribe(() => {
      this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      // this.router.navigate(['/']);
      this.loginService.logOut();
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      this.childModal.show();
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'Su sesión expirará en ' + countdown + ' segundos';
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(10000);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.loginService.obtenerLogueado().subscribe(esUsuarioLogueado => {
      if (esUsuarioLogueado) {
        this.idle.watch();
        this.timedOut = false;
      } else {
        this.idle.stop();
      }
    });
    this.reset();

  }
}

