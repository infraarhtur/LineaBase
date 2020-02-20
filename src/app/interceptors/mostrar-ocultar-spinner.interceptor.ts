import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';

//#region services
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
//#endregion services

//#region bibliotecas
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import * as _ from 'lodash';
//#endregion bibliotecas


@Injectable({
  providedIn: 'root'
})
export class MostrarOcultarSpinnerInterceptor implements HttpInterceptor {
  // tslint:disable: variable-name

  constructor(
    private __spinnerService: Ng4LoadingSpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Sent) {
          this.__spinnerService.show();
        }
        return event;
      }),
      finalize(() => {
        this.__spinnerService.hide();
      })
    );
  }
}
