import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Customer } from '../model/customer';
import { AppConstants } from '../../app.constants';
import { CustomerValidationService } from '../service/customer-validation.service';

@Component({
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css'],
    providers: [CustomerValidationService]
})
export class CustomerComponent implements OnInit {

    public customer: Customer = new Customer();
    public signUpForm: FormGroup;

    // FormControls
    private firstName: FormControl;
    private lastName: FormControl;
    private email: FormControl;
    private confirmEmail: FormControl;
    private phone: FormControl;
    private rating: FormControl;

    // FormControlsError
    public firstNameErrorMsg: string = '';
    public lastNameErrorMsg: string = '';
    public emailErrorMsg: string = '';
    public confirmEmailErrorMsg: string = '';
    public phoneErrorMsg: string = '';
    public ratingErrorMsg: string = '';

    constructor(public fb: FormBuilder, private validationService: CustomerValidationService) { }

    ngOnInit() {
        this.signUpForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.required, Validators.minLength(3)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required, Validators.pattern(AppConstants.EMAIL_PATTERN)]],
                confirmEmail: ['', [Validators.required, Validators.pattern(AppConstants.EMAIL_PATTERN)]],
            }, {validator: this.validationService.emailMatcher}),
            phone: '',
            notificationType: 'email',
            rating: ['', [ Validators.required, this.validationService.customRangeValidator(1, 10) ] ],
            sendCatalog: false
        });

        const notificationType = this.signUpForm.get('notificationType');
        notificationType.valueChanges.subscribe( (value: string) => this.notificationTypeChanged(value) );

        this.firstName = <FormControl>this.signUpForm.get('firstName');
        this.firstName.valueChanges.debounceTime(500).subscribe( (value: string) => this.setValidateNameMsg(value, 'firstName'));

        this.lastName = <FormControl>this.signUpForm.get('lastName');
        this.lastName.valueChanges.debounceTime(500).subscribe( (value: string) => this.setValidateNameMsg(value, 'lastName'));

        this.email = <FormControl>this.signUpForm.get('emailGroup.email');
        this.email.valueChanges.debounceTime(500).subscribe( (value: string) => this.setValidateMailMsg(value, 'email'));

        this.confirmEmail = <FormControl>this.signUpForm.get('emailGroup.confirmEmail');
        this.confirmEmail.valueChanges.debounceTime(500).subscribe( (value: string) => this.setValidateMailMsg(value, 'confirmEmail'));

        this.phone = <FormControl>this.signUpForm.get('phone');
        this.phone.valueChanges.debounceTime(500).subscribe( (value: string) => this.setPhoneErrMsg(value));

        this.rating = <FormControl>this.signUpForm.get('rating');
        this.rating.valueChanges.debounceTime(500).subscribe( (value: string) => this.setRatingErrMsg(value));

    }

    fetchDefault() {
        this.signUpForm.setValue({
            firstName: 'Abhishek',
            lastName: 'Jain',
            email: 'abc@xyz',
            confirmEmail: 'abc@xyz',
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
            this.phone.setValidators( [Validators.required, this.validationService.phoneNumberValidator] );
            this.email.clearValidators();
            this.confirmEmail.clearValidators();

        } else if (value === 'email') {
            this.email.setValidators([Validators.required,
                Validators.pattern(AppConstants.EMAIL_PATTERN) ]);
            this.confirmEmail.setValidators([Validators.required,
                Validators.pattern(AppConstants.EMAIL_PATTERN) ]);
            this.phone.clearValidators();
        }
        this.phone.updateValueAndValidity();
        this.email.updateValueAndValidity();
        this.confirmEmail.updateValueAndValidity();
    }

    private setValidateNameMsg(value: string, controlType: string) {
        if (controlType === 'firstName') {
            this.firstNameErrorMsg = this.validationService.validateName(this.firstName, value);
        } else if (controlType === 'lastName') {
            this.lastNameErrorMsg = this.validationService.validateName(this.lastName, value);
        }
    }

    private setValidateMailMsg(value: string, controlType: string) {
        if (controlType === 'email') {
            this.emailErrorMsg = this.validationService.validateEmail(this.email, value);
        } else if (controlType === 'confirmEmail') {
            this.confirmEmailErrorMsg = this.validationService.validateEmail(this.confirmEmail, value);
        }
    }

    private setPhoneErrMsg(value: string) {
        this.phoneErrorMsg = this.validationService.setPhoneErrMsg(this.phone, value);
    }

    private setRatingErrMsg(value: string) {
        this.ratingErrorMsg = this.validationService.setRatingErrMsg(this.rating, value);
    }
}

