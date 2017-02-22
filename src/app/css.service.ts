import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {  Css } from './css';

@Injectable()
export class CssService {

  constructor(private http: Http) {}


  private baseUrl: string = 'http://localhost:8080';


    public getCssByPaletteId(id: string, scss: boolean): Observable<Css> {
    let requestUrl =  `${this.baseUrl}/${id}?scss=${scss}`;

    return <Observable<Css>>this.http.get(requestUrl)
      .map((res) => {
        console.log(res.json())

      })
      .catch(this.handleHttpError);
  }

  /*
    Handler for possible http request errors
  */

  private handleHttpError(error: any) {
    console.log('ERROR ERROR !')
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    return Observable.throw(errMsg);
  }
}