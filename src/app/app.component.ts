import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './userLogIn/service/auth.service';

@Component({
  selector: 'am-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  webAppName = 'Amazon Product Management';
  routeLoading: boolean = true;

  constructor(public authService: AuthService, private router: Router) {
    this.router.events.subscribe( (routeEvent: Event) => {
      if (routeEvent instanceof NavigationStart) {
        this.routeLoading = true;
      } else if ( (routeEvent instanceof NavigationEnd) ||
                  (routeEvent instanceof NavigationError) ||
                  (routeEvent instanceof NavigationCancel)) {
        this.routeLoading = false;
      }
    });
  }

  logOutUser() {
    this.authService.logOut();
    this.router.navigateByUrl('/welcome');
  }
}
