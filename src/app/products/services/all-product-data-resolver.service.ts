import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/observable/of';

import { ProductService } from './product.service';
import { IProduct } from './../models/product.interface';

@Injectable()
export class AllProductsDataResolver implements Resolve<IProduct> {

    constructor(private _router: Router, private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        return this.productService.getProducts()
            .map(products => {
                if (products) {
                    return products;
                }
                alert(`Products not found`);
                this._router.navigate(['/welcome']);
                return null;
            })
            .catch(error => {
                alert(`Retrieval error: ${error}`);
                this._router.navigate(['/welcome']);
                return Observable.of(null);
            });
    }

}
