import {Injectable} from '@angular/core';
import {UserView} from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: UserView | null = {id: 'string', name: 'string'};

  constructor() {}

  public setUser(user: UserView | null) {
    this.user = user;
  }

  public getUser(): UserView | null {
    return this.user;
  }

}
