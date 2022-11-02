import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ErrorHandler, Inject, Injectable, Input } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(@Inject(String) public api: string, private httpClient: HttpClient) {

  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.log(error, 400)
      return throwError(error)
    }
    else if (error.status === 404) {
      console.log(error, 404)
      return throwError(error)
    }
    else {
      console.log(error)
      return throwError(error)

    }
  }

  getAll() {
    let url = `${this.api}`;
    return this.httpClient.get(url)
      .pipe(retry(1), catchError(this.handleError))
  }

  getPagination(pagesize: number, page: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("pagesize", pagesize);
    queryParams = queryParams.append("page", page);
   // let url = `${this.api}/getAll?pagesize=${pagesize}&page=${page}`;
    let url = `${this.api}/getAll`;
    return this.httpClient.get(url, { params: queryParams })
      .pipe(retry(1), catchError(this.handleError))
  }

  create(resource: any) {
    return this.httpClient.post(this.api, JSON.stringify(resource), { headers: this.headers })
      .pipe(retry(1), catchError(this.handleError))
  }

  update(resource: any) {
    return this.httpClient.put(this.api, JSON.stringify(resource), { headers: this.headers })
      .pipe(retry(1), catchError(this.handleError))
  }

  delete(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Id", id);
    return this.httpClient.delete(this.api, { params: queryParams })
      .pipe(retry(1), catchError(throwError))
  }
  getById(id:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("Id", id);
    return this.httpClient.get(this.api, { params: queryParams })
      .pipe(retry(1), catchError(throwError))
  }

}
