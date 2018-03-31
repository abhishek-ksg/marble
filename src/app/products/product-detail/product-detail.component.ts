import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from '../models/product.interface';
import { ProductService } from '../services/product.service';

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: IProduct;
    productId: number;
    disableNext: boolean = false;
    disablePrev: boolean = false;

    private ids: number[] = [];

    constructor(private _route: ActivatedRoute, private _router: Router, private productService: ProductService) {

    }

    ngOnInit() {
        this._route.data.subscribe( (data) => {
            this.product = data['product'];
            this.productId = this.product.id;
        });

        this.toggleNextPrev();

        this.productService.getProductsId()
            .subscribe( (ids: number[]) => {
                this.ids = ids;
                this.toggleNextPrev();
            });
    }

    onBack() {
        this._router.navigate(['/products'], {queryParamsHandling: 'preserve'});
    }

    nextPrevProduct(next: boolean = true): void {
        this.productId = this.getNextPrevProductId(next);
        this._router.navigate(['products', this.productId], {queryParamsHandling: 'preserve'});
    }

    editProduct(): void {
        this._router.navigate(['/products', this.productId, 'edit'], {queryParamsHandling: 'preserve'});
    }

    private toggleNextPrev() {
        this.disableNext = this.getNextPrevProductId(true) === undefined;
        this.disablePrev = this.getNextPrevProductId(false) === undefined;
    }

    private getNextPrevProductId(next: boolean): number {
        const delta = next ? 1 : -1;
        return this.ids[ this.ids.indexOf(this.productId) + delta ];
    }

}
