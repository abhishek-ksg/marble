import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './userLogIn/service/auth.service';

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  webAppName = 'Amazon Product Management';

  constructor(public authService: AuthService, private router: Router) {}

  logOutUser() {
    this.authService.logOut();
    this.router.navigateByUrl('/welcome');
  }
}
