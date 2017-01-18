import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Font } from './fonts';


@Injectable()
export class FontService {

  constructor(private http: Http) {
  }

  private apiKey: string = 'AIzaSyA7Jbi6_1urAU92GlvrbDXJ2t6cjnxJsls';

  private baseUrl: string = 'https://www.googleapis.com/webfonts/v1/webfonts';

  public getAll(sort: string): Observable<Font> {
    let requestUrl =  `${this.baseUrl}?key=${this.apiKey}`

    if (sort) {
      requestUrl = requestUrl.concat('&sort=' + sort)
    }

    return <Observable<Font>>this.http.get(requestUrl)
      .map((res) => res.json())
      .catch(this.handleHttpError);
  }


  public getRequestedFont(family: string): Observable<Font> {
    let requestUrl = 'https://fonts.googleapis.com/css?family=' + family;

    return <Observable<Font>>this.http.get(requestUrl)
      .map(res => res.json())
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