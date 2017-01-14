import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';
import { LoggerService, RealTime } from '../../app/shared/sdk/services';
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
  messages = [];
  connection;
  message;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private logger: LoggerService,
    private realTime: RealTime,
    private userData: UserData,
    private chatService: ChatService
  ) {
    this.userData.getCredentials().then((credentials) => {
      if (credentials) {
        // this.realTime.IO.on('connect').subscribe(
        //   () => {
        //     this.realTime.IO.emit('authentication', credentials);
        //     this.realTime.IO.on('authenticated').subscribe(
        //       () => console.log('connected')
        //     )
        //   }
        // )
        this.chatService.authenticate(credentials);
      } else {
        this.navCtrl.setRoot(LoginPage);
      }

    });
  }

  ngOnDestroy() {
    this.realTime.disconnect();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

}
