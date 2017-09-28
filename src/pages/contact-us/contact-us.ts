import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service';
import { User, Room, Message} from '../../app/shared/sdk';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';
import { Events } from 'ionic-angular';
import { AppSettings } from '../../providers/app-setting';
import { MyProfilePage } from '../my-profile/my-profile'

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
      if (message.userId == this.me.id) this.messages.pop()
      this.messages.push(message) 
    })

    this.room = this.navParams.get('room')
  }

  ngOnDestroy() {
    this.autoScroller.disconnect();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter ContactUsPage');
    
    this.userData.getUser().then(
      (user : User) => {
        if (user) {
          this.me = user
          this.isBusy = true
          let roomName = user.username
          if (this.room) {
            roomName = this.room.name
            this.isAdmin = true
            this.chatService.getMessages(this.room.id).then((messages) => {
              this.messages = messages;
              this.isBusy = false
            });
          } else {
            this.userData.getRoom().then((room: Room) => {
              this.room = room
              this.chatService.getMessages(this.room.id).then((messages) => {
                this.messages = messages;
                this.isBusy = false
              });
            })
          }
        } else {
          this.navCtrl.setRoot(LoginPage);
        }
        
      })
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

  goToProfile(){
    this.navCtrl.push(MyProfilePage)
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
