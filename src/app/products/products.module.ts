import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AngularMaterilModule } from './../angularmaterial/angularmaterial.module';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './products-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuardService } from './services/product-detail-guard.service';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductData } from './services/product.db';
import { ProductEditDeactivateService } from './services/product-edit-deactivate.service';

const ROUTES: Array<object> = [
    {path: 'products', component: ProductListComponent},
    {path: 'addproduct/:id', canActivate: [ProductDetailGuardService],
            canDeactivate: [ProductEditDeactivateService], component: ProductEditComponent},
    {path: 'products/:id', canActivate: [ProductDetailGuardService], component: ProductDetailComponent}
];

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        AngularMaterilModule,
        InMemoryWebApiModule.forRoot(ProductData, {delay: 1000}),
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ProductEditComponent
    ],
    providers: [
        ProductService,
        ProductDetailGuardService,
        ProductEditDeactivateService
    ]

})
export class ProdusctsModule {

}
