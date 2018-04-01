import { MessageComponent } from './messageComponent/message.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: 'messages',
                component: MessageComponent,
                outlet: 'popup'
            }
        ])
    ],
    declarations: [
        MessageComponent
    ],
    providers: []
})
export class MessageModule {

}
