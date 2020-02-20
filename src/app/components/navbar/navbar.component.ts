import { Component, OnInit, DoCheck, Host } from '@angular/core';
import { Router } from '@angular/router';
// modelo
import { Usuario } from 'src/app/models/usuario';
// servicios
import { LoginJwtService } from '../../services/login-jwt.service';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AppComponent]
})
export class NavbarComponent implements OnInit, DoCheck {
  // public _notificaciones: Notificaciones[] = [];
  // public _notificaciones: Notificaciones[] = '';
  public _usuario: Usuario;
  public cantidadNotificaciones: number;
  public isNotificaciones: boolean;

  constructor(
    @Host() private appComponet :AppComponent,
    private router: Router,
    private servicioLogin: LoginJwtService
  ) { }

  ngOnInit() {
    this.isIdentity();
  }

  ngDoCheck() {
    this.isIdentity();
    this.notificacionesServicios();
  }

  cerrarSesion() {
  // debugger;
  this.appComponet.logout();


    this.router.navigate(['/login']);
  }

  isIdentity() {

    this._usuario = new Usuario();
    if (!this.servicioLogin.isIdentity()) {
      this._usuario = new Usuario();
      // this._usuario.nombre = '';
    } else {
      this._usuario.nombre ='prueba';
     var data = JSON.parse(localStorage.getItem('datosBasicos'));
    }
  }
  notificacionesServicios() {
    //   this.notificacionService.obtenerNotificaciones(this._usuario.id).subscribe((res: Notificaciones[]) => {
    //   this._notificaciones = res.map(value => {
    //     return value
    //   });
    //   this.cantidadNotificaciones = this._notificaciones.length;
    //   this.mostrarNotificacion();
    // },
    //   error => {
    //     // Swal.fire({
    //     //   type: 'error',
    //     //   title: 'Oops...',
    //     //   text: ' error al cargar notificaciones!',
    //     //   footer: ''
    //     // });
    //     // console.log(error);
    //   }
    // );
  }
  mostrarNotificacion() {

    // if (this.cantidadNotificaciones > 0) {
    //   this.isNotificaciones = true;
    // } else {
    //   this.isNotificaciones = false;
    // }
  }

  actualizarNotificacion() {

  //   this.notificacionService.actualizarNotificaciones(this._usuario.id).subscribe((res: any) => {
  //   if(res=== true){
  //     console.log('funciono');
  //   }
  //   },
  //     error => {
  //       Swal.fire({
  //         type: 'error',
  //         title: 'Oops...',
  //         text: ' error al actualizar Notificaciones!',
  //         footer: ''
  //       });
  //       console.log(error);
  //     }
  //   );
  }
  mostrarUOcultarSidebar() {
    const sidebar = document.querySelector('#sidebar') as HTMLElement;
    sidebar.classList.toggle('active');
  }
}
