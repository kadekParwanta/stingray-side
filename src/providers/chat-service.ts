import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { LoopBackConfig } from '../app/shared/sdk';
import { Message, Room } from '../app/shared/sdk/models';
import { MessageApi, RoomApi } from '../app/shared/sdk/services';
import { Events } from 'ionic-angular';

/*
  Generated class for the ChatService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class ChatService {
  private socket;
  private credentials;

  constructor(public http: Http, public messageApi: MessageApi, public roomApi: RoomApi, public events: Events) {
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

  join(roomName: string) {
    this.socket.emit("room",roomName);
    let observable = new Observable(observer => {
      var name = 'joined-room/'+roomName
      this.socket.on('joined-room/'+roomName, (room: Room) => {
        observer.next(room);
        })
    })

    return observable
  }

  leave(roomName: string) {
    this.socket.emit("leave-room", roomName)
  }

  sendMessage(message: Message) {
    this.socket.emit('send-message', message);
  }

  // getMessages(id) {
  //   let observable = new Observable(observer => {
  //     var name = '/add-message/'+id;
  //     this.socket.on(name, (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   })
  //   return observable;
  // }

  getMessages(roomId: string) {
    return this.roomApi.findById(roomId, {include:"messages"})
    .map((room: Room) => { return room.messages})
    .toPromise()
  }

  listenNewMessage(roomName: string) {
    this.socket.on("new-message", (data: Message) => {
      console.log("new message", data)
      this.events.publish("new-message", data)
    })
  }

  removeEventListener() {
    this.events.unsubscribe('new-message')
  }

  disconnect() {
    this.socket.disconnect();
  }

}
