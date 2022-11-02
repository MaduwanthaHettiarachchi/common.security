import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModuleService extends CommonService {

  constructor( http:HttpClient) {
    super("https://localhost:7270/api/Module",http)
   }
}
