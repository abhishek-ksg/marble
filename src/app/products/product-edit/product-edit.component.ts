import { IProduct } from './../models/product.interface';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { NumberValidators } from './../../shared/validators/number.validators';
import { FormGroup, FormBuilder, FormArray, FormControlName, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { GenericValidator } from '../../shared/validators/generic.validator';
import { Subscription } from 'rxjs/Subscription';

import { ProductService } from './../services/product.service';

@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit {

    productForm: FormGroup;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    displayMessage: {[key: string]: string} = {};
    productDataErr: string;
    pageTitle: string = 'Add Product';
    product: IProduct;

    private validationErrMsgs: {[key: string]: {[key: string]: string}};
    private genericValidator: GenericValidator;
    private sub: Subscription;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private productService: ProductService) {
        this.validationErrMsgs = {
            'productName': {
                'required': 'Please enter the product name',
                'minlength': 'Product Name should contains atleast 3 characters',
                'maxlength': 'Product Name should contains less than 3 characters'
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

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }

    ngOnInit() {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required,
                                Validators.minLength(3),
                                Validators.maxLength(50)]],
            productCode: ['', [Validators.required]],
            starRating: ['', [Validators.required, NumberValidators.rangeValidator(1, 5)]],
            tags: this.fb.array([]),
            description: ''
        });

        this.sub = this.route.paramMap.subscribe( (params: ParamMap) => {
            const productId = +params.get('id');
            this.getProductData(productId);
        });
    }

    ngAfterViewInit() {
        // Watch for the blur event from any input element on the form.
        const controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.displayMessage = this.genericValidator.processMessages(this.productForm);
        });
    }

    addNewTag() {
        this.tags.push(new FormControl('', Validators.required));
    }

    private getProductData(productId: number): void {
        this.productService.getProductData(productId)
            .subscribe( (product: IProduct) => this.onProductDataReceived(product),
                        ( error: any ) => this.productDataErr = <any>error);
    }

    private onProductDataReceived(product: IProduct): void {
        if (this.productForm) {
            this.productForm.reset();
        }

        this.product = product;

        if (this.product.id === 0) {
            this.pageTitle = 'Add Product';
        } else {
            this.pageTitle = 'Edit Product: ' + this.product.productName;
        }

        this.productForm.patchValue({
            productName: this.product.productName,
            productCode: this.product.productCode,
            starRating: this.product.starRating,
            description: this.product.description
        });

        // Replace the existing tags AbstractControl
        this.productForm.setControl('tags', this.fb.array(this.product.tags || []));

        this.productDataErr = '';
    }
}
