import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/observable/of';

import { ProductService } from './product.service';
import { IProduct } from './../models/product.interface';

@Injectable()
export class ProductDataResolver implements Resolve<IProduct> {

    constructor(private _router: Router, private productService: ProductService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
        const id = route.paramMap.get('id');

        if (isNaN(+id)) {
            console.log(`id should be an integer`);
            this._router.navigate(['/products'], {queryParamsHandling: 'preserve'});
            return Observable.of(null);
        }
        return this.productService.getProductData(+id)
            .map(product => {
                if (product) {
                    return product;
                }
                alert(`Product was not found: ${id}`);
                this._router.navigate(['/products']);
                return null;
            })
            .catch(error => {
                alert(`Retrieval error: ${error}`);
                this._router.navigate(['/products']);
                return Observable.of(null);
            });
    }

}
