import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { IProduct } from "../models/product.interface";
import { ProductService } from "../services/product.service";

@Component({
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{
    product: IProduct;
    productId: number;

    constructor(private _route: ActivatedRoute, private productService: ProductService){

    }

    ngOnInit() {
        this._route.paramMap.subscribe( (params) => {
            this.productId = +params.get('id');
            this.productService.getProductData(this.productId)
                .subscribe( (product: IProduct) => this.product = product );
        })
    }

}