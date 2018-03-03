import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { ProductService } from "./services/product.service";
import { ProductListComponent } from "./products-list/product-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports: [
        HttpClientModule,
        SharedModule
    ],
    declarations: [
        ProductListComponent
    ],
    providers: [
        ProductService

    ]

})
export class ProdusctsModule {

}