import { Component } from '@angular/core';

@Component({
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
    pageTitle: string = 'Welcome';
    welcomeMessage: string = 'Welcome to Amazon Product Management!';
}
