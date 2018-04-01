import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

    public messages: Array<string> = [];
    public messagePopupVisible: boolean = false;

    addMessage(message: string): void {
        const time = new Date();

        this.messages.unshift(`${time.toLocaleString()} ${message}`);
    }
}
