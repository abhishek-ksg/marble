import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmployeeModel } from './employee.model';
import { EmployeeFormService } from './employee-form.service';

@Component({
    templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {

    invalidLanguage: boolean = false;

    languages: Array<string> = []; // ['JavaScript', 'Python', 'Java'];

    emp: EmployeeModel = new EmployeeModel('abhishek', 'jain', true, 'usd', 'Default');

    constructor(private formService: EmployeeFormService) {}

    checkforvalidation() {
        this.invalidLanguage = this.emp.language.toLocaleLowerCase() === 'default';
    }

    submitForm(empForm: NgForm) {
        // Form level validation
        this.checkforvalidation();
        if (this.invalidLanguage) {
            return;
        }
        this.formService.postEmployeeForm(this.emp)
            .subscribe(
                (data) => console.log('Success:: ' + data),
                (err) => console.log('Failure: ' + err)
        );
    }

    ngOnInit() {
        this.formService.getLanguages()
            .subscribe(
                (data) => this.setLanguage(data),
                (err) => console.log('error in getting the languages')
            );
    }

    private setLanguage(data: any) {
        console.log(data.languages.length);
        this.languages = data.languages;
    }
}
