import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType, RequestMethod  } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {  Css } from './css';
import * as FileSaver from "file-saver";

@Injectable()
export class CssService {

  private baseUrl: string = 'https://able-painter.gomix.me/chroma';
  constructor(private http: Http) {}

  public getCssByPaletteId(id: string, scss: boolean) {
      let requestUrl =  `${this.baseUrl}/${id}?scss=${scss}`;
      let MIMEtype = scss ? 'text/x-scss' : 'text/css';
      let fileType = scss ? 'palette.scss' : 'palette.css';

      let headers = new Headers({ 'Content-Type': MIMEtype, 'Accept': MIMEtype });
      let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });

      return this.http.post(requestUrl, '', options)
                      .map((res: Response) =>{
                            let blob: Blob = res.blob();
                            FileSaver.saveAs(blob, fileType);
                      })
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