import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

import { ProductService } from './product.service';

@Injectable()
export class ProductDetailGuardService implements CanActivate {

    // ngOnIt is only for components & directives not Injectables

    constructor(private productService: ProductService, private router: Router) {

    }

    // Perfect way to handle a reques from canActivate
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        const allowed: boolean = false;

        const productId = +route.paramMap.get('id');

        if (productId === 0 && route.routeConfig.path.indexOf('products') !== -1) {
            return Observable.of(true);
        }

        if (!isNaN(productId) && productId > 0) {

            return this.productService.getProductsId()
            .map( ( ids: Array<number> ) => {
                console.log(ids.length);
                const include = ids.includes( productId );
                if (!include) {
                    alert('Requested product does not exist');
                    this.router.navigate(['/products']);
                }
                return include;
            });

        } else {
            alert('Please enter a valid product number');
            this.router.navigate(['/products']);
            return Observable.of(allowed);
        }

    }

}
