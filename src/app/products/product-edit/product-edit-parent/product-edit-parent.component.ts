import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';

import { NumberValidators } from './../../../shared/validators/number.validators';
import { GenericValidator } from '../../../shared/validators/generic.validator';
import { IProduct } from './../../models/product.interface';
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
    private dataIsValid: { [key: string]: boolean } = {};

    constructor(private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService) {
    }

    get isDirty(): boolean {
        return (JSON.stringify(this.currentProduct) !== JSON.stringify(this.originalProduct));
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

    submitEditForm() {
        if (this.isDirty) {
            this.productService.saveProduct(this.product)
                .subscribe(
                    (product: IProduct) => this.onSaveComplete(),
                    (err) => this.productDataErr = <any>err
                );
        } else if (!this.isDirty) {
            this.onSaveComplete();
        }
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

    cancelProductEdit(): void {
        this.router.navigate(['/products'], {queryParamsHandling: 'preserve'});
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    private onSaveComplete(): void {
        this.product = null;
        this.originalProduct = null;
        this.router.navigate(['/products'], {queryParamsHandling: 'preserve'});
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

    private validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.product.productName &&
            this.product.productName.length >= 3 &&
            this.product.productCode) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if (this.product.category &&
            this.product.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }
}
