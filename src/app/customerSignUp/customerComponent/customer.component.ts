import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, FormControlName } from '@angular/forms';

import { Customer } from '../model/customer';
import { AppConstants } from '../../app.constants';
import { CustomerValidationService } from '../service/customer-validation.service';
import { NumberValidators } from '../../shared/validators/number.validators';
import { GenericValidator } from './../../shared/validators/generic.validator';

@Component({
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css'],
    providers: [CustomerValidationService]
})
export class CustomerComponent implements OnInit, AfterViewInit {

    public customer: Customer = new Customer();
    public signUpForm: FormGroup;
    public errMsg: {[key: string]: string} = {};

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    private custmerFormErrMsgs: {[key: string]: {[key: string]: string}};
    private genericValidator: GenericValidator;

    // FormControls
    private email: FormControl;
    private confirmEmail: FormControl;
    private phone: FormControl;

    constructor(public fb: FormBuilder, private validationService: CustomerValidationService) {

        this.custmerFormErrMsgs = this.validationService.customerFormErrMsgs;
        this.genericValidator = new GenericValidator(this.custmerFormErrMsgs);
    }

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
            rating: ['', [ Validators.required, NumberValidators.rangeValidator(1, 10) ] ],
            sendCatalog: false,
            addresses: this.fb.array([this.getAddressBlock()])
        });

        const notificationType = this.signUpForm.get('notificationType');
        notificationType.valueChanges.subscribe( (value: string) => this.notificationTypeChanged(value) );
    }

    ngAfterViewInit() {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.signUpForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.errMsg = this.genericValidator.processMessages(this.signUpForm);
        });
    }

    get addresses(): FormArray {
        return <FormArray>this.signUpForm.get('addresses');
    }

    fetchDefault() {
        this.signUpForm.setValue({
            firstName: 'Abhishek',
            lastName: 'Jain',
            emailGroup: {
                email: 'abc@xyz',
                confirmEmail: 'abc@xyz'
            },
            phone: '9957608288',
            notificationType: 'email',
            rating: 3.5,
            sendCatalog: true,
            addresses: this.setDefaultAddress()
        });
    }

    submitSignUpForm() {
        alert('Dude!!');
    }

    addAddress() {
        this.addresses.push(this.getAddressBlock());
    }

    private notificationTypeChanged(value: string) {
        this.phone = <FormControl>this.signUpForm.get('phone');
        this.email = <FormControl>this.signUpForm.get('emailGroup.email');
        this.confirmEmail = <FormControl>this.signUpForm.get('emailGroup.confirmEmail');

        if (value === 'phone') {
            this.phone.setValidators( [Validators.required, this.validationService.phoneNumberValidator] );
            this.email.clearValidators();
            this.confirmEmail.clearValidators();
            this.signUpForm.get('emailGroup').clearValidators();

        } else if (value === 'email') {
            this.email.setValidators([Validators.required,
                Validators.pattern(AppConstants.EMAIL_PATTERN) ]);
            this.confirmEmail.setValidators([Validators.required,
                Validators.pattern(AppConstants.EMAIL_PATTERN) ]);
            this.signUpForm.get('emailGroup').setValidators(this.validationService.emailMatcher);
            this.phone.clearValidators();
        }
        this.phone.updateValueAndValidity();
        this.email.updateValueAndValidity();
        this.confirmEmail.updateValueAndValidity();
        this.signUpForm.get('emailGroup').updateValueAndValidity();
    }

    private getAddressBlock() {
        return this.fb.group({
            addressType: 'home',
            street1: ['', Validators.required],
            street2: '',
            city: '',
            state: '',
            zip: ''
        });
    }

    private setDefaultAddress(): Array<any> {
        const defaultAddress = [];
        for (let i = 0; i < this.addresses.length; i++) {
            defaultAddress.push({
                addressType: 'office',
                street1: 'Ganpati Nawas',
                street2: 'Bangur Nagar',
                city: 'Mumbai',
                state: 'MAH',
                zip: '305801'
            });
        }
        return defaultAddress;
    }
}

