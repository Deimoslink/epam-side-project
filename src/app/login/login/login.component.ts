import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../core/authentication.service';

@Component({
  selector: 'esp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  public logIn(login: string, password: string) {
    this.authenticationService.login(login, password)
  }

  ngOnInit() {
  }

}
