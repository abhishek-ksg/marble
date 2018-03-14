import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer } from '../model/customer';
import { AppConstants } from '../../app.constants';

@Component({
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

    public customer: Customer = new Customer();
    public signUpForm: FormGroup;

    constructor(public fb: FormBuilder) { }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.pattern(AppConstants.EMAIL_PATTERN)]],
            confirmMail: ['', [Validators.required, Validators.pattern(AppConstants.EMAIL_PATTERN)]],
            phone: '',
            notificationType: 'email',
            rating: ['', Validators.required],
            sendCatalog: false
        });

        const notificationType = this.signUpForm.get('notificationType');
        notificationType.valueChanges.subscribe( (value: string) => this.notificationTypeChanged(value) );
    }

    fetchDefault() {
        this.signUpForm.setValue({
            firstName: 'Abhishek',
            lastName: 'Jain',
            email: 'abc@xyz',
            confirmMail: 'abc@xyz',
            phone: '9957608288',
            notificationType: 'email',
            rating: 3.5,
            sendCatalog: true
        });
    }

    submitSignUpForm() {
        alert('Dude!!');
    }

    private notificationTypeChanged(value: string) {
        if (value === 'phone') {
            this.signUpForm.get('phone').setValidators(Validators.required);
            this.signUpForm.get('email').clearValidators();

        } else if (value === 'email') {
            this.signUpForm.get('email').setValidators([Validators.required, Validators.pattern(AppConstants.EMAIL_PATTERN) ]);
            this.signUpForm.get('phone').clearValidators();
        }
        this.signUpForm.get('phone').updateValueAndValidity();
        this.signUpForm.get('email').updateValueAndValidity();
    }
}

