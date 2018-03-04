import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { ProductService } from "./services/product.service";
import { ProductListComponent } from "./products-list/product-list.component";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductDetailGuardService } from "./services/product-detail-guard.service";

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule,
        RouterModule.forChild([
            {path: 'products', component: ProductListComponent},
            {path: 'products/:id', canActivate: [ProductDetailGuardService], component: ProductDetailComponent}
        ])
    ],
    declarations: [
        ProductListComponent,
        ProductDetailComponent
    ],
    providers: [
        ProductService,
        ProductDetailGuardService

    ]

})
export class ProdusctsModule {

}