import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Room } from '../../app/shared/sdk/models';
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
  private rooms: Array<Room>

  constructor(public navCtrl: NavController, public navParams: NavParams, public roomApi: RoomApi) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuddyListPage');
    this.roomApi.find().subscribe((rooms : Array<Room>) => {
      this.rooms = rooms
    })
  }

  gotoChatroom(room) {
    this.navCtrl.push(ContactUsPage, {room: room})
  }

}
