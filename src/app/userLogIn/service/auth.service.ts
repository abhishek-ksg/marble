import { Injectable } from '@angular/core';

import { MessageService } from './../../messages/messageService/message.service';
import { User } from './../model/user';

@Injectable()
export class AuthService {

    public currentUser: User = null;
    public redirectUrl: string;

    constructor(private messageService: MessageService) {}

    public logInUser(userName: string, passWord: string) {
        if (userName === 'admin') {
            this.currentUser = {
                userName: 'admin',
                isAdmin: true
            };
        } else {
            this.currentUser = {
                userName: userName,
                isAdmin: false
            };
        }
        this.messageService.addMessage(`User ${this.currentUser.userName} logged in`);
    }

    public isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    public logOut(): void {
        this.currentUser = null;
    }
}
