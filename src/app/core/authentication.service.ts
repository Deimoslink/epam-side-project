import {Injectable} from '@angular/core';
import {UserService} from './user.service';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService: UserService, private router: Router) { }

  public isAuthenticated(): boolean {
    return !!this.userService.getUser();
  }

  public login(login: string, password: string): void {
    this.userService.setUser({id: password, name: login});
    this.router.navigate(['']).then();
  }

  public logout(): void {
    this.userService.setUser(null);
    this.router.navigate(['/login']).then();
  }

}
