import {Component} from '@angular/core';
import {AuthenticationService} from './core/authentication.service';

@Component({
  selector: 'tdct-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public data = [
    {
      title: 'Home',
      link: ''
    },
    {
      title: 'Projects',
      items: [
        {title: 'Projects Management', link: 'projects-management'},
        {title: 'Business Entities', link: 'business-entities'}
      ]
    }
  ];


  public logout(): void {
    this.authenticationService.logout();
  }

  constructor(private authenticationService: AuthenticationService) { }


}
