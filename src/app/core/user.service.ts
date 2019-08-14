import {Injectable} from '@angular/core';
import {User} from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User | null = {id: 'string', name: 'string'};

  constructor() {}

  public setUser(user: User | null) {
    this.user = user;
  }

  public getUser(): User | null {
    return this.user;
  }

}
