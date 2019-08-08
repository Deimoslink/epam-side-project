import {Component} from '@angular/core';
import {AuthenticationService} from './core/authentication.service';

@Component({
  selector: 'esp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public logout(): void {
    this.authenticationService.logout();
  }

  constructor(private authenticationService: AuthenticationService) { }


}
