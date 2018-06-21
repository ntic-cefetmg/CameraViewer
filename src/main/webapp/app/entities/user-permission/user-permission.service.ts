import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UserPermission } from './user-permission.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserPermissionService {

    private resourceUrl = SERVER_API_URL + 'api/user-permissions';

    constructor(private http: Http) { }

    create(userPermission: UserPermission): Observable<UserPermission> {
        const copy = this.convert(userPermission);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userPermission: UserPermission): Observable<UserPermission> {
        const copy = this.convert(userPermission);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserPermission> {
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
     * Convert a returned JSON object to UserPermission.
     */
    private convertItemFromServer(json: any): UserPermission {
        const entity: UserPermission = Object.assign(new UserPermission(), json);
        return entity;
    }

    /**
     * Convert a UserPermission to a JSON which can be sent to the server.
     */
    private convert(userPermission: UserPermission): UserPermission {
        const copy: UserPermission = Object.assign({}, userPermission);
        return copy;
    }
}
