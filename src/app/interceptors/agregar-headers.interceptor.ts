import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { obtenerJwtToken} from '../functions/utilidades';
import { environment } from 'src/environments/environment';

const tipoTokenJwt = 'Bearer ';

@Injectable({
  providedIn: 'root'
})
export class AgregarHeadersInterceptor implements HttpInterceptor {
  
  public listaNegra: string[] = [];
  constructor() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < environment.listaNegra.length; i++) {
      this.listaNegra.push(
        environment.urlBaseServicio + environment.listaNegra[i]
      )

    };
    // console.log(this.listaNegra);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = obtenerJwtToken();
    let request = req;
    if (!this.listaNegra.includes(req.url)) {
      if (token) {
        request = req.clone({
          setHeaders: {

            Authorization: `${tipoTokenJwt} ${token}`
          }
        });
      }
    }

    return next.handle(request);
  }


}
