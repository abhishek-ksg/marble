import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { IProduct } from '../models/product.interface';


@Injectable()
export class ProductService {

    private productsUrl: string =  '../../../api/products/products.json';
    private cachedProduct: IProduct[] = [];
    private baseUrl: string = 'api/products';

    constructor( private _http: HttpClient ) {

    }

    getProducts(): Observable<IProduct[]> {

        if (this.cachedProduct && this.cachedProduct.length > 0) {
            return Observable.of(this.cachedProduct);
        } else {
            return this._http.get<IProduct[]>(this.baseUrl)
            .delay(1000)
            .do( (products) => {
                console.log(JSON.stringify(products));
                this.cachedProduct = products;
            })
            .catch( this.handleError );
        }
    }

    getProductData(id: number): Observable<IProduct> {

        if (id === 0) {
            return Observable.of(this.getInitializedProduct());
        }
        const url: string = `${this.baseUrl}/${id}`;
        return this._http.get<IProduct>(url)
            // .map( this.extractData )
            .delay(1000)
            .do( data => console.log('received product ' + JSON.stringify(data) ))
            .catch( this.handleError );
    }

    getProductsId(): Observable<number[]> {
        return this.getProducts()
            .map( ( products: Array<IProduct> ) =>  products.map( (p: IProduct ) => p.id ) );
    }

    private handleError(err: HttpErrorResponse) {
        return Observable.throw(err.statusText);
    }

    private getInitializedProduct(): IProduct {
        return {
            id: 0,
            productName: null,
            productCode: null,
            releaseDate: null,
            description: null,
            tags: [],
            price: null,
            starRating: null,
            imageUrl: null
        };
    }

    private extractData(response: any): Observable<IProduct> {
        return (response);
    }
}
