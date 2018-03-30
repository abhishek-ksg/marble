import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { IProduct } from '../models/product.interface';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'am-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    showImage: boolean = false;
    _filterText: string;
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor( private _productService: ProductService,
                 private route: ActivatedRoute ) {

        this.filterText = '';
    }

    get filterText(): string {
        return this._filterText;
    }

    set filterText(value: string) {
        this._filterText = value;
        this.filteredProducts = this._filterText ? this.filterProducts() : this.products;
        console.log(this.filteredProducts.length);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked($event: string): void {
        this.pageTitle = `Product list ${$event}`;
    }

    ngOnInit() {

        const productName: string = this.route.snapshot.params['productName'];
        const productCode: string = this.route.snapshot.params['productCode'];
        const productTag: string = this.route.snapshot.params['productTag'];

        this._productService.getProducts()
            .subscribe( (products: IProduct[]) => {
                this.products = products;
                this.filteredProducts = this.filterProductsForSearch(productName, productCode, productTag);
            }, this.handleError );
    }

    private handleError(error: any) {
        console.log(`**** Error **** ${error}`);
    }

    private filterProducts(): IProduct[] {
        const filterBy = this.filterText.toLocaleLowerCase();
        return this.products.filter( (product: IProduct) => {
            return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
        });
    }

    private filterProductsForSearch(productName: string, productCode: string, productTag: string): IProduct[] {
        let products: IProduct[] = [];
        if (!productName && !productCode && !productTag) {
            products = this.products;
        }
        if (productName) {
            products = this.products.filter( (product: IProduct) => {
                return product.productName.toLocaleLowerCase().indexOf(productName) !== -1;
            });
        }
        if (productCode) {
            products = this.products.filter( (product: IProduct) => {
                return product.productCode.toLocaleLowerCase().indexOf(productCode) !== -1;
            });
        }
        if (productTag) {
            products = this.products.filter( (product: IProduct) => {
                return product.tags && product.tags.indexOf(productTag) !== -1;
            });
        }
        return products;
    }
}
