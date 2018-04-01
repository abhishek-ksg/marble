import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { MessageComponent } from './messageComponent/message.component';
import { SharedModule } from './../shared/shared.module';
import { MessageService } from './messageService/message.service';

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
    providers: [
        MessageService
    ]
})
export class MessageModule {

}
