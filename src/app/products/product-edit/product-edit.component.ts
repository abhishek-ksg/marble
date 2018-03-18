import { Observable } from 'rxjs/Observable';
import { NumberValidators } from './../../shared/validators/number.validators';
import { FormGroup, FormBuilder, FormArray, FormControlName, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { GenericValidator } from '../../shared/validators/generic.validator';

@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit, AfterViewInit {

    productForm: FormGroup;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    displayMessage: {[key: string]: string} = {};

    private validationErrMsgs: {[key: string]: {[key: string]: string}};
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder) {
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
}
