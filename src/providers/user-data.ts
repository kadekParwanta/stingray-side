import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {User} from '../app/shared/sdk';

/*
  Generated class for the UserData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage
    ) {
    console.log('Hello UserData Provider');
  }

  hasFavorite(sessionName: string) {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string) {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string) {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  user(user:User) {
    this.storage.set('userdata',user);
  }

  getUser() {
    return this.storage.get('userdata').then((value) => {
      return value;
    });
  };

  login(username: string, password: string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setCredentials(username, password);
    this.events.publish('user:login');
  };

  signup(username: string, password: string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.setCredentials(username, password);
    this.events.publish('user:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('userdata');
    this.storage.remove('credentials');
    this.events.publish('user:logout');
  };

  setUsername(username: string) {
    this.storage.set('username', username);
  };

  setCredentials(username: string ,password: string) {
    this.storage.set('credentials', {username:username, password:password});
  }

  getCredentials() {
    return this.storage.get('credentials').then((value) => {
      return value;
    });
  };

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };
  
  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
