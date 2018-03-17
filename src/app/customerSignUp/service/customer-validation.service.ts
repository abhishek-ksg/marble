import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class CustomerValidationService {

    private requiredAndMinLength3ErrorMsg: Object = {
        required: 'This field is required',
        minlength: 'Minimum 3 characters required'
    };

    private requiredAndInvalidEmailMsg: Object = {
        required: 'This field is required',
        pattern: 'Invalid email Id'
    };

    private requiredAndInvalidPhoneMsg: Object = {
        required: 'Please enter your phone number.',
        invalidMobile: 'Please enter a valid mobile number.'
    };

    private requiredAndInvalidRatingMsg: Object = {
        required: 'Please enter rating.',
        notANumber: 'Please enter number only.',
        lowOnRange: 'Please enter rating >= 1.',
        outOfRange: 'Please enter rating <= 10.'
    };

    public validateName(fc: FormControl, value: string): string {
        let firstNameErrorMsg = '';
        if ( (fc.touched || fc.dirty ) && fc.errors ) {
            firstNameErrorMsg = Object.keys(fc.errors).map( (error) =>
                this.requiredAndMinLength3ErrorMsg[error]).join(', ');
        }
        return firstNameErrorMsg;
    }

    public validateEmail(fc: FormControl, value: string): string {
        let emailErrorMsg = '';
        if ( (fc.touched || fc.dirty ) && fc.errors ) {
            emailErrorMsg = Object.keys(fc.errors).map( (error) =>
                this.requiredAndInvalidEmailMsg[error]).join(',');
        }
        return emailErrorMsg;
    }

    public setPhoneErrMsg(fc: FormControl, value: string): string {
        let phoneErrorMsg = '';
        if ( (fc.touched || fc.dirty ) && fc.errors ) {
            phoneErrorMsg = Object.keys(fc.errors).map( (error) =>
                this.requiredAndInvalidPhoneMsg[error]).join(',');
        }
        return phoneErrorMsg;
    }

    public setRatingErrMsg(fc: FormControl, value: string): string {
        let ratingErrorMsg = '';
        if ( (fc.touched || fc.dirty ) && fc.errors ) {
            ratingErrorMsg = Object.keys(fc.errors).map( (error) =>
                this.requiredAndInvalidRatingMsg[error]).join(',');
        }
        return ratingErrorMsg;
    }

    public customRangeValidator(min: number, max: number): ValidatorFn {
        return function(c: AbstractControl): {[key: string]: boolean} | null {
            const value = c.value;
            if (value) {
                if (isNaN(value)) {
                    return {'notANumber': true};
                } else if (value < min) {
                    return {'lowOnRange' : true};
                } else if (value > max) {
                    return {'outOfRange': true};
                } else {
                    return null;
                }
            }
        };
    }

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
