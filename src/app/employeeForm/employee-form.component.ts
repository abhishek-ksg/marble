import { EmployeeModel } from './employee.model';
import { Component } from '@angular/core';

@Component({
    templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent {

    invalidLanguage: boolean = false;

    languages: Array<string> = ["JavaScript", "Python", "Java"];

    emp: EmployeeModel = new EmployeeModel("abhishek", "jain", true, 'usd', "Default");

    checkforvalidation() {
        this.invalidLanguage = this.emp.language.toLocaleLowerCase() === "default"
    }
}