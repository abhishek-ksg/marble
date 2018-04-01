import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AngularMaterialModule } from './../angularmaterial/angularmaterial.module';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './products-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuardService } from './services/product-detail-guard.service';
import { ProductData } from './services/product.db';
import { ProductEditDeactivateService } from './services/product-edit-deactivate.service';
import { AuthGuard } from './../userLogIn/service/auth-guard.service';
import { SearchProductValidationService } from './services/search-product-validation.service';
import { SearchProductComponent } from './search-product-form/search-product.component';
import { ProductDataResolver } from './services/product-data-resolver.service';
import { AllProductsDataResolver } from './services/all-product-data-resolver.service';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags/product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info/product-edit-info.component.';
import { ProductEditParentComponent } from './product-edit/product-edit-parent/product-edit-parent.component';

const ROUTES: Array<object> = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ProductListComponent,
        resolve: {products: AllProductsDataResolver}
    },
    {
        path: 'search',
        canActivate: [AuthGuard],
        component: SearchProductComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard, ProductDetailGuardService],
        component: ProductDetailComponent,
        resolve: {product: ProductDataResolver}
    },
    {
        path: ':id/edit',
        canActivate: [AuthGuard, ProductDetailGuardService],
        canDeactivate: [ProductEditDeactivateService],
        component: ProductEditParentComponent,
        resolve: {product: ProductDataResolver},
        children: [
            {path: '', redirectTo: 'info', pathMatch: 'full'},
            {path: 'info', component: ProductEditInfoComponent},
            {path: 'tags', component: ProductEditTagsComponent}
        ]
    }
];

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        AngularMaterialModule,
        InMemoryWebApiModule.forRoot(ProductData, {delay: 1000}),
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        SearchProductComponent,
        ProductEditParentComponent,
        ProductEditInfoComponent,
        ProductEditTagsComponent
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
export class ProductsModule {

}
