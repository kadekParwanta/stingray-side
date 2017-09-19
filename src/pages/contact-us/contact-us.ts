import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatService, ChatMessage } from '../../providers/chat-service';
import { User, Room} from '../../app/shared/sdk';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import { AppSettings } from '../../providers/app-setting';

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
  messages: Array<ChatMessage>;
  connection;
  message: string = '';
  room: Room
  me: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userData: UserData,
    private chatService: ChatService,
    public events: Events
  ) {
    this.events.subscribe('new-message',(message: ChatMessage) => {
      this.messages.push(message)
    })
  }


  ngOnInit(): void {
    this.userData.getCredentials().then((credentials) => {
      if (credentials) {
        this.chatService.authenticate(credentials);
        this.userData.getUser().then(
          (user) => {
            this.me = user
            this.chatService.join(user.id).subscribe((room: Room) => {
              this.room = room
              this.chatService.listenNewMessage(room.id)
              this.chatService.getMessages(room.id).then((messages) => {
                this.messages = messages;
              });
            })
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
    let chatMessage = new ChatMessage()
    chatMessage.status = 'pending'
    chatMessage.text = msg
    chatMessage.userId = this.me.id
    chatMessage.userAvatar = this.me.profilePicture
    chatMessage.userName = this.me.username
    chatMessage.roomId = this.room.id

    this.chatService.sendMessage(chatMessage);
    this.messages.push(chatMessage)
    this.message = '';
  }

  getPictureURL(path): string {
    return AppSettings.API_ENDPOINT + path;
  }

}
