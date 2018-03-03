import { Component } from "@angular/core";

import { IProduct } from './product.interface'

@Component({
    selector: 'am-products',
    templateUrl: './product-list.component.html'
})
export class ProductListComponent {
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    showImage: boolean = false;
    _filterText: string;
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [
        {
            "productId": 1,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2016",
            "description": "Leaf rake with 48-inch wooden handle.",
            "price": 19.95,
            "starRating": 3.2,
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        },
        {
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18, 2016",
            "description": "15 gallon capacity rolling garden cart",
            "price": 32.99,
            "starRating": 4.2,
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        }
    ];

    constructor() {
        this.filteredProducts = this.products;
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

    private filterProducts() : IProduct[] {
        let filterBy = this.filterText.toLocaleLowerCase();
        return this.products.filter( (product: IProduct) => {
            return product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1;
        })
    }
}