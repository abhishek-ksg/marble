import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserLoginComponent } from './userLoginComponent/user-login.component';
import { SharedModule } from './../shared/shared.module';
import { AuthService } from './service/auth.service';


const ROUTES: Array<object> = [{path: 'login', component: UserLoginComponent}];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        UserLoginComponent
    ],
    providers: [
        AuthService
    ]
})
export class UserLoginModule {

}
