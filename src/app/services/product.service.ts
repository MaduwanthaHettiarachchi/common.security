import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CommonService {

  constructor(private http: HttpClient) {
    super("https://localhost:7270/api/product", http)
  }

}
