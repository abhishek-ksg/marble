import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatProgressSpinnerModule
    ],
    declarations: [
    ],
    exports: [
        BrowserAnimationsModule,
        MatProgressSpinnerModule
    ]
})
export class AngularMaterialModule {

}
