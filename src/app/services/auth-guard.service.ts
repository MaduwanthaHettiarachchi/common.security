import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
     private jwtHelper: JwtHelperService,
    private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.authenticationService.isLoggedIn()) {

      //if token is expired, then need to refresh token
       console.log(this.jwtHelper.isTokenExpired(this.authenticationService.getToken()))
       console.log(this.jwtHelper.getTokenExpirationDate(this.authenticationService.getToken()))
      if (this.jwtHelper.isTokenExpired(this.authenticationService.getToken())) {
        this.authenticationService.refreshToken(
          {
            RefreshToken: this.authenticationService.getRefreshToken()
          }
        ).subscribe(res => {
          if (res.accessToken) {
            localStorage.setItem('token', res.accessToken);
            localStorage.setItem('refreshtoken', res.refreshToken);
            return true;
          }
          else {
            return false;
          }
        })
     }

      return true;
    }

  //  this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url } });
    return false
  }
}
