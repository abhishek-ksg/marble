import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericValidator } from './../../../shared/validators/generic.validator';
import { IProduct } from './../../models/product.interface';
import { FormGroup, FormControlName, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Component, ViewChildren, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
    templateUrl: './product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit, AfterViewInit {
    productTagForm: FormGroup;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    errMsg: {[key: string]: string} = {};
    product: IProduct;

    private validationErrMsgs: {[key: string]: {[key: string]: string}};
    private genericValidator: GenericValidator;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute) {
        this.validationErrMsgs = {
            'category': {
                'required': 'Please enter the Product Category',
                'minlength': 'Product Category should contains atleast 3 characters',
            }
        };

        this.genericValidator = new GenericValidator(this.validationErrMsgs);
    }

    get tags(): FormArray {
        return <FormArray>this.productTagForm.get('tags');
    }

    ngOnInit() {
        this.productTagForm = this.fb.group({
            category: ['', [Validators.required,
                                Validators.minLength(3)]],
            tags: this.fb.array([])
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
        Observable.merge(this.productTagForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
            this.errMsg = this.genericValidator.processMessages(this.productTagForm);
            Object.assign(this.product, this.productTagForm.value);
        });
    }

    addNewTag() {
        this.tags.push(new FormControl('', Validators.required));
    }

    deleteTag(i: number): void {
        this.product.tags = this.tags.value;
        this.product.tags.splice(i, 1);
        this.productTagForm.setControl('tags', this.fb.array(this.product.tags));
        this.tags.markAsDirty();
    }

    private onProductDataReceived(product: IProduct): void {
        if (this.productTagForm) {
            this.productTagForm.reset();
        }

        this.product = product;

        this.productTagForm.patchValue({
            category: this.product.category
        });

        // Replace the existing tags AbstractControl
        this.productTagForm.setControl('tags', this.fb.array(this.product.tags || []));
    }
}
