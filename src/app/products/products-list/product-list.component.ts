import { Component, OnInit } from "@angular/core";

import { IProduct } from '../models/product.interface'
import { ProductService } from "../services/product.service";

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

    constructor( private _productService: ProductService ) {

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
        this._productService.getProducts()
            .subscribe( (products: IProduct[]) => {
                this.products = products;
                this.filteredProducts = this.products;
            }, this.handleError );
    }

    private handleError(error: any) {
        console.log(`**** Error **** ${error}`);
    }

    private filterProducts() : IProduct[] {
        let filterBy = this.filterText.toLocaleLowerCase();
        return this.products.filter( (product: IProduct) => {
            return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
        })
    }
}