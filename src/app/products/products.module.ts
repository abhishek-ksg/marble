import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterilModule } from './../angularmaterial/angularmaterial.module';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './products-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuardService } from './services/product-detail-guard.service';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        AngularMaterilModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'products', component: ProductListComponent},
            {path: 'addproduct/:id', component: ProductEditComponent},
            {path: 'products/:id', canActivate: [ProductDetailGuardService], component: ProductDetailComponent}
        ])
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent
    ],
    providers: [
        ProductService,
        ProductDetailGuardService
    ]

})
export class ProdusctsModule {

}
