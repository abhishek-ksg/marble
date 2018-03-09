import { EmployeeModel } from './employee.model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {

    languages: Array<string> = ["JavaScript", "Python", "Java"];

    emp: EmployeeModel = new EmployeeModel("abhishek", "jain", true, 'usd', "Default");
}