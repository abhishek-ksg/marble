import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {

    productForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    get tags(): FormArray {
        return <FormArray>this.productForm.get('tags');
    }

    ngOnInit() {
        this.productForm = this.fb.group({
            productName: '',
            productCode: '',
            starRating: '',
            tags: this.fb.array([]),
            description: ''
        });
    }

    addNewTag() {
        this.tags.push(new FormControl());
    }
}
