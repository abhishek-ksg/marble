import { IProduct } from './../../models/product.interface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NumberValidators } from './../../../shared/validators/number.validators';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { GenericValidator } from '../../../shared/validators/generic.validator';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from './../../services/product.service';

@Component({
    templateUrl: './product-edit-parent.component.html',
    styleUrls: ['./product-edit-parent.component.css']
})
export class ProductEditParentComponent implements OnInit {

    productDataErr: string;
    pageTitle: string = 'Add Product';

    private currentProduct: IProduct;
    private originalProduct: IProduct;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService) {
    }

    get product(): IProduct {
        return this.currentProduct;
    }
    set product(value: IProduct) {
        this.currentProduct = value;
        // Clone the object to retain a copy
        this.originalProduct = Object.assign({}, value);
    }


    ngOnInit() {
        this.route.data.subscribe( (data) => {
            this.onProductDataReceived(data['product']);
        });
    }

    saveProduct() {
        // if (this.productForm.dirty && this.productForm.valid) {
        //     const newProduct = Object.assign({}, this.product, this.productForm.value);
        //     this.productService.saveProduct(newProduct)
        //         .subscribe(
        //             (product: IProduct) => this.onSaveComplete(),
        //             (err) => this.productDataErr = <any>err
        //         );
        // } else if (!this.productForm.dirty) {
        //     this.onSaveComplete();
        // }
    }

    deleteProduct() {
        if (this.product.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.productService.deleteProduct(this.product.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.productDataErr = <any>error
                    );
            }
        }
    }

    private onSaveComplete(): void {
        this.router.navigate(['/products'], {queryParamsHandling: 'preserve'});
    }

    private getProductData(productId: number): void {
        this.productService.getProductData(productId)
            .subscribe( (product: IProduct) => this.onProductDataReceived(product),
                        ( error: any ) => this.productDataErr = <any>error);
    }

    private onProductDataReceived(product: IProduct): void {
        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = 'Edit Product: ' + this.product.productName;
        }

        this.productDataErr = '';
    }

    cancelProductEdit(): void {
        this.router.navigate(['/products'], {queryParamsHandling: 'preserve'});
    }
}
