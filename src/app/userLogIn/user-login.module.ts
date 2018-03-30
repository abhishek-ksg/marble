import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserLoginComponent } from './userLoginComponent/user-login.component';
import { SharedModule } from './../shared/shared.module';


const ROUTES: Array<object> = [{path: 'login', component: UserLoginComponent}];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        UserLoginComponent
    ],
    providers: []
})
export class UserLoginModule {

}
