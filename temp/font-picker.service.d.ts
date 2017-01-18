import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { Http } from '@angular/http';
import { FontPickerConfig, Font, GoogleFonts } from './interfaces';
export declare class FontPickerService {
    private config;
    private http;
    private apiKey;
    private baseUrl;
    constructor(config: FontPickerConfig, http: Http);
    getAllFonts(sort: string): Observable<GoogleFonts>;
    getRequestedFont(family: string): Observable<Font>;
    private handleHttpError(error);
}
