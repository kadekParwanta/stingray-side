import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';
import { User, Room, Message} from '../../app/shared/sdk';
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
export class ContactUsPage implements OnInit, OnDestroy {
  autoScroller: MutationObserver;

  ngOnInit(): void {
    this.autoScroller = this.autoScroll();
  }

  messages: Array<Message> = new Array<Message>()
  connection;
  message: string = '';
  room: Room
  isAdmin: boolean = false
  me: User;
  private isBusy: Boolean = true

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userData: UserData,
    private chatService: ChatService,
    public events: Events
  ) {
    this.events.subscribe('new-message',(message: Message) => {
      let senderId = message.userId
      if (senderId != this.me.id) {
        this.messages.push(message)        
      } 
    })

    this.room = this.navParams.get('room')
  }

  ngOnDestroy() {
    this.chatService.disconnect();
    this.autoScroller.disconnect();
  }

  ionViewDidEnter() {
    this.userData.getCredentials().then((credentials) => {
      if (credentials) {
        this.chatService.authenticate(credentials);
        this.userData.getUser().then(
          (user) => {
            this.me = user
            let roomName = user.id
            if (this.room) {
              roomName = this.room.name
              this.isAdmin = true
            }
            this.isBusy = true 
            this.chatService.join(roomName).subscribe((room: Room) => {
              this.room = room
              this.chatService.listenNewMessage(roomName)
              this.chatService.getMessages(room.id).then((messages) => {
                this.messages = messages;
                this.isBusy = false
              });
            })
          })
      } else {
        this.navCtrl.setRoot(LoginPage);
      }

    });
  }

  ionViewWillLeave() {
    this.chatService.leave(this.room.name)
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }

  sendMessage(msg) {
    let chatMessage = new Message()
    chatMessage.status = 'pending'
    chatMessage.text = msg
    chatMessage.userId = this.me.id
    chatMessage.userAvatar = this.me.profilePicture
    chatMessage.userName = this.me.username
    chatMessage.roomId = this.room.id
    chatMessage.roomName = this.room.name

    this.chatService.sendMessage(chatMessage);
    this.messages.push(chatMessage)
    this.message = '';
  }

  getPictureURL(path): string {
    return AppSettings.API_ENDPOINT + "/" + path;
  }

  autoScroll(): MutationObserver {
    const autoScroller = new MutationObserver(this.scrollDown.bind(this));

    autoScroller.observe(this.messagesList, {
      childList: true,
      subtree: true
    });

    return autoScroller;
  }

  scrollDown(): void {
    this.scroller.scrollTop = this.scroller.scrollHeight;
    this.messageEditor.focus();
  }

  private get messageEditor(): HTMLInputElement {
    return <HTMLInputElement>document.querySelector('ion-input');
  }

  private get messagesList(): Element {
    return document.querySelector('.messages');
  }

  private get scroller(): Element {
    return this.messagesList.querySelector('.scroll-content');
  }

}
