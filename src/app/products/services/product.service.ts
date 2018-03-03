import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IProduct } from "../product.interface";


@Injectable()
export class ProductService {

    private productsUrl: string =  '../../../api/products/products.json';

    constructor( private _http: HttpClient ){

    }

    getProducts() : Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this.productsUrl)
            .do( (products) => console.log(JSON.stringify(products)))
            .catch( this.handleError );
    }

    private handleError(err: HttpErrorResponse) {
        return Observable.throw(err.message);
    }
}