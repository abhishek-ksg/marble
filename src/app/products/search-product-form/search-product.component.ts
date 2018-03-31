import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChildren, ElementRef, OnInit, AfterViewInit } from '@angular/core';

import { GenericValidator } from './../../shared/validators/generic.validator';
import { SearchProductValidationService } from './../services/search-product-validation.service';

@Component({
    templateUrl: './search-product.component.html'
})
export class SearchProductComponent implements OnInit, AfterViewInit {

    public searchForm: FormGroup;
    public errMsg: {[key: string]: string} = {};

    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    private custmerFormErrMsgs: {[key: string]: {[key: string]: string}};
    private genericValidator: GenericValidator;

    constructor(public fb: FormBuilder,
                private validationService: SearchProductValidationService,
                private router: Router) {

        this.custmerFormErrMsgs = this.validationService.searchProductFormErrMsgs;
        this.genericValidator = new GenericValidator(this.custmerFormErrMsgs);
    }

    ngOnInit() {
        this.searchForm = this.fb.group({
            productName: ['', [Validators.minLength(2)]],
            productCode: ['', [Validators.minLength(2)]],
            productTag: ['', [Validators.minLength(2)]]
        });
    }

    ngAfterViewInit() {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.searchForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.errMsg = this.genericValidator.processMessages(this.searchForm);
        });
    }

    submitSearchForm(): void {
        const productName: string = this.searchForm.get('productName').value;
        const productCode: string = this.searchForm.get('productCode').value;
        const productTag: string = this.searchForm.get('productTag').value;

        this.router.navigate(['/products', {
                                                'productName': productName,
                                                'productCode': productCode,
                                                'productTag': productTag
                                            }
                            ]);
    }
}
