import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { IProduct } from "../models/product.interface";
import { ProductService } from "../services/product.service";

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
    product: IProduct;
    productId: number;
    disableNext: boolean = false;
    disablePrev: boolean = false;

    private ids: number[] = [];

    constructor(private _route: ActivatedRoute, private _router: Router, private productService: ProductService){

    }

    ngOnInit() {
        this._route.paramMap.subscribe( (params) => {
            this.productId = +params.get('id');

            this.productService.getProductData(this.productId)
                .subscribe( (product: IProduct) => {
                    this.product = product;
                    this.toggleNextPrev();
                } );
        })

        this.productService.getProductsId()
            .subscribe( (ids: number[]) => {
                this.ids = ids
                this.toggleNextPrev();
            });
    }

    onBack() {
        this._router.navigate(['/products']);
    }

    nextPrevProduct(next: boolean = true): void {
        this.productId = this.getNextPrevProductId(next);

        this._router.navigate(['products', this.productId]);
    }

    private toggleNextPrev() {
        this.disableNext = this.getNextPrevProductId(true) == undefined;
        this.disablePrev = this.getNextPrevProductId(false) == undefined;
    }

    private getNextPrevProductId(next: boolean) : number {
        let delta = next ? 1 : -1;
        return this.ids[ this.ids.indexOf(this.productId) + delta ];
    }

}