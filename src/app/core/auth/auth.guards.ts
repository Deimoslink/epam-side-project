import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';


@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  public canActivate() {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']).then();
      return false;
    }
  };

  public canLoad = this.canActivate;

}

@Injectable({
  providedIn: 'root'
})
export class LoggedOutGuard implements CanLoad, CanActivate {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  public canActivate() {
    if (!this.authenticationService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']).then();
      return false;
    }
  }

  public canLoad = this.canActivate;

}
