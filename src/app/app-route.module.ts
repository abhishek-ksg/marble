import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './userLogIn/service/auth-guard.service';

const ROUTES: Array<object> = [
    {path: 'welcome', component: WelcomeComponent},
    {
        path: 'products',
        canActivate: [ AuthGuard ],
        // data: { preload: true },
        loadChildren: 'app/products/products.module#ProductsModule'
    },
    {path: '', redirectTo: 'welcome', pathMatch: 'full'},
    {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
];

@NgModule({

    imports: [
        SharedModule,
        RouterModule.forRoot(ROUTES, { enableTracing: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouteModule {}
