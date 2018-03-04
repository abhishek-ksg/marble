import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of'
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";

import { ProductService } from "./product.service";

@Injectable()
export class ProductDetailGuardService implements CanActivate{

    //ngOnIt is only for components & directives not Injectables

    constructor(private productService: ProductService, private router: Router){
        // this.productService.getProductsId()
        //     .subscribe( (ids: number[]) => {
        //         this.ids = ids
        //     });
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean>{
        let allowed: boolean = false;

        let productId = +route.paramMap.get('id');

        if(!isNaN(productId) && productId > 0){

            return this.productService.getProductsId()
            .map( ( ids: Array<number> ) => {
                console.log(ids.length);
                let include = ids.includes( productId )
                if(!include){
                    alert('Requested product does not exist');
                    this.router.navigate(['/products']);
                }
                return include;
            });

        }
        else{
            alert('Please enter a valid product number');
            this.router.navigate(['/products']);
            return Observable.of(allowed);
        }

    }

}