import { Injectable } from '@angular/core';

@Injectable()
export class LogInValidationService {

    public loginFormErrMsgs = {
        'userName': {
            'required': 'Please enter the User Name',
        },
        'passWord': {
            'required': 'Please enter the Password',
        }
    };
}
