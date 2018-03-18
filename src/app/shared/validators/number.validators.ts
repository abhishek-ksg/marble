import { ValidatorFn, AbstractControl } from '@angular/forms';

export class NumberValidators {
    public static rangeValidator(min: number, max: number): ValidatorFn {
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

}
