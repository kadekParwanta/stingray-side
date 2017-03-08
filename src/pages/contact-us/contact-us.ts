import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';
import { User } from '../../app/shared/sdk';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

/*
  Generated class for the ContactUs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html'
})
export class ContactUsPage implements OnDestroy {
  messages;
  connection;
  message: string = '';
  me: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userData: UserData,
    private chatService: ChatService
  ) {}


  ngOnInit(): void {
    this.userData.getCredentials().then((credentials) => {
      if (credentials) {
        this.chatService.authenticate(credentials);
        this.userData.getUser().then(
          (user) => {
            this.me = user
            this.chatService.getMessages(user.id).subscribe((messages) => {
              this.messages = messages;
            });
          })
      } else {
        this.navCtrl.setRoot(LoginPage);
      }

    });
  }

  ngOnDestroy() {
    this.chatService.disconnect();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  sendMessage(msg) {
    this.chatService.sendMessage(msg);
    this.message = '';
  }

}
