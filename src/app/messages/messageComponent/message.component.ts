import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { MessageService } from './../messageService/message.service';

@Component({
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    constructor(private router: Router, public messageService: MessageService) { }

    close(): void {
        this.messageService.messagePopupVisible = false;
        // Clearing the seconday route
        this.router.navigate([{outlets: {popup: null}}]);
    }
}
