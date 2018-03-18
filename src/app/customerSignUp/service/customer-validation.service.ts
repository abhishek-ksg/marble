import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class CustomerValidationService {

    public customerFormErrMsgs = {
        'firstName': {
            'required': 'Please enter the First Name',
            'minlength': 'First Name should be atleast 3 characters long'
        },
        'lastName': {
            'required': 'Please enter the Last Name',
            'minlength': 'Last Name should be atleast 3 characters long'
        },
        'emailGroup': {
            'misMatch': 'Confirm email should match Email'
        },
        'email': {
            'required': 'Please enter the email',
            'pattern': 'Please enter a valid emailId'
        },
        'confirmEmail': {
            'required': 'Please enter the email',
            'pattern': 'Please enter a valid emailId'
        },
        'phone': {
            'required': 'Please enter your mobile number',
            'invalidMobile': 'Please enter a valid mobile number'
        },
        'rating': {
            'required': 'Please enter the product rating',
            'notANumber': 'Star Rating should be a number',
            'lowOnRange': 'Star Rating should be atleast 1',
            'outOfRange': 'Star Rating can be maximum 10'
        }
    };
    public phoneNumberValidator(c: AbstractControl): {[key: string]: boolean} | null {
        if (c.value) {
            if (/^[6-9]\d{9}$/.test(c.value)) {
                return null;
            } else {
                return {'invalidMobile': true};
            }
        }
    }

    public emailMatcher(c: AbstractControl): {[ket: string]: boolean} | null {
        const email = c.get('email');
        const confirmEmail = c.get('confirmEmail');

        if (email.pristine || confirmEmail.pristine || email.invalid || confirmEmail.invalid) {
            return null;
        }
        if (email.value === confirmEmail.value) {
            return null;
        }
        return { 'misMatch': true };
    }
}
