import { EmployeeModel } from './employee.model';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeFormService {

    constructor(private http: Http) {
    }

    private extractData(res: Response) {
        const body = res.json();
        return body.fields || { };
    }

    private extractLanguages(res: Response) {
        const body = res.json();
        return body.data || { };
    }

    private handleError(error: any) {
        console.error('observable error: ', error);
        return Observable.throw(error.statusText);
    }

    getLanguages(): Observable<any> {
        return this.http.get('http://localhost:3100/getlanguages')
                        .delay(5000)
                        .map(this.extractLanguages)
                        .catch(this.handleError);
    }

    postEmployeeForm(employee: EmployeeModel): Observable<any> {
        const body = JSON.stringify(employee);
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3100/postemployee', body, options)
                        .map(this.extractData)
                        .catch(this.handleError);


    }
}
