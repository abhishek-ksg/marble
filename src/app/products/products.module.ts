import { NgModule, Component } from '@angular/core';
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
import { AuthGruard } from './../userLogIn/service/auth-guard.service';
import { SearchProductValidationService } from './services/search-product-validation.service';
import { SearchProductComponent } from './search-product-form/search-product.component';
import { ProductDataResolver } from './services/product-data-resolver.service';
import { AllProductsDataResolver } from './services/all-product-data-resolver.service';

const ROUTES: Array<object> = [
    {
        path: 'products',
        canActivate: [AuthGruard],
        component: ProductListComponent,
        resolve: {products: AllProductsDataResolver}
    },
    {
        path: 'products/search',
        canActivate: [AuthGruard],
        component: SearchProductComponent
    },
    {
        path: 'products/:id/edit',
        canActivate: [AuthGruard, ProductDetailGuardService],
        canDeactivate: [ProductEditDeactivateService],
        component: ProductEditComponent,
        resolve: {product: ProductDataResolver}
    },
    {
        path: 'products/:id',
        canActivate: [AuthGruard, ProductDetailGuardService],
        component: ProductDetailComponent,
        resolve: {product: ProductDataResolver}
    }
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
        ProductEditComponent,
        SearchProductComponent
    ],
    providers: [
        ProductService,
        ProductDetailGuardService,
        ProductEditDeactivateService,
        SearchProductValidationService,
        ProductDataResolver,
        AllProductsDataResolver
    ]

})
export class ProdusctsModule {

}
