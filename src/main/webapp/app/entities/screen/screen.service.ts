import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Screen } from './screen.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ScreenService {

    private resourceUrl = SERVER_API_URL + 'api/screens';

    constructor(private http: Http) { }

    create(screen: Screen): Observable<Screen> {
        const copy = this.convert(screen);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(screen: Screen): Observable<Screen> {
        const copy = this.convert(screen);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Screen> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Screen.
     */
    private convertItemFromServer(json: any): Screen {
        const entity: Screen = Object.assign(new Screen(), json);
        return entity;
    }

    /**
     * Convert a Screen to a JSON which can be sent to the server.
     */
    private convert(screen: Screen): Screen {
        const copy: Screen = Object.assign({}, screen);
        return copy;
    }
}
