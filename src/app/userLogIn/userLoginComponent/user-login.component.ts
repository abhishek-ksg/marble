import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChildren, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { GenericValidator } from './../../shared/validators/generic.validator';
import { LogInValidationService } from './../service/logIn-validation.service';
import { AuthService } from '../service/auth.service';

@Component({
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css'],
    providers: [LogInValidationService]
})
export class UserLoginComponent implements OnInit, AfterViewInit {

    public logInForm: FormGroup;
    public errMsg: {[key: string]: string} = {};
    public errorMessage: string;

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    private custmerFormErrMsgs: {[key: string]: {[key: string]: string}};
    private genericValidator: GenericValidator;

    constructor(public fb: FormBuilder, private validationService: LogInValidationService,
                private authService: AuthService, private router: Router) {

        this.custmerFormErrMsgs = this.validationService.loginFormErrMsgs;
        this.genericValidator = new GenericValidator(this.custmerFormErrMsgs);
    }

    ngOnInit() {
        this.logInForm = this.fb.group({
            userName: ['', [Validators.required]],
            passWord: ['', [Validators.required]],
        });
    }

    ngAfterViewInit() {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.logInForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.errMsg = this.genericValidator.processMessages(this.logInForm);
        });
    }

    submitLoginForm() {
        if (this.logInForm && this.logInForm.valid) {
            const userName = this.logInForm.get('userName').value;
            const passWord = this.logInForm.get('passWord').value;

            this.authService.logInUser(userName, passWord);

            if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
            } else {
                this.router.navigate(['/products']);
                // this.router.navigate([{outlets: {
                //     primary: ['/products'],
                //     popup: ['messages']
                // }}]);
            }
        } else {
            this.errorMessage = 'Invalid User Name and Password';
        }
    }


}
