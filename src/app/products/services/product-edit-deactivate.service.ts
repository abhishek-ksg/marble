import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ProductEditComponent } from './../product-edit/product-edit.component';

@Injectable()
export class ProductEditDeactivateService implements CanDeactivate<ProductEditComponent> {
    canDeactivate(component: ProductEditComponent): boolean {
        if (component.productForm.dirty) {
            const productName: string = component.productForm.get('productName').value || 'New Product';
            if (confirm(`Route away and lose the unsaved form data for ${productName}`)) {
                component.productForm.reset();
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
