import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SharedModule } from './../shared/shared.module';
import { EmployeeFormComponent } from './employee-form.component';

@NgModule({
    imports: [
        SharedModule,
        BsDropdownModule,
        RouterModule.forChild([
            {path: 'employeeForm', component: EmployeeFormComponent}
        ])
    ],
    declarations: [
        EmployeeFormComponent
    ],
    exports: [
        EmployeeFormComponent
    ]
})
export class EmployeeFormModule {}