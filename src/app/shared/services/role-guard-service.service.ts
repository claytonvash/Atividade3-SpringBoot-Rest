import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const token = JSON.parse(localStorage.getItem('token')).token;

    const tokenPayLoad = decode(token);

    if (!this.auth.isAuthenticated() || tokenPayLoad.role !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
