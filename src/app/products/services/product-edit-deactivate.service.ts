import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ProductEditParentComponent } from './../product-edit/product-edit-parent/product-edit-parent.component';

@Injectable()
export class ProductEditDeactivateService implements CanDeactivate<ProductEditParentComponent> {
    canDeactivate(component: ProductEditParentComponent): boolean {
        if (component.isDirty) {
            const productName: string = component.product.productName || 'New Product';
            if (confirm(`Route away and lose the unsaved form data for ${productName}`)) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
