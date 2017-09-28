import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Room, Message } from '../../app/shared/sdk/models';
import { RoomApi } from '../../app/shared/sdk/services';
import { ContactUsPage } from '../contact-us/contact-us'

/**
 * Generated class for the BuddyListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-buddy-list',
  templateUrl: 'buddy-list.html',
})
export class BuddyListPage {
  private rooms: Array<any>
  private messages: Array<Message>

  constructor(public navCtrl: NavController, public navParams: NavParams, public roomApi: RoomApi) {
    this.messages = this.navParams.get('newMessages')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddyListPage');
    this.roomApi.find().subscribe((rooms : Array<Room>) => {
      this.rooms = rooms
      this.rooms.forEach(room => {
        room.newMessages = []
        this.messages.forEach(message => {
          if (message.roomId == room.id) room.newMessages.push(message)
        })
      })
    })
  }

  getNewMessagesCount(room): number {
    let count = this.rooms.length
    return room.newMessages.length/count
  }

  gotoChatroom(room) {
    this.navCtrl.push(ContactUsPage, {room: room})
  }

}
