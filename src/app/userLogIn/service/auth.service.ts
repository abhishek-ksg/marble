import { User } from './../model/user';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    public currentUser: User = null;
    public redirectUrl: string;

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
    }

    public isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    public logOut(): void {
        this.currentUser = null;
    }
}
