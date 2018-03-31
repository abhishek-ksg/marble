import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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

        return this._http.get<IProduct[]>(this.baseUrl)
            .delay(1000)
            .do( (products) => {
                console.log(JSON.stringify(products));
                this.cachedProduct = products;
            })
            .catch( this.handleError );
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

    saveProduct(product: IProduct): Observable<IProduct> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
        };

        if (product.id === 0) {
            return this.createNewProduct(product, httpOptions);
        }
        return this.updateProduct(product, httpOptions);
    }

    deleteProduct(id: number): Observable<Response> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'my-auth-token'
            })
        };
        const url: string = `${this.baseUrl}/${id}`;

        return this._http.delete(url, httpOptions)
            .do( (data) => console.log('Delted product ' + JSON.stringify(data)) )
            .catch( this.handleError );
    }

    private createNewProduct(newProduct: IProduct, httpOptions: any): Observable<IProduct> {
        // In memory web api will create the new id for new product only if its undefined
        newProduct.id = undefined;
        return this._http.post<IProduct>(this.baseUrl, newProduct, httpOptions)
            .map(this.extractData)
            .do( (data) => console.log('Created Product: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProduct(newProduct: IProduct, httpOptions: any): Observable<IProduct> {
        const url = `${this.baseUrl}/${newProduct.id}`;
        return this._http.put(url, newProduct, httpOptions)
            .map(this.extractData)
            .do( (data) => console.log('Updated Product: ' + JSON.stringify(data)))
            .catch(this.handleError);
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
            imageUrl: null,
            category: null
        };
    }

    private extractData(response: any): Observable<IProduct> {
        return (response);
    }
}
