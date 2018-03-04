import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "./shared/shared.module";
import { WelcomeComponent } from "./welcome/welcome.component";


@NgModule({

    imports: [
        SharedModule,
        RouterModule.forRoot([
            {path: 'welcome', component: WelcomeComponent},
            {path: '', redirectTo: 'welcome', pathMatch: 'full'},
            {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouteModule {}