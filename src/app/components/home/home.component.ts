import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'
import { FormsModule } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { fundido } from '../../animation/animation';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


// import 'DataTables.net';
import Swal from 'sweetalert2';
declare var require: any;
require('bootstrap');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
  animations: [fundido]
})
export class HomeComponent implements OnInit {
  public urlBase: string;
  public model;
  public model1: Date;
  public model2: Date;
  constructor(
    private toastr: ToastrService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router) { }

  ngOnInit() {


    const isLogeado = true; //JSON.parse(localStorage.getItem('IsIdentity'));

    if (!isLogeado) {
      this.router.navigate(['/login']);
    }
    /** spinner starts on init */
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
    this.toastr.error('Hello world!', 'Toastr fun!');
    this.toastr.info('Hello world!', 'Toastr fun!');
  }

  spiner() {
    this.spinnerService.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */

      this.spinnerService.hide();
    }, 5000);

  }

 

}
