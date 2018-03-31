import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SharedModule } from './../shared/shared.module';
import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeFormService } from './employee-form.service';
import { AngularMaterialModule } from '../angularmaterial/angularmaterial.module';
import { AuthGruard } from './../userLogIn/service/auth-guard.service';

const ROUTES: Array<object> = [
    {
        path: 'employeeForm',
        canActivate: [AuthGruard],
        component: EmployeeFormComponent
    }
];

@NgModule({
    imports: [
        SharedModule,
        BsDropdownModule,
        HttpModule,
        AngularMaterialModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        EmployeeFormComponent
    ],
    exports: [
        EmployeeFormComponent
    ],
    providers: [
        EmployeeFormService
    ]
})
export class EmployeeFormModule {}
