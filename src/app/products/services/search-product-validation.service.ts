import { Injectable } from '@angular/core';

@Injectable()
export class SearchProductValidationService {
    public searchProductFormErrMsgs = {
        'productName': {
            'minlength': 'Product Name should be atleast 2 characters long'
        },
        'productCode': {
            'minlength': 'Last Name should be atleast 2 characters long'
        },
        'productTag': {
            'minlength': 'Tag Name should be atleast 2 characters long'
        }
    };
}
