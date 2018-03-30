import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CustomerComponent } from './customerComponent/customer.component';
import { AuthGruard } from './../userLogIn/service/auth-guard.service';

const ROUTES: Array<object> = [
    {
        path: 'customer',
        component: CustomerComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        CustomerComponent
    ],
    providers: []
})
export class CustomerModule {

}
