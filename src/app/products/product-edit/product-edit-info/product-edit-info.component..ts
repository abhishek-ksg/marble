import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Component, ViewChildren, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { NumberValidators } from './../../../shared/validators/number.validators';
import { GenericValidator } from './../../../shared/validators/generic.validator';
import { IProduct } from './../../models/product.interface';

@Component({
    templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit, AfterViewInit {
    productInfoForm: FormGroup;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    errMsg: {[key: string]: string} = {};
    product: IProduct;

    private validationErrMsgs: {[key: string]: {[key: string]: string}};
    private genericValidator: GenericValidator;
    private sub: Subscription;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute) {
        this.validationErrMsgs = {
            'productName': {
                'required': 'Please enter the product name',
                'minlength': 'Product Name should contains atleast 3 characters',
            },
            'productCode': {
                'required': 'Please enter the product code'
            },
            'starRating': {
                'required': 'Please enter the product rating',
                'notANumber': 'Star Rating should be a number',
                'lowOnRange': 'Star Rating should be atleast 1',
                'outOfRange': 'Star Rating can be maximum 5'
            }
        };

        this.genericValidator = new GenericValidator(this.validationErrMsgs);
    }

    ngOnInit() {
        this.productInfoForm = this.fb.group({
            productName: ['', [Validators.required,
                                Validators.minLength(3)]],
            productCode: ['', [Validators.required]],
            starRating: ['', [Validators.required, NumberValidators.rangeValidator(1, 5)]],
            description: ''
        });

        this.route.parent.data.subscribe( (data) => {
            this.onProductDataReceived(data['product']);
        });
    }

    ngAfterViewInit() {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.productInfoForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.errMsg = this.genericValidator.processMessages(this.productInfoForm);
            // Updating the product object
            Object.assign(this.product, this.productInfoForm.value);
        });
    }

    private onProductDataReceived(product: IProduct): void {
        if (this.productInfoForm) {
            this.productInfoForm.reset();
        }

        this.product = product;

        this.productInfoForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        });
    }
}
