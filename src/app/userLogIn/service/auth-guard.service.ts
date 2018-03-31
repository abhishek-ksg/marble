import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGruard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    private checkLoggedIn(url: string): boolean {
        if ( this.authService.isLoggedIn() ) {
            return true;
        }

        // Retain the attempted url for redirection
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
