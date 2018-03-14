import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customerComponent/customer.component';

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path: 'customer', component: CustomerComponent}
        ])
    ],
    declarations: [
        CustomerComponent
    ],
    providers: []
})
export class CustomerModule {

}
