import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Customer } from '../model/customer';


@Component({
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    public cusstomer: Customer = new Customer();
    public signUpForm: FormGroup;

    constructor(public fb: FormBuilder) { }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            firstName: '',
            lastName: '',
            email: '',
            confirmMail: '',
            phone: '',
            notificationType: '',
            rating: '',
            sendCatalog: false
        });
    }

}
