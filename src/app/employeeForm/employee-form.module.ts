import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


import { SharedModule } from './../shared/shared.module';
import { EmployeeFormComponent } from './employee-form.component';
import { EmployeeFormService } from './employee-form.service';
import { AngularMaterilModule } from '../angularmaterial/angularmaterial.module';


@NgModule({
    imports: [
        SharedModule,
        BsDropdownModule,
        HttpModule,
        AngularMaterilModule,
        RouterModule.forChild([
            {path: 'employeeForm', component: EmployeeFormComponent}
        ])
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