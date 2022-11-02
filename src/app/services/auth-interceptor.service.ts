import { ModuleService } from './module.service';
import { ProductService } from './product.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private poroductService: ProductService,
    private moduleService: ModuleService
  ) { 
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    })
    return next.handle(req);
  }
}
