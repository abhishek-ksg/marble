import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customerComponent/customer.component';

const ROUTES: Array<object> = [
    {path: 'customer', component: CustomerComponent}
];

@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        CustomerComponent
    ],
    providers: []
})
export class CustomerModule {

}
