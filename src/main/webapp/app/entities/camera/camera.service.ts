import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { Camera } from './camera.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CameraService {

    private resourceUrl = SERVER_API_URL + 'api/cameras';

    constructor(private http: Http) { }

    create(camera: Camera): Observable<Camera> {
        const copy = this.convert(camera);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(camera: Camera): Observable<Camera> {
        const copy = this.convert(camera);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Camera> {
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
     * Convert a returned JSON object to Camera.
     */
    private convertItemFromServer(json: any): Camera {
        const entity: Camera = Object.assign(new Camera(), json);
        return entity;
    }

    /**
     * Convert a Camera to a JSON which can be sent to the server.
     */
    private convert(camera: Camera): Camera {
        const copy: Camera = Object.assign({}, camera);
        return copy;
    }
}
