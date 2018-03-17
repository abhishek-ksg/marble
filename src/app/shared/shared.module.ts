import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConvertToSpacesPipe } from './pipes/convert-to-spaces.pipe';
import { StarComponent } from './star/star-component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ConvertToSpacesPipe,
        StarComponent
    ],
    exports: [
        ConvertToSpacesPipe,
        StarComponent,
        CommonModule,
        FormsModule
    ]
})
export class SharedModule {

}
