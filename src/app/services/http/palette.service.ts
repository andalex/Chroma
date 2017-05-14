import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {  Palette } from './palette';

@Injectable()
export class PaletteService {

  constructor(private http: Http) {}


  private baseUrl: string = 'http://localhost:8080/chroma';

  public getAll(): Observable<[Palette]> {
    let requestUrl =  this.baseUrl;
    
    return <Observable<[Palette]>>this.http.get(requestUrl)
      .map((res) => res.json())
      .catch(this.handleHttpError);
  }

  /*
    Handler for possible http request errors
  */

  private handleHttpError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    return Observable.throw(errMsg);
  }
}