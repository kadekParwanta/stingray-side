import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoopBackConfig } from '../app/shared/sdk';

/*
  Generated class for the ChatService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ChatService {
  private socket;
  private credentials;

  constructor(public http: Http) {
    console.log('Hello ChatService Provider' + LoopBackConfig.getPath());
    this.socket = io.connect(LoopBackConfig.getPath());
  }

  authenticate(credentials) {
    this.credentials = credentials;
    this.socket = io.connect(LoopBackConfig.getPath());
    this.socket.on("connect", () => this.connect());
    this.socket.on("authenticated", () => {
      console.log('authenticated');
    });
  }

  connect() {
    console.log(`connecting to "${LoopBackConfig.getPath()}"`);
    // Request initial list when connected
    this.socket.emit("authentication", this.credentials);
  }

  sendMessage(message) {
    this.socket.emit('add-message', {text:message, username:this.credentials.username});
  }

  getMessages(id) {
    let observable = new Observable(observer => {
      var name = '/add-message/'+id;
      this.socket.on(name, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  disconnect() {
    this.socket.disconnect();
  }

}
