import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private _authService: AuthService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean> | Promise<boolean> | boolean {
        if (!this._authService.isLoggedIn()) {
            this.router.navigate(['pages/login'], { queryParams: { returnUrl: state.url } });
        }
        return true;
    }
}