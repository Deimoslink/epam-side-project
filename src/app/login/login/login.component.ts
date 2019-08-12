import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../core/authentication.service';

@Component({
  selector: 'esp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(private authenticationService: AuthenticationService) { }

  public logIn(login: string, password: string) {
    this.authenticationService.login(login, password)
  }

  ngOnInit() {
  }

}
