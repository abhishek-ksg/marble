import { ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
    public static customRangeValidator(min: number, max: number): ValidatorFn {
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

    public static phoneNumberValidator(c: AbstractControl): {[key: string]: boolean} | null {
        if (/^[6-9]\d{9}$/.test(c.value)) {
            return null;
        } else {
            return {'invalidMobile': true};
        }
    }

    public static emailMatcher(c: AbstractControl): {[ket: string]: boolean} | null {
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
